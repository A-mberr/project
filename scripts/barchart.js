// Name: Amber Nobel
// Student ID: 11819359
// https://bl.ocks.org/d3noob/0e276dc70bb9184727ee47d6dd06e915 was used for constructing this code

async function loadCountryComparisonData(vaccType) {
  return await d3.json("data/vacc_bar_" + vaccType + ".json");
}

function drawBars(g, xScale, yScale, margin, height, countryComparisonData, selectedCountry) {

  const ratesInNetherlands = countryComparisonData['NL'];
  const ratesInCountry = countryComparisonData[selectedCountry];
  const years = Object.keys(ratesInCountry);

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

  const gutterWidth = 8; // in pixels
  const halfGutterWidth = gutterWidth / 2;
  const barWidth = 15;
  const colors = ["#4682B4", "black"];

  g.selectAll(".bar")
    .data(bars)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => {
      let x = xScale(d.year);
      if (i % 2 == 1) {
        x += barWidth + 1 - 33;
      }
      return x;
    })
    .attr('y', d => yScale(d.rate))
    .attr("width", barWidth)
    .attr('height', d => (height - margin.top) - yScale(d.rate))
    .attr("fill", (d, i) => colors[i % 2]);
}

function xLabels(g, g_line, xScale, height, margin) {

  const xAxis = d3.axisBottom()
    .scale(xScale)
    .tickFormat(d3.format("y")).ticks(20)

  var gX_bar = g.append("g")
    .attr("transform", "translate(0," + (height - margin.top) + ")")
    .call(xAxis);
}

function yLabels(g, g_line, yScale, margin) {
  const yAxis = d3.axisLeft()
    .scale(yScale)
    .tickFormat(d => d + "%");

  let gY = g.append("g")
    .attr("transform", "translate(" + margin.top + ",0)")
    .call(yAxis);
}

function generateLegend(svg_map, svg, width, margin, height) {

  var colorsBar = ["#2b8cbe", "#000000"]
  var domainsBar = ["Nederland", "Selected country"]

  var legendBar = svg.append("g")
    .attr("class", "legend")
    .attr("transform",
      "translate(" + (width - margin.left- margin.padding) +
      "," + (height / 3.5) + ")");

  const colorBoxSize = 20 - 3; // in pixels

  legendBar.selectAll('rect')
    .data(colorsBar)
    .enter()
    .append('rect')
    .attr('x', 0)
    // Drawing a rect starts at top left corner, and goes down. Subtract the box
    // size to align the boxes with the legend text.
    .attr("y", (d, i) => i * 20 - margin.padding - colorBoxSize)
    .attr('width', colorBoxSize)
    .attr('height', colorBoxSize)
    .style('fill',(d, i) => colorsBar[i]);

  legendBar.selectAll('text')
    .data(domainsBar)
    .enter()
    .append("text")
    .attr('x', 30)
    .attr("y", (d, i) => i * 20 - margin.padding)
    .text((d, i) => domainsBar[i])
    .attr('width', colorBoxSize)
    .attr('height', colorBoxSize);
}
