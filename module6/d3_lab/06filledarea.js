d3.csv('ue_industry.csv', data => {

    const industries = ['Agriculture','Business services','Construction','Education and Health',
        'Finance','Government','Information','Leisure and hospitality','Manufacturing',
        'Mining and Extraction','Other','Self-employed','Transportation and Utilities',
        'Wholesale and Retail Trade'];

    const colors = ['#393b79', '#5253a3', '#6b6ecf', '#9c9ede', '#637939', '#8ca252', '#b5cf6b', 
        '#cedb9c', '#8b6d31', '#bd9e38', '#e7ba52', '#e7cb93', '#843c39', '#ad494a'];

    const totalYmax = d3.sum(
        industries.map(
            d => d3.max(data, e => +e[d])
        )
    );

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.index))
        .range([20, 1180]);
    
    const yScale = d3.scaleLinear()
        .domain([0, totalYmax])
        .range([580, 20]);

    const fillScale = d3.scaleOrdinal()
        .domain(industries)
        .range(colors);

    const stackLayout = d3.stack()
        .keys(industries);
        
    const stackArea = d3.area()
        .x((d, i) => xScale(i))
        .y0(d => yScale(d[0]))
        .y1(d => yScale(d[1]));

    d3.select('#part6')
        .selectAll('path')
        .data(stackLayout(data))
        .enter().append('path')
        .attr('d', d => stackArea(d))
        .style('fill', d => fillScale(d.key))

});
