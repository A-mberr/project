// Name: Amber Nobel
// Student ID: 11819359
// https://bl.ocks.org/d3noob/0e276dc70bb9184727ee47d6dd06e915 was used for constructing this code

async function loadData() {
  let data = await d3.json("data/data_nl.json");
  return data;
}


function findAxisLabel(hovered) {
  return d3.select('.axis--x')
    .selectAll('text')
    .filter(function(x) { return x == hovered.name; });
}


function drawBars(svg, data, height, yScale, margin) {
  var x = d3.scaleBand()
    .rangeRound([0, 650])
    .domain(data.map(function (d) {
      return d['Cohort'];
    }))
    .padding(0.05);

  g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
           .attr("class", "bar")
           .attr("x", function(d) { return x(d['Cohort']); })
           .attr('y', d => yScale(d['DKTP']))
           .attr("width", x.bandwidth())
           .attr('height', d => height - yScale(d['DKTP']));
           // .on("mouseover", d => {
           //   findAxisLabel(d).attr('style', "text-anchor:start; font-weight: bold;");
           // })
           // .on("mouseout", d => {
           //   findAxisLabel(d).attr('style', "text-anchor:start; font-weight: regular;");
           // });
}


function drawMap(height, width, margin, svg_map, g_map) {

  var myimage = g_map.append('image')
    .attr('xlink:href', 'http://www.datavisualisation-r.com/png/maps_europe_choropleth_countries.png')
    .attr('width', 500)
    .attr('height', 400)
    .attr("x", 300)
    .attr("y", 1)
}


function xLabels(svg, data, height, width, margin, g){
  // var xScale = d3.scaleBand()
  //   .range([-100, width - margin.left])
  //   .domain([1995, 2015])
  //
  // var xAxis = d3.axisBottom()
  //   .scale(xScale)
  //   .ticks([20]);

  var x = d3.scaleBand()
  	.rangeRound([0, 650])
  	.padding(0.1)
    .domain(data.map(function (d) {
      return d['Cohort'];
    }));

  g.append("g")
  	.attr("transform", "translate(0" + 10 / 10 + "," + height + ")")
  	.call(d3.axisBottom(x))

  // places the years rotated on the x axis so the labels are readible
  // var gX = svg.append("g")
  //   .attr("class", "axis axis--x")
  //   .attr("transform", "translate(50," + height + ")")
  //   .call(xAxis)
  // .selectAll("text")
  //   .attr("y", 0)
  //   .attr("x", 9)
  //   .attr("dy", ".35em")
  //   .attr("transform", "rotate(90)")
  //   .style("text-anchor", "start");;
}

function yLabels(svg, data, yScale){
  const yAxis = d3.axisLeft().scale(yScale)
  var gY = g.append("g")
    // .attr("transform", "translate(1, 0)")
    .call(yAxis);
}


async function main() {
  let data = await loadData();

  var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // SVG for the histogram
  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // SVG for map
  var svg_map = d3.select("body").append("svg")
    .attr('class', 'map')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background", "white")

  g_map = svg_map.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // SVG for bar chart
  var svg_bar = d3.select("body").append("svg")
    .attr('class', 'map')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background", "white")

  g_bar = svg_bar.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d['DKTP'])])
    .range([height, margin.top]);

  drawBars(svg, data, height, yScale, margin);
  xLabels(svg, data, height, width, margin, g);
  yLabels(svg, data, yScale);
  drawMap(width, height, margin, svg_map, g_map)

}

main();
