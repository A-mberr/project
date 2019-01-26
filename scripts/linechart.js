// Name: Amber Nobel
// Student ID: 11819359

(function() {

function xLabels(g, g_line, xScale, height, margin) {

  const xAxis = d3.axisBottom()
    .scale(xScale)
    .tickFormat(d3.format("y")).ticks(20)

  var gX_line = g_line.append("g")
    .attr("transform", "translate(0," + (height - margin.top) + ")")
    .call(xAxis)
}

function yLabels(g, g_line, yScale, margin) {
  const yAxis = d3.axisLeft()
    .scale(yScale)
    .tickFormat(d => d + "%");

  gY_line = g_line.append("g")
    .attr("transform", "translate(" + margin.top + ",0)")
    .call(yAxis);
}

function drawline(g_line, xScale, yScale, data, vaccTypes) {

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

  console.log("Dots", dots)

  const colors = {
    "DTP": "#a6cee3",
    "Hib": '#1f78b4',
    "Hep b": '#b2df8a',
    "Pneu": "#33a02c",
  };

  g_line.selectAll("circle")
    .remove()
    .exit()
    .data(dots)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.rate))
    .attr("r", 5)
    .attr("fill", "#ffffff")

    // Transition to black after some milliseconds.
    .transition()
    .duration(1000)
    .attr("fill", d => colors[d.type]);

  g_line.selectAll('path')
    .remove();

  for (vaccType of vaccTypes) {
    const line = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.rate));

    g_line.append('path')
      .attr("class", "lines " + vaccType)
      .attr("d", line(data[vaccType]));
  }
}

function makeTitles(svg, svg_map, svg_line, width, margin) {
  svg_line.append("text")
    .attr("x", (width + margin.left + margin.right) / 2)
    .attr("y", margin.top + margin.padding / 2)
    .attr("text-anchor", "middle")
    .text("Line chart van geselecteerde landnaam")
}
let lineVaccTypes = ['DTP', "Pneu", 'Hib', 'Hepb'];

function update() {
  lineVaccTypes = [];
  d3.selectAll('.vacc-type-checkbox').each(function() {
    if (this.checked) lineVaccTypes.push(this.value);
  });
}
})();
