// Name: Amber Nobel
// Student ID: 11819359
// https://bl.ocks.org/d3noob/0e276dc70bb9184727ee47d6dd06e915 was used for constructing this code

(function() {

async function loadCountryComparisonData(vaccType) {
  return await d3.json('data/vacc_bar_' + vaccType + '.json');
}

function drawBars(g, graph, countryComparisonData, selectedCountry) {

  const ratesInNetherlands = countryComparisonData['NL'];
  const ratesInCountry = countryComparisonData[selectedCountry];
  const years = Object.keys(ratesInCountry).slice(-graph.maxYears);

  const bars = [];

  for (let i = 0; i < years.length; i++) {
    let year = years[i];
    if (ratesInCountry[year] == null && ratesInNetherlands[year] == null) {
      continue;
    }
    bars.push({
      year: year,
      rate: '' + ratesInCountry[year],
    });
    bars.push({
      year: year,
      rate: ratesInNetherlands[year],
    });
  }

  console.log(years)
  const gutterWidth = 8; // in pixels
  const halfGutterWidth = gutterWidth / 2;
  const barWidth = 15;
  const colors = ['#4682B4', 'black'];

  g.selectAll('.bar')
    .data(bars)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      let x = graph.xScale(d.year);
      if (i % 2 == 1) {
        x += barWidth + 1;
      }
      return x;
    })
    .attr('y', d => graph.yScale(d.rate))
    .attr('width', barWidth)
    .attr('height', d => (graph.height - graph.margin.top) - graph.yScale(d.rate))
    .attr('fill', (d, i) => colors[i % 2]);
}

function xLabel(g, graph) {
  const xAxis = d3.axisBottom()
    .scale(graph.xScale)
    .tickFormat(d3.format('y')).ticks(graph.maxYears)

  var gX_bar = g.append('g')
    .attr('transform', 'translate(15,' + (graph.height - graph.margin.top) + ')')
    .call(xAxis)

  // Fix the border of the ticks.
  gX_bar.append("line")
    .attr("x1", -6)
    .attr("y1", 1)
    .attr("x2", 818)
    .attr("y2", 1)
    .attr("stroke-width", 1.7)
    .attr("stroke", "black");
}

function yLabel(g, graph) {
  const yAxis = d3.axisLeft()
    .scale(graph.yScale)
    .tickFormat(d => d + '%');

  let gY = g.append('g')
    .attr('transform', 'translate(' + graph.margin.top + ',0)')
    .call(yAxis);
}

function generateLegend(svg, graph, selectedCountry) {

  var colorsBar = ['#2b8cbe', '#000000']
  var domainsBar = ['Nederland', selectedCountry]

  var legendBar = svg.append('g')
    .attr('class', 'legend')
    .attr('transform',
      'translate(' + (graph.width - graph.margin.left- graph.margin.padding) +
      ',' + (graph.height / 3.5) + ')');

  const colorBoxSize = 20 - 3; // in pixels

  legendBar.selectAll('rect')
    .data(colorsBar)
    .enter()
    .append('rect')
    .attr('x', 0)
    // Drawing a rect starts at top left corner, and goes down. Subtract the box
    // size to align the boxes with the legend text.
    .attr('y', (d, i) => i * 20 - graph.margin.padding - colorBoxSize)
    .attr('width', colorBoxSize)
    .attr('height', colorBoxSize)
    .style('fill',(d, i) => colorsBar[i]);

  legendBar.selectAll('text')
    .data(domainsBar)
    .enter()
    .append('text')
    .attr('x', 30)
    .attr('y', (d, i) => i * 20 - graph.margin.padding)
    .text((d, i) => domainsBar[i])
    .attr('width', colorBoxSize)
    .attr('height', colorBoxSize);
}

function makeTitle(svg, graph) {
  svg.append('text')
    .attr('class', 'title')
    .attr('x', (graph.width + graph.margin.left + graph.margin.right) / 2)
    .attr('y', graph.margin.top + graph.margin.padding / 2)
    .attr('text-anchor', 'middle')
    .text('Vergelijk de vaccnaitiegraad met Nederland')
}

async function main() {
  const svg = d3.select('.groupedBars')
    .attr('width', graph.width + graph.margin.left + graph.margin.right)
    .attr('height', graph.height + graph.margin.top + graph.margin.bottom + graph.margin.padding)
    .style('background', 'white')

  const g = svg.append('g')
    .attr('transform', 'translate(' + graph.margin.left + ','
      + (graph.margin.top + graph.margin.padding) + ')');

  const selectedCountry = 'DE';
  const countryComparisonData = await loadCountryComparisonData('Hib');

  drawBars(g, graph, countryComparisonData,
          selectedCountry);

  xLabel(g, graph)

  yLabel(g, graph)

  makeTitle(svg, graph)

  generateLegend(svg, graph, selectedCountry)
}

main()

})();
