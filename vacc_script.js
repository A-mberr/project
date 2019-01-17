// Name: Amber Nobel
// Student ID: 11819359
// https://bl.ocks.org/d3noob/0e276dc70bb9184727ee47d6dd06e915 was used for constructing this code



async function loadData() {
  let data = await d3.json("data/data_nl.json");
  return data;
}


// function findAxisLabel(hovered) {
//   return d3.select('.axis--x')
//     .selectAll('text')
//     .filter(function(x) { return x == hovered.name; });
// }


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
}

function yLabels(svg, data, yScale, g){
  const yAxis = d3.axisLeft().scale(yScale)
  var gY = g.append("g")
    // .attr("transform", "translate(1, 0)")
    .call(yAxis);
}



function drawMap(height, width, margin, svg_map, g_map) {

  var myimage = g_map.append('image')
    .attr('xlink:href', 'http://www.datavisualisation-r.com/png/maps_europe_choropleth_countries.png')
    .attr('width', 500)
    .attr('height', 400)
    .attr("x", 300)
    .attr("y", 1)
}



function drawBarsEU(svg_bar, data, height, yScale, margin) {
  var x = d3.scaleBand()
    .rangeRound([0, 650])
    .domain(data.map(function (d) {
      return d['Cohort'];
    }))
    .padding(0.4);

  g_bar.selectAll(".bar")
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

function xLabelsEU(svg_bar, data, height, width, margin, g_bar){
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

  g_bar.append("g")
  	.attr("transform", "translate(0" + 10 / 10 + "," + height + ")")
  	.call(d3.axisBottom(x))
}

function yLabelsEU(svg_bar, data, yScale, g_bar){
  const yAxis = d3.axisLeft().scale(yScale)
  var gY = g_bar.append("g")
    // .attr("transform", "translate(1, 0)")
    .call(yAxis);
}


function drawMap(svg_map, g_map) {
  // https://unpkg.com/topojson@3.0.2/dist/topojson.min.js

  // This code has been obtained form the video of Curran Kelleher
  // https://www.youtube.com/watch?v=Qw6uAg3EO64
  const projection = d3.geoMercator()
  .scale(650)
    .center([19, 62])
    // .translate([width/2, height/2]);
  const pathGenerator = d3.geoPath().projection(projection)

  d3.json('data/eu.json')
    .then(data => {
      const countries = topojson.feature(data, data.objects.europe)
      console.log(countries)
      // var color = d3.scaleLinear()
      //   .domain([0, 5, 9])
      //   .range(["blue", "yellow", "purple"]);
      // var color = d3.scaleOrdinal(d3.schemeCategory10);

      // TODO: verander coloscale en pas aan naar de juiste treshold grenzen
      var colors = ['#045a8d','#2b8cbe','#74a9cf','#bdc9e1','#f1eef6']
      // var colors = ['#f1eef6','#bdc9e1','#74a9cf','#2b8cbe','#045a8d'];
      const color = d3.scaleThreshold()
        .domain([0.75, 0.8, 0.85, 0.9, 0.95])
        .range(colors);

      const countryRate = {"AZ":0,"AL":2,"AM":4,"BA":6,"BG":8,"CY":10,"DK":12,
        "IE":14,"EE":16,"AT":18,"CZ":20,"FI":22,"FR":24,"GE":26,"DE":28,"GR":30,
        "HR":32,"HU":34,"IS":36,"IL":38,"IT":40,"LV":42,"BY":44,"LT":46,"SK":48,
        "LI":50,"MK":52,"MT":54,"BE":56,"FO":58,"AD":60,"LU":62,"MC":64,"ME":66,
        "NL":68,"NO":70,"PL":72,"PT":74,"RO":76,"MD":78,"SI":80,"ES":82,"SE":84,
        "CH":86,"TR":88,"GB":90,"UA":92,"SM":94,"RS":96,"VA":98,"RU":100};

      g_map.selectAll('path').data(countries.features)
        .enter().append('path')
        .attr("class", "kaart")
        .attr("d",pathGenerator)
        .attr('fill', (d, i) => color(countryRate[d.id] / 100));
    });
}




async function main() {
  let data = await loadData();

  var margin = {top: 10, right: 30, bottom: 30, left: 40, padding: 80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  svg = d3.select('.histo')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom + margin.padding)
  .style("background", "white")

  g = svg.append("g").attr("transform", "translate(" + margin.left + "," + (margin.top + margin.padding) + ")");

  // SVG for map
  svg_map = d3.select('.map')
  .attr("width", width + margin.left + margin.right+ 200)
  .attr("height", height + margin.top + margin.bottom + 400)
  .style("background", "white")

  g_map = svg_map.append("g").attr("transform", "translate(" + margin.left + "," + (margin.top + margin.padding) + ")");

  // SVG for bar chart
  svg_bar = d3.select('.chart')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom + margin.padding)
  .style("background", "white")

  g_bar = svg_bar.append("g").attr("transform", "translate(" + margin.left + "," + (margin.top + margin.padding) + ")");


  let yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d['DKTP'])])
    .range([height, margin.top]);

  drawBars(svg, data, height, yScale, margin);
  xLabels(svg, data, height, width, margin, g);
  yLabels(svg, data, yScale, g);

  // drawMap(width, height, margin, svg_map, g_map)

  drawBarsEU(svg_bar, data, height, yScale, margin);
  xLabelsEU(svg_bar, data, height, width, margin, g_bar);
  yLabelsEU(svg_bar, data, yScale, g_bar);

  drawMap(svg_map, g_map);
}

main();
