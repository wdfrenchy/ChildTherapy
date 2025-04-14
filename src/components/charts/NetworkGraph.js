import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import * as d3 from 'd3';

// Mock data - will be replaced with real data
const mockData = {
  nodes: [
    // Therapists
    { id: 't1', name: 'Dr. Sarah Johnson', type: 'therapist', group: 1 },
    { id: 't2', name: 'Dr. Michael Chen', type: 'therapist', group: 1 },
    { id: 't3', name: 'Dr. Emily Brown', type: 'therapist', group: 1 },
    // Children
    { id: 'c1', name: 'Alex Thompson', type: 'child', group: 2 },
    { id: 'c2', name: 'Emma Davis', type: 'child', group: 2 },
    { id: 'c3', name: 'James Wilson', type: 'child', group: 2 },
    { id: 'c4', name: 'Sophia Lee', type: 'child', group: 2 },
    { id: 'c5', name: 'Oliver White', type: 'child', group: 2 },
    { id: 'c6', name: 'Ava Martinez', type: 'child', group: 2 },
  ],
  links: [
    { source: 't1', target: 'c1', value: 8 },
    { source: 't1', target: 'c2', value: 6 },
    { source: 't1', target: 'c3', value: 4 },
    { source: 't2', target: 'c3', value: 5 },
    { source: 't2', target: 'c4', value: 7 },
    { source: 't2', target: 'c5', value: 3 },
    { source: 't3', target: 'c5', value: 6 },
    { source: 't3', target: 'c6', value: 8 },
    { source: 't3', target: 'c1', value: 4 },
  ],
};

function NetworkGraph() {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous graph
    d3.select(svgRef.current).selectAll('*').remove();

    const width = 800;
    const height = 600;

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create tooltip
    const tooltip = d3.select(tooltipRef.current)
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('box-shadow', '0 2px 4px rgba(0,0,0,0.2)');

    // Create force simulation
    const simulation = d3.forceSimulation(mockData.nodes)
      .force('link', d3.forceLink(mockData.links)
        .id(d => d.id)
        .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50));

    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(mockData.links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => Math.sqrt(d.value));

    // Create nodes
    const node = svg.append('g')
      .selectAll('g')
      .data(mockData.nodes)
      .join('g')
      .call(drag(simulation));

    // Add circles to nodes
    node.append('circle')
      .attr('r', d => d.type === 'therapist' ? 20 : 15)
      .attr('fill', d => d.type === 'therapist' ? '#8884d8' : '#82ca9d')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Add labels to nodes
    node.append('text')
      .text(d => d.name.split(' ')[0])
      .attr('x', 0)
      .attr('y', d => d.type === 'therapist' ? 30 : 25)
      .attr('text-anchor', 'middle')
      .attr('fill', '#666')
      .style('font-size', '12px');

    // Add hover effects
    node
      .on('mouseover', (event, d) => {
        tooltip
          .style('visibility', 'visible')
          .html(`
            <strong>${d.name}</strong><br/>
            ${d.type === 'therapist' ? 'Therapist' : 'Child'}<br/>
            ${d.type === 'therapist' ? 
              `Assigned Children: ${mockData.links.filter(l => l.source.id === d.id).length}` :
              `Assigned Therapists: ${mockData.links.filter(l => l.target.id === d.id).length}`
            }
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

    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Drag functionality
    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <Box sx={{ width: '100%', height: 600, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Therapist-Child Network
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

export default NetworkGraph;
