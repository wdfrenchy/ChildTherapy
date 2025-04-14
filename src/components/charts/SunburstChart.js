import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import * as d3 from 'd3';

// Mock data - will be replaced with real data
const mockData = {
  name: 'Therapy Goals',
  color: '#fff',
  children: [
    {
      name: 'Emotional Development',
      color: '#8884d8',
      children: [
        {
          name: 'Expression',
          color: '#8884d8',
          children: [
            { name: 'Identify Feelings', value: 20, progress: 85, color: '#8884d8' },
            { name: 'Express Emotions', value: 15, progress: 75, color: '#8884d8' },
            { name: 'Manage Stress', value: 10, progress: 65, color: '#8884d8' },
          ],
        },
        {
          name: 'Self-Awareness',
          color: '#9575cd',
          children: [
            { name: 'Self-Image', value: 12, progress: 80, color: '#9575cd' },
            { name: 'Confidence', value: 18, progress: 70, color: '#9575cd' },
          ],
        },
      ],
    },
    {
      name: 'Social Skills',
      color: '#82ca9d',
      children: [
        {
          name: 'Communication',
          color: '#82ca9d',
          children: [
            { name: 'Verbal Skills', value: 15, progress: 90, color: '#82ca9d' },
            { name: 'Non-verbal Cues', value: 10, progress: 85, color: '#82ca9d' },
          ],
        },
        {
          name: 'Interaction',
          color: '#a5d6a7',
          children: [
            { name: 'Peer Relations', value: 20, progress: 75, color: '#a5d6a7' },
            { name: 'Group Activities', value: 15, progress: 80, color: '#a5d6a7' },
          ],
        },
      ],
    },
    {
      name: 'Creative Expression',
      color: '#ffc658',
      children: [
        {
          name: 'Art Skills',
          color: '#ffc658',
          children: [
            { name: 'Drawing', value: 25, progress: 95, color: '#ffc658' },
            { name: 'Painting', value: 20, progress: 85, color: '#ffc658' },
            { name: 'Sculpting', value: 15, progress: 75, color: '#ffc658' },
          ],
        },
        {
          name: 'Music Skills',
          color: '#ffd54f',
          children: [
            { name: 'Rhythm', value: 18, progress: 88, color: '#ffd54f' },
            { name: 'Singing', value: 12, progress: 82, color: '#ffd54f' },
          ],
        },
      ],
    },
  ],
};

function SunburstChart() {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    const width = 600;
    const height = 600;
    const radius = Math.min(width, height) / 2;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Create tooltip
    const tooltip = d3.select(tooltipRef.current)
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('box-shadow', '0 2px 4px rgba(0,0,0,0.2)');

    // Create partition layout
    const partition = data => {
      const root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);
      return d3.partition()
        .size([2 * Math.PI, radius])(root);
    };

    // Create arc generator
    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius / 2)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1 - 1);

    // Create root hierarchy
    const root = partition(mockData);

    // Prepare data
    root.each(d => d.current = d);

    // Create paths
    const path = svg.append('g')
      .selectAll('path')
      .data(root.descendants().filter(d => d.depth))
      .join('path')
      .attr('fill', d => d.data.color)
      .attr('fill-opacity', 0.8)
      .attr('d', arc);

    // Add interactivity
    path
      .on('mouseover', (event, d) => {
        // Highlight path
        d3.select(event.currentTarget)
          .attr('fill-opacity', 1)
          .attr('stroke', '#fff')
          .attr('stroke-width', 2);

        // Show tooltip
        tooltip
          .style('visibility', 'visible')
          .html(`
            <strong>${d.data.name}</strong><br/>
            ${d.data.value ? `Sessions: ${d.data.value}<br/>` : ''}
            ${d.data.progress ? `Progress: ${d.data.progress}%` : ''}
          `);
      })
      .on('mousemove', (event) => {
        tooltip
          .style('top', (event.pageY - 10) + 'px')
          .style('left', (event.pageX + 10) + 'px');
      })
      .on('mouseout', (event) => {
        // Remove highlight
        d3.select(event.currentTarget)
          .attr('fill-opacity', 0.8)
          .attr('stroke', 'none');

        // Hide tooltip
        tooltip.style('visibility', 'hidden');
      });

    // Add labels
    const label = svg.append('g')
      .selectAll('text')
      .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
      .join('text')
      .attr('transform', d => {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr('dy', '0.35em')
      .attr('font-size', '10px')
      .attr('fill', '#fff')
      .attr('text-anchor', 'middle')
      .text(d => d.data.name.split(' ')[0]);

    // Cleanup
    return () => {
      svg.remove();
    };
  }, []);

  return (
    <Box sx={{ width: '100%', height: 650, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Therapy Goals Hierarchy
      </Typography>
      <Box sx={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <svg ref={svgRef} />
        <div ref={tooltipRef} />
      </Box>
    </Box>
  );
}

export default SunburstChart;
