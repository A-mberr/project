// Name: Amber Nobel
// Student ID: 11819359

const graph = (function() {
  const margin = {
      top: 10,
      right: 30,
      bottom: 30,
      left: 40,
      padding: 80
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .domain([1998, 2017])
    .range([margin.top, width - margin.top - margin.padding]);

  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.top, margin.top]);

  return {
    margin: margin,
    width: width,
    height: height,
    xScale: xScale,
    yScale: yScale,
    maxYears: 20,
    setSelectedCountry: function(countryCode) {
      console.log('clicked country:', countryCode);
      barChart.setSelectedCountry(countryCode);
      lineChart.setSelectedCountry(countryCode);
    },
  };
})();
