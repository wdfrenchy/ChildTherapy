import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import * as d3 from 'd3';
import { format, parseISO, eachDayOfInterval, subDays, addDays } from 'date-fns';

// Generate mock data for the last year
const generateMockData = () => {
  const today = new Date();
  const startDate = subDays(today, 364);
  const dates = eachDayOfInterval({ start: startDate, end: today });

  return dates.map(date => {
    // Generate random session count (more sessions on weekdays)
    const dayOfWeek = date.getDay();
    const isWeekday = dayOfWeek > 0 && dayOfWeek < 6;
    const baseCount = isWeekday ? Math.floor(Math.random() * 8) + 2 : Math.floor(Math.random() * 3);
    
    // Add seasonal variations
    const month = date.getMonth();
    let seasonalMultiplier = 1;
    if (month >= 5 && month <= 7) { // Summer months
      seasonalMultiplier = 1.2;
    } else if (month >= 11 || month <= 1) { // Winter months
      seasonalMultiplier = 0.8;
    }

    return {
      date: format(date, 'yyyy-MM-dd'),
      count: Math.round(baseCount * seasonalMultiplier),
    };
  });
};

const mockData = generateMockData();

function TherapyCalendar() {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous calendar
    d3.select(svgRef.current).selectAll('*').remove();

    const width = 900;
    const height = 150;
    const cellSize = 12;
    const cellPadding = 2;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10);

    // Create tooltip
    const tooltip = d3.select(tooltipRef.current)
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('box-shadow', '0 2px 4px rgba(0,0,0,0.2)');

    // Create color scale
    const colorScale = d3.scaleSequential()
      .domain([0, d3.max(mockData, d => d.count)])
      .interpolator(d3.interpolateBlues);

    // Group data by year and week
    const nestedData = d3.group(mockData, 
      d => format(parseISO(d.date), 'yyyy'),
      d => format(parseISO(d.date), 'w')
    );

    // Create year groups
    const yearGroups = svg.selectAll('.year-group')
      .data(Array.from(nestedData))
      .join('g')
      .attr('class', 'year-group')
      .attr('transform', (d, i) => `translate(40,${i * (height - 30)})`);

    // Add year labels
    yearGroups.append('text')
      .attr('x', -30)
      .attr('y', 20)
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'end')
      .text(([year]) => year);

    // Create week groups
    const weekGroups = yearGroups.selectAll('.week')
      .data(([, weeks]) => Array.from(weeks))
      .join('g')
      .attr('class', 'week')
      .attr('transform', (d, i) => `translate(${i * (cellSize + cellPadding)}, 0)`);

    // Create day cells
    weekGroups.selectAll('.day')
      .data(([, days]) => days)
      .join('rect')
      .attr('class', 'day')
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('y', (d, i) => {
        const date = parseISO(d.date);
        return date.getDay() * (cellSize + cellPadding);
      })
      .attr('fill', d => d.count > 0 ? colorScale(d.count) : '#eee')
      .attr('rx', 2)
      .attr('ry', 2)
      .on('mouseover', (event, d) => {
        const date = parseISO(d.date);
        tooltip
          .style('visibility', 'visible')
          .html(`
            <strong>${format(date, 'MMMM d, yyyy')}</strong><br/>
            Sessions: ${d.count}<br/>
            Day: ${format(date, 'EEEE')}
          `);
      })
      .on('mousemove', (event) => {
        tooltip
          .style('top', (event.pageY - 10) + 'px')
          .style('left', (event.pageX + 10) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    // Add day labels
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    svg.append('g')
      .attr('transform', 'translate(10,0)')
      .selectAll('.day-label')
      .data(dayLabels)
      .join('text')
      .attr('class', 'day-label')
      .attr('x', 0)
      .attr('y', (d, i) => i * (cellSize + cellPadding) + cellSize)
      .style('text-anchor', 'end')
      .text(d => d);

    // Add legend
    const legendWidth = 200;
    const legendHeight = 40;
    const legend = svg.append('g')
      .attr('transform', `translate(${width - legendWidth - 10}, ${height - legendHeight})`);

    const legendScale = d3.scaleLinear()
      .domain([0, d3.max(mockData, d => d.count)])
      .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale)
      .ticks(5)
      .tickSize(10);

    const defs = svg.append('defs');
    const linearGradient = defs.append('linearGradient')
      .attr('id', 'calendar-legend-gradient');

    linearGradient.selectAll('stop')
      .data(d3.range(0, 1.1, 0.1))
      .join('stop')
      .attr('offset', d => `${d * 100}%`)
      .attr('stop-color', d => colorScale(d * d3.max(mockData, d => d.count)));

    legend.append('rect')
      .attr('width', legendWidth)
      .attr('height', 10)
      .style('fill', 'url(#calendar-legend-gradient)');

    legend.append('g')
      .attr('transform', 'translate(0,10)')
      .call(legendAxis);

    legend.append('text')
      .attr('x', legendWidth / 2)
      .attr('y', 35)
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .text('Number of Sessions');

    // Cleanup
    return () => {
      svg.remove();
    };
  }, []);

  return (
    <Box sx={{ width: '100%', height: 200, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Therapy Session Calendar
      </Typography>
      <Box sx={{ 
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        overflowX: 'auto',
      }}>
        <svg ref={svgRef} />
        <div ref={tooltipRef} />
      </Box>
    </Box>
  );
}

export default TherapyCalendar;
