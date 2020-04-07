let dataset = [
    {'x': 1, 'y': 1},
    {'x': 2, 'y': 4},
    {'x': 3, 'y': 2}

]

let xScale = d3.scaleLinear().domain([1,3]).range([20, 580]);
let yScale = d3.scaleLinear().domain([1,4]).range([20, 580]);

let line3 = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

d3.select('#part3')
    .append('path')
    .attr('d', line3(dataset))
    .attr('stroke', '#2e2928')