// Name: Amber Nobel
// Student ID: 11819359

(function() {

function xLabels(g_line, graph) {

  const xAxis = d3.axisBottom()
    .scale(graph.xScale)
    .tickFormat(d3.format('y')).ticks(20)

  var gX_line = g_line.append('g')
    .attr('transform', 'translate(0,' + (graph.height - graph.margin.top) + ')')
    .call(xAxis)
}

function yLabels(g_line, graph) {
  const yAxis = d3.axisLeft()
    .scale(graph.yScale)
    .tickFormat(d => d + '%');

  gY_line = g_line.append('g')
    .attr('transform', 'translate(' + graph.margin.top + ',0)')
    .call(yAxis);
}

function drawline(g_line, graph, data) {

  let vaccTypes = ['DTP', 'Pneu', 'Hib', 'Hepb'];

  const dots = [];

  for (vaccType of vaccTypes) {
    const values =  data[vaccType];
    for (value of values) {
      dots.push({
        year: value.year,
        rate: value.rate,
        type: vaccType,
      });

    }
  }

  console.log('Dots', dots)

  const colors = {
    'DTP': '#a6cee3',
    'Hib': '#1f78b4',
    'Hep b': '#b2df8a',
    'Pneu': '#33a02c',
  };

  g_line.selectAll('circle')
    .remove()
    .exit()
    .data(dots)
    .enter()
    .append('circle')
    .attr('cx', d => graph.xScale(d.year))
    .attr('cy', d => graph.yScale(d.rate))
    .attr('r', 5)
    .attr('fill', '#ffffff')

    // Transition to black after some milliseconds.
    .transition()
    .duration(1000)
    .attr('fill', d => colors[d.type]);

  g_line.selectAll('path')
    .remove();

  for (vaccType of vaccTypes) {
    const line = d3.line()
      .x(d => graph.xScale(d.year))
      .y(d => graph.yScale(d.rate));

    g_line.append('path')
      .attr('class', 'lines ' + vaccType)
      .attr('d', line(data[vaccType]));
  }
}

function makeTitles(svg_line, graph) {
  svg_line.append('text')
    .attr('x', (graph.width + graph.margin.left + graph.margin.right) / 2)
    .attr('y', graph.margin.top + graph.margin.padding / 2)
    .attr('text-anchor', 'middle')
    .text('Line chart van geselecteerde landnaam')
}
// TODO: verander de variabele namen naar kortere namen


function update() {
  lineVaccTypes = [];
  d3.selectAll('.vacc-type-checkbox').each(function() {
    if (this.checked) lineVaccTypes.push(this.value);
  });
}

async function main() {

  let lineVaccTypes = ['DTP', 'Pneu', 'Hib', 'Hepb'];

  const data = {
    'DTP' : [
      {year:2014, rate:93},
      {year:2015, rate:91},
    ],
    'Pneu' : [
      {year:1997, rate:3},
      {year:1998, rate:6},
    ],
    'Hib' : [
      {year:2007, rate:20},
      {year:2008, rate:28},
    ],
    'Hepb' : [
      {year:2000, rate:60},
      {year:2001, rate:61},
    ],
  };

  xLabels(g_line, graph)

  yLabels(g_line, graph)
  drawline(g_line, graph, data)

  makeTitles(svg_line, graph)

}

// SVG for line graph
const svg_line = d3.select('.line')
  .attr('width', graph.width + graph.margin.left + graph.margin.right)
  .attr('height', graph.height + graph.margin.top + graph.margin.bottom + graph.margin.padding)
  .style('background', 'white')

const g_line = svg_line.append('g')
  .attr('transform', 'translate(' + graph.margin.left + ','
    + (graph.margin.top + graph.margin.padding) + ')');


main()
})();
