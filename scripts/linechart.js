// Name: Amber Nobel
// Student ID: 11819359

const lineChart = (function() {

function loadLineData() {
  return d3.json('data/vacc_line.json');
}

function xLabel(g_line, graph) {
  const xAxis = d3.axisBottom()
    .scale(graph.xScale)
    .tickFormat(d3.format('y')).ticks(20)

  const gX_line = g_line.append('g')
    .attr('transform', 'translate(0,' + (graph.height - graph.margin.top) + ')')
    .call(xAxis)
}

function yLabel(g_line, graph) {
  const yAxis = d3.axisLeft()
    .scale(graph.yScale)
    .tickFormat(d => d + '%');

  gY_line = g_line.append('g')
    .attr('transform', 'translate(' + graph.margin.top + ',0)')
    .call(yAxis);
}

function drawLines(g_line, graph, data) {
  const dots = [];

  for (vaccType of vaccTypes) {
    const values =  data[vaccType];
    for (const value of values.slice(-graph.maxYears)) {
      dots.push({
        year: value.year,
        rate: value.rate,
        type: vaccType,
      });
    }
  }

  g_line.selectAll('circle')
    .remove()
    .exit()
    .data(dots)
    .enter()
    .append('circle')
    .attr('cx', d => graph.xScale(d.year))
    .attr('cy', d => graph.yScale(d.rate))
    .attr('r', 5)
    .attr('fill', d => colors[d.type]);

  g_line.selectAll('.lines')
    .remove().exit();

  for (vaccType of vaccTypes) {
    let line = d3.line()
      .x(d => graph.xScale(d.year))
      .y(d => graph.yScale(d.rate));

    g_line.append('path')
      .attr('class', 'lines ' + vaccType)
      .attr('class', 'lines')
      .attr('stroke', colors[vaccType])
      .attr('d', line(data[vaccType].slice(-graph.maxYears)));
  }
}

function makeTitle(svg_line, graph, country) {

  svg_line.selectAll('.title')
    .remove()
    .exit()
    .data(country)
    .enter()
    .append('text')
    .attr('class', 'title')
    .attr('x', (graph.width + graph.margin.left + graph.margin.right) / 2)
    .attr('y', graph.margin.top + graph.margin.padding / 2)
    .attr('text-anchor', 'middle')
    .text('Vaccinatiegraad in ' + country)
}

// TODO: verander de variabele namen naar kortere namen
function updateVaccTypes() {
  vaccTypes = [];
  d3.selectAll('.vacc-type-checkbox').each(function() {
    if (this.checked) vaccTypes.push(this.value);
  });
}

function update() {
  updateVaccTypes();
  drawLines(g_line, graph, lineData[country])
  makeTitle(svg_line, graph, graph.fullCountryNames[country])
}

function main(data) {
  lineData = data;

  xLabel(g_line, graph)

  yLabel(g_line, graph)
  update();
}

const svg_line = d3.select('.line')
  .attr('width', graph.width + graph.margin.left + graph.margin.right)
  .attr('height', graph.height + graph.margin.top + graph.margin.bottom + graph.margin.padding)

const g_line = svg_line.append('g')
  .attr('transform', 'translate(' + graph.margin.left + ','
    + (graph.margin.top + graph.margin.padding) + ')');

let country = 'AL';
let lineData = null;

const colors = {
  'DTP': '#a6cee3',
  'Hib': '#1f78b4',
  'Hepb': '#b2df8a',
  'Pneu': '#33a02c',
};

let vaccTypes = [];
d3.selectAll(".vacc-type-checkbox").on("change", update);

loadLineData().then(main);

return {
  setSelectedCountry: function(countryCode) {
    console.log('lineChart:', countryCode);
    country = countryCode;
    update();
  },
  setSelectedVaccType: function(vaccType) {
    console.log('lineChart Vacc:', vaccType);
  },
}

})();
