import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import * as d3 from 'd3';

// Mock data - will be replaced with real data
const mockData = Array.from({ length: 30 }, (_, i) => ({
  id: `Child${i + 1}`,
  age: Math.floor(Math.random() * 10) + 5, // 5-15 years
  sessionCount: Math.floor(Math.random() * 40) + 10, // 10-50 sessions
  engagementScore: Math.floor(Math.random() * 40) + 60, // 60-100
  emotionalProgress: Math.floor(Math.random() * 40) + 60, // 60-100
  socialSkills: Math.floor(Math.random() * 40) + 60, // 60-100
  creativity: Math.floor(Math.random() * 40) + 60, // 60-100
}));

const dimensions = [
  { name: 'age', label: 'Age', format: d => d + ' years' },
  { name: 'sessionCount', label: 'Sessions', format: d => d },
  { name: 'engagementScore', label: 'Engagement', format: d => d + '%' },
  { name: 'emotionalProgress', label: 'Emotional', format: d => d + '%' },
  { name: 'socialSkills', label: 'Social', format: d => d + '%' },
  { name: 'creativity', label: 'Creativity', format: d => d + '%' },
];

function ParallelCoordinates() {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 30, right: 50, bottom: 30, left: 50 };
    const width = 900 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create tooltip
    const tooltip = d3.select(tooltipRef.current)
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('box-shadow', '0 2px 4px rgba(0,0,0,0.2)');

    // Create scales for each dimension
    const y = {};
    dimensions.forEach(dim => {
      y[dim.name] = d3.scaleLinear()
        .domain(d3.extent(mockData, d => d[dim.name]))
        .range([height, 0]);
    });

    // Create x scale for dimensions
    const x = d3.scalePoint()
      .range([0, width])
      .domain(dimensions.map(d => d.name));

    // Create line generator
    const line = d3.line()
      .defined(([dim, value]) => value != null)
      .x(([dim]) => x(dim))
      .y(([dim, value]) => y[dim](value));

    // Add grey background lines
    const background = svg.append('g')
      .attr('class', 'background')
      .selectAll('path')
      .data(mockData)
      .join('path')
      .attr('d', d => line(dimensions.map(p => [p.name, d[p.name]])))
      .style('fill', 'none')
      .style('stroke', '#ddd')
      .style('stroke-width', 1)
      .style('opacity', 0.3);

    // Add group for foreground lines
    const foreground = svg.append('g')
      .attr('class', 'foreground');

    // Add vertical axes
    const axes = svg.selectAll('.dimension')
      .data(dimensions)
      .join('g')
      .attr('class', 'dimension')
      .attr('transform', d => `translate(${x(d.name)},0)`);

    // Add axes and labels
    axes.each(function(d) {
      d3.select(this).call(d3.axisLeft(y[d.name]));
    });

    // Add dimension labels
    axes.append('text')
      .attr('y', -9)
      .attr('text-anchor', 'middle')
      .style('fill', 'black')
      .text(d => d.label);

    // Add interaction
    const highlight = (event, selectedData) => {
      // Reset all lines
      background.style('opacity', 0.3);
      
      // Highlight selected line
      const selectedPath = svg.append('path')
        .datum(selectedData)
        .attr('class', 'highlight')
        .attr('d', d => line(dimensions.map(p => [p.name, d[p.name]])))
        .style('fill', 'none')
        .style('stroke', '#ff7300')
        .style('stroke-width', 2)
        .style('opacity', 1);

      // Show tooltip
      tooltip
        .style('visibility', 'visible')
        .html(`
          <strong>ID: ${selectedData.id}</strong><br/>
          ${dimensions.map(dim => 
            `${dim.label}: ${dim.format(selectedData[dim.name])}`
          ).join('<br/>')}
        `);
    };

    const unhighlight = () => {
      // Remove highlighted line
      svg.selectAll('.highlight').remove();
      
      // Reset background lines
      background.style('opacity', 0.3);
      
      // Hide tooltip
      tooltip.style('visibility', 'hidden');
    };

    // Add invisible thick lines for better hover detection
    svg.selectAll('.hover-line')
      .data(mockData)
      .join('path')
      .attr('class', 'hover-line')
      .attr('d', d => line(dimensions.map(p => [p.name, d[p.name]])))
      .style('fill', 'none')
      .style('stroke', 'transparent')
      .style('stroke-width', 10)
      .on('mouseover', highlight)
      .on('mousemove', (event) => {
        tooltip
          .style('top', (event.pageY - 10) + 'px')
          .style('left', (event.pageX + 10) + 'px');
      })
      .on('mouseout', unhighlight);

    // Cleanup
    return () => {
      svg.remove();
    };
  }, []);

  return (
    <Box sx={{ width: '100%', height: 550, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Multi-Dimensional Therapy Analysis
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
      <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
        Hover over lines to see detailed information for each child
      </Typography>
    </Box>
  );
}

export default ParallelCoordinates;
