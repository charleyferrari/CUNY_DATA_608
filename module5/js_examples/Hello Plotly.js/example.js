Plotly.d3.csv('data/hpi.csv', function(rows) {
  // Build list of unique metros
  let metros = [];
  rows.forEach(function(d) {
    if (!metros.includes(d['Metro'])) {
      metros.push(d['Metro']);
    }
  });

  // Add unique metros to selector
  Plotly.d3
    .select('#metro-selector')
    .selectAll('option')
    .data(metros)
    .enter()
    .append('option')
    .text(function(d) {
      return d;
    })
    .attr('value', function(d) {
      return d;
    });

  // Create a plotly graph given a metro
  function createGraph(metro) {
    // Create arrays for pricing tiers and dates
    let dates = [],
      high = [],
      middle = [],
      low = [];
    rows.forEach(function(d) {
      if (d['Metro'] == metro && d['Seasonality'] == 'SA') {
        if (d['Tier'] == 'High') {
          dates.push(d['DATE']);
          // + makes sure I'm adding floats and not strings
          high.push(+d['HPI']);
        } else if (d['Tier'] == 'Middle') {
          middle.push(+d['HPI']);
        } else {
          low.push(+d['HPI']);
        }
      }
    });

    // Create Plotly object
    let traces = [],
      tiers = ['High', 'Middle', 'Low'];
    [high, middle, low].forEach(function(d, i) {
      traces.push({
        type: 'scatter',
        x: dates,
        y: d,
        name: tiers[i]
      });
    });

    return {
      data: traces,
      layout: {
        title: metro
      }
    };
  }

  // Get graph div
  myGraph = document.getElementById('graph');

  // Plot initial graph
  Plotly.newPlot(myGraph, createGraph('Atlanta'));

  // Update graph when dropdown is triggered
  Plotly.d3.select('#metro-selector').on('change', function() {
    let fig = createGraph(Plotly.d3.event.target.value);
    Plotly.react(myGraph, fig);
  });
});
