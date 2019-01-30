// Name: Amber Nobel
// Student ID: 11819359
// https://bl.ocks.org/d3noob/0e276dc70bb9184727ee47d6dd06e915 was used for constructing this code

const barChart = (function() {

async function loadCountryComparisonData(vaccType) {
  return d3.json('data/vacc_bar_' + vaccType + '.json');
}

function drawBars(g, graph, data, country) {
  const ratesInNetherlands = data['NL'];
  const ratesInCountry = data[country];
  const years = Object.keys(ratesInCountry).slice(-graph.maxYears);

  const bars = [];

  // creates array in which a selected country and the Netherlands will be
  // saved with their data
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

  const gutterWidth = 8; // in pixels
  const halfGutterWidth = gutterWidth / 2;
  const barWidth = 15;
  const colors = ['#a6bddb', '#4682B4'];

  let div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  g.selectAll('.bar')
    .remove()
    .exit()
    .data(bars)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    // ensures that 2 grouped bars are drawn
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
    // fills the even and uneven bars seperately
    .attr('fill', (d, i) => colors[i % 2])
    // tooltip code retrieved from:
    // https://gist.github.com/woodyrew/645d0258415db9205da52cb0e049ca28
    .on('mouseover', d => {
      div
        .transition()
        .duration(200)
        .style('opacity', 0.9);
      div
        .html(d.year + '<br/>' + d.rate + '%')
        .attr('style', "text-anchor:start; font-weight: bold;")
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY - 28 + 'px');
      })
      .on('mouseout', () => {
      div
        .transition()
        .duration(500)
        .style('opacity', 0);
      });
}

function xLabel(g, graph) {
  const xAxis = d3.axisBottom()
    .scale(graph.xScale)
    // ensures that years do not have a delimeter
    .tickFormat(d3.format('y')).ticks(graph.maxYears)

  var gX = g.append('g')
    .attr('transform', 'translate(15,' + (graph.height - graph.margin.top) + ')')
    .call(xAxis)

  gX.selectAll('.xAxis')
    .remove()
    .exit()
    .append('line')
    .attr('class', '.xAxis')
    .attr('x1', -6)
    .attr('y1', 1)
    .attr('x2', 818)
    .attr('y2', 1)
    .attr('stroke-width', 1.7)
    .attr('stroke', 'black');
}

function yLabel(g, graph) {
  const yAxis = d3.axisLeft()
    .scale(graph.yScale)
    // labels are placed as percentages
    .tickFormat(d => d + '%');

  let gY = g.append('g')
    .attr('transform', 'translate(' + (graph.margin.top - 2) + ',0)')
    .call(yAxis);
}

function generateLegend(svg, graph, country, legend) {

  var colorsBar = ['#2b8cbe', '#a6bddb', ];
  var domainsBar = ['Nederland', country];

  const colorBoxSize = 20 - 3; // in pixels

  legend.selectAll('rect')
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

  legend.selectAll('text')
    .remove()
    .exit()
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
    .text('Vergelijk de vaccinatiegraad met Nederland')
}

function update() {
  drawBars(g, graph, countryComparisonData, selectedCountry);
  generateLegend(svg, graph, graph.fullCountryNames[selectedCountry], legend)
}

function main(barData) {
  countryComparisonData = barData
  update();
}

const svg = d3.select('.groupedBars')
  .attr('width', graph.width + graph.margin.left + graph.margin.right)
  .attr('height', graph.height + graph.margin.top + graph.margin.bottom + graph.margin.padding)

const g = svg.append('g')
  .attr('transform', 'translate(' + graph.margin.left + ','
    + (graph.margin.top + graph.margin.padding) + ')');

const legend = svg.append('g')
  .attr('class', 'legend')
  .attr('transform',
    'translate(' + (graph.width - graph.margin.left- graph.margin.padding) +
    ',' + (graph.height / 3.5) + ')');

let selectedCountry = 'DE';
let countryComparisonData = null;
let selectedVaccType = 'DTP';

function load() {
  loadCountryComparisonData(selectedVaccType).then(main);
}

load();
xLabel(g, graph)
yLabel(g, graph)
makeTitle(svg, graph)

// returns selected country and selecteted vaccine type
return {
  setSelectedCountry: function(countryCode) {
    selectedCountry = countryCode;
    update();
  },
  setSelectedVaccType: function(vaccType) {
    selectedVaccType = vaccType;
    load();
  },
};

})();
