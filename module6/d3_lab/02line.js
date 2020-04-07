dataset = [
    {'x': 50, 'y': 100},
    {'x': 100, 'y': 500},
    {'x': 500, 'y': 300}
]

let line2 = d3.line()
    .x(d => d.x)
    .y(d => d.y)

d3.select('#part2')
    .append('path')
    .attr('d', line2(dataset))
    .attr('stroke', '#2e2928')