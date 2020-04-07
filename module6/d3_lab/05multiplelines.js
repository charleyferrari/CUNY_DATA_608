d3.csv('ue_industry.csv', data => {

    const industries = ['Agriculture','Business services','Construction','Education and Health',
        'Finance','Government','Information','Leisure and hospitality','Manufacturing',
        'Mining and Extraction','Other','Self-employed','Transportation and Utilities',
        'Wholesale and Retail Trade'];

    const colors = ['#40655e', '#93e6b7', '#06a56c', '#1cf1a3', '#1a4fa3', '#8b83f2', '#3fc6f8', 
        '#682dbd', '#f642d0', '#e4ccf1', '#801967', '#bc7da3', '#613b4f', '#88cc1f'];

    const totalYmax = d3.max(
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

    Object.keys(data[0]).forEach(key => {
        if (key != 'index') {
            
            var line = d3.line()
                .x(d => xScale(+d.index))
                .y(d => yScale(+d[key]))
                .curve(d3.curveCardinal);
            
            d3.select('#part5')
                .append('path')
                .attr('d', line(data))
                .attr('stroke', fillScale(key))

        }

    });

}); 