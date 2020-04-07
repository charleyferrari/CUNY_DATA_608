dataset = [
    {'x': 50, 'y': 100},
    {'x': 100, 'y': 500},
    {'x': 500, 'y': 300}
]

d3.select('#part1')
    .selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('r', d => 5)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)