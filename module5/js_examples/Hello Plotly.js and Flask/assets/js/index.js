// d3.json('hpi/NSA/San Francisco'.replace(' ', '%20'), function(json) {
//   console.log(json);
// });

Plotly.d3.json('hpi/values', function(defaults) {
  // Add unique metros to selector
  Plotly.d3
    .select('#metro-selector')
    .selectAll('option')
    .data(defaults.metros)
    .enter()
    .append('option')
    .text(function(d) {
      return d;
    })
    .attr('value', function(d) {
      return d;
    });

  // Add unique seasonalities to selector
  Plotly.d3
    .select('#seasonality-selector')
    .selectAll('option')
    .data(defaults.seasonality)
    .enter()
    .append('option')
    .text(function(d) {
      return d;
    })
    .attr('value', function(d) {
      return d;
    });

  // Get graph div
  myGraph = document.getElementById('graph');

  // Plot initial graph
  Plotly.d3.json(
    'hpi/' + defaults.seasonality[0] + '/' + defaults.metros[0],
    function(d) {
      Plotly.newPlot(myGraph, d);
    }
  );

  let sel = document.getElementById('metro-selector');
  console.log(sel.options[sel.selectedIndex].value);

  // Get selectors
  let metroSelector = document.getElementById('metro-selector'),
    seasonalitySelector = document.getElementById('seasonality-selector');

  // Update graph when dropdown is triggered
  Plotly.d3.select('#metro-selector').on('change', function() {
    let seas =
      seasonalitySelector.options[seasonalitySelector.selectedIndex].value;
    console.log(seas);
    Plotly.d3.json('hpi/' + seas + '/' + Plotly.d3.event.target.value, function(
      d
    ) {
      Plotly.react(myGraph, d);
    });
  });

  Plotly.d3.select('#seasonality-selector').on('change', function() {
    let the_metro = metroSelector.options[metroSelector.selectedIndex].value;
    console.log(the_metro);
    Plotly.d3.json(
      'hpi/' + Plotly.d3.event.target.value + '/' + the_metro,
      function(d) {
        Plotly.react(myGraph, d);
      }
    );
  });
});
