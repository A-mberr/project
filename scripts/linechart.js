// Name: Amber Nobel
// Student ID: 11819359

const lineChart = (function() {

function loadLineData() {
  return d3.json('data/vacc_line.json');
}

function xLabel(g, graph) {
  const xAxis = d3.axisBottom()
    .scale(graph.xScale)
    .tickFormat(d3.format('y')).ticks(20)

  const gX_line = g.append('g')
    .attr('transform', 'translate(0,' + (graph.height - graph.margin.top) + ')')
    .call(xAxis)
}

function yLabel(g, graph) {
  const yAxis = d3.axisLeft()
    .scale(graph.yScale)
    .tickFormat(d => d + '%');

  gY_line = g.append('g')
    .attr('transform', 'translate(' + graph.margin.top + ',0)')
    .call(yAxis);
}

function drawLines(g, graph, data) {
  const dots = [];

  //  creates array that contains info per country in whcih is divided per
  //  vaccine type
  for (vaccType of vaccTypes) {
    // if no data is available for a certain country, continue
    if (!data[vaccType])
      continue
    const values =  data[vaccType];
    //  only take from the last 20 years
    for (const value of values.slice(-graph.maxYears)) {
      dots.push({
        year: value.year,
        rate: value.rate,
        type: vaccType,
      });
    }
  }

  let div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // draw circles for data
  g.selectAll('circle')
    .remove()
    .exit()
    .data(dots)
    .enter()
    .append('circle')
    .attr('cx', d => graph.xScale(d.year))
    .attr('cy', d => graph.yScale(d.rate))
    .attr('r', 5)
    .attr('fill', d => colors[d.type])
    // tooltip code retrieved from:
    // https://gist.github.com/woodyrew/645d0258415db9205da52cb0e049ca28
    .on('mouseover', d => {
      div
        .transition()
        .duration(200)
        .style('opacity', 0.9);
      div
        .html(d.year + '<br/>' + d.rate)
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

  g.selectAll('.lines')
    .remove().exit();

  for (vaccType of vaccTypes) {
    let line = d3.line()
      .x(d => graph.xScale(d.year))
      .y(d => graph.yScale(d.rate));

    // draw lines between the data
    g.append('path')
      .attr('class', 'lines ' + vaccType)
      .attr('class', 'lines')
      .attr('stroke', colors[vaccType])
      .attr('d', line(data[vaccType].slice(-graph.maxYears)));
  }
}

function makeTitle(svg, graph, country) {

  // titles will be printed once
  svg.selectAll('.title')
    .remove()
    .exit()

  svg.append('text')
    .attr('class', 'title')
    .attr('x', (graph.width + graph.margin.left + graph.margin.right) / 2)
    .attr('y', graph.margin.top + graph.margin.padding / 2)
    .attr('text-anchor', 'middle')
    .text('Vaccinatiegraad in ' + country)
}

function updateVaccTypes() {
  vaccTypes = [];
  // checks whcih checkboxes has been checked
  d3.selectAll('.vacc-type-checkbox').each(function() {
    if (this.checked) vaccTypes.push(this.value);
  });
}

function update() {
  updateVaccTypes();
  drawLines(g, graph, lineData[country])
  makeTitle(svg, graph, graph.fullCountryNames[country])
}

function main(data) {
  lineData = data;

  xLabel(g, graph)

  yLabel(g, graph)
  update();
}

const svg = d3.select('.line')
  .attr('width', graph.width + graph.margin.left + graph.margin.right)
  .attr('height', graph.height + graph.margin.top + graph.margin.bottom + graph.margin.padding)

const g = svg.append('g')
  .attr('transform', 'translate(' + graph.margin.left + ','
    + (graph.margin.top + graph.margin.padding) + ')');

let country = 'DE';
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

// returns selected country and selecteted vaccine type
return {
  setSelectedCountry: function(countryCode) {
    country = countryCode;
    update();
  },
  setSelectedVaccType: function(vaccType) {
  },
}

})();
