// Name: Amber Nobel
// Student ID: 11819359
// https://bl.ocks.org/d3noob/0e276dc70bb9184727ee47d6dd06e915 was used for constructing this code

async function loadCountryComparisonData(vaccType) {
  return await d3.json("data/vacc_bar_" + vaccType + ".json");
}

async function loadMapData(vaccType) {
  return await d3.json("data/vacc_map_" + vaccType + ".json");
}


// function findAxisLabel(hovered) {
//   return d3.select('.axis--x')
//     .selectAll('text')
//     .filter(function(x) { return x == hovered.name; });
// }

function drawBars(g, xScale, yScale, margin, height, countryComparisonData, selectedCountry) {
  // const bars = [];
  //
  // for (let i = 0; i < 20; i++) {
  //   bars.push({
  //     year: 1997 + i,
  //     rate: 100 - i,
  //   });
  //   bars.push({
  //     year: 1997 + i,
  //     rate: 50 + i,
  //   });
  // }

  const ratesInNetherlands = countryComparisonData['NL'];
  const ratesInCountry = countryComparisonData[selectedCountry];
  const years = Object.keys(ratesInCountry);

  const bars = [];

  for (let i = 0; i < years.length; i++) {
    let year = years[i];
    if (ratesInCountry[year] == null || ratesInNetherlands[year] == null) {
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

  console.log(bars);

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

  // const scale_bar = d3.scaleBand()
  //   .rangeRound([0, width - margin.padding])
  //   .padding(0.2)
  //   .domain(data.map(d => d['Cohort']));

  const xAxis = d3.axisBottom()
    .scale(xScale)
    .tickFormat(d3.format("y")).ticks(20)

  var gX_bar = g.append("g")
    .attr("transform", "translate(0," + (height - margin.top) + ")")
    .call(xAxis);

  var gX_line = g_line.append("g")
    .attr("transform", "translate(0," + (height - margin.top) + ")")
    .call(xAxis)
}

function yLabels(g, g_line, yScale, margin) {
  const yAxis = d3.axisLeft()
    .scale(yScale)
    .tickFormat(d => d + "%");

  let gY = g.append("g")
    .attr("transform", "translate(" + margin.top + ",0)")
    .call(yAxis);

  let gY_line = g_line.append("g")
    .attr("transform", "translate(" + margin.top + ",0)")
    .call(yAxis);
}


function drawline(g_line, xScale, yScale) {
  const colors = {
    "DTP": "#a6cee3",
    "Hib": '#1f78b4',
    "Hep b": '#b2df8a',
    "Pneu": "#33a02c",
    "Men C": "#fb9a99",
   };

   // var colors = ['#d7191c','#fdae61','#abd9e9','#4682b4']

  const tests = [{
      year: 1998,
      rate: 50,
      type: "DTP",
    },
    {
      year: 2000,
      rate: 75,
      type: "Hib",
    },
    {
      year: 2008,
      rate: 75,
      type: "Men C",
    }
  ]

  const test = [{'year': '2017', 'rate': 95, 'type': 'Hib'},
  {'year': '2016', 'rate': '95', 'type': 'Hib'},
  {'year': '2015', 'rate': '95', 'type': 'Hib'},
  {'year': '2014', 'rate': '95', 'type': 'Hib'},
  {'year': '2013', 'rate': '95', 'type': 'Hib'},
  {'year': '2012', 'rate': '95', 'type': 'Hib'},
  {'year': '2011', 'rate': '95', 'type': 'Hib'},
  {'year': '2010', 'rate': '95', 'type': 'Hib'},
  {'year': '2009', 'rate': '95', 'type': 'Hib'},
  {'year': '2008', 'rate': '95', 'type': 'Hib'},
  {'year': '2007', 'rate': '93', 'type': 'Hib'},
  {'year': '2006', 'rate': '93', 'type': 'Hib'},
  {'year': '2005', 'rate': '93', 'type': 'Hib'},
  {'year': '2004', 'rate': '91', 'type': 'Hib'},
  {'year': '2003', 'rate': '91', 'type': 'Hib'},
  {'year': '2002', 'rate': '91', 'type': 'Hib'},
  {'year': '2001', 'rate': '91', 'type': 'Hib'},
  {'year': '2000', 'rate': 91.0, 'type': 'Hib'},
  {'year': '1999', 'rate': 91.0, 'type': 'Hib'}]

  var points = g_line.selectAll("circle")
    .remove()
    .exit()
    .data(test)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.rate))
    .attr("r", 5)
    .attr("fill", "#ffffff")

    // Transition to black after some milliseconds.
    .transition()
    .duration(1000)
    // .interpolate("linear")
    .attr("fill", d => colors[d.type]);

  //   var x = d3.scaleLinear()
  //   .range([0, width]);
  //
  //   y = d3.scaleLinear()
  // .range([height, 0]);

  var lines = d3.line()
    .x(function(d) { return xScale(d.year); })
    .y(function(d) { return yScale(d.rate); });

    g_line.append("path")
      .datum(test)
      .attr("class", "lines")
      .attr("d", lines);

  // var line = d3.line()
  // .xScale(function(d) { return xScale(d.date)})
  //  .yScale(function(d) { return yScale(d.value)});

   // xScale.domain(d3.extent(test, function(d) { return d.year }));
   // yScale.domain(d3.extent(test, function(d) { return d.rate }));
}

function drawMap(svg_map, g_map, mapData, selectedYear) {
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

      // TODO: verander coloscale en pas aan naar de juiste treshold grenzen
      // var colors = ['#045a8d', '#2b8cbe', '#74a9cf', '#bdc9e1', '#f1eef6']
      var colors = ['#f1eef6','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#034e7b']
      const color = d3.scaleThreshold()
        .domain([0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95])
        .range(colors);

      const years = Object.keys(mapData);

      let countryRate = mapData[selectedYear]

      g_map.selectAll('path').data(countries.features)
        .enter().append('path')
        .attr("class", "kaart")
        .attr("d", pathGenerator)
        .attr('fill', (d, i) => color(countryRate[d.id] / 100));
    });
}

function generateLegend(svg_map, svg, width, margin, height) {

  // Legenda wordt nog gemaakt aan de hand van de data
  var colors = ['#f1eef6','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#034e7b']
  var domains = ["0-20%", "20-40%", "40-60%", "70-80%", "80-90%", "90-95%", "95-100%"]

  var colorsBar = ["#2b8cbe", "#000000"]
  var domainsBar = ["Nederland", "Selected country"]

  // TODO add text "Vacciantiegraad (%)"

  var legendMap = svg_map.append("g")
    .attr("class", "legend")
    .attr("transform",
      "translate(" + (width + margin.left) +
      "," + (height / 2) + ")");

  var legendBar = svg.append("g")
    .attr("class", "legend")
    .attr("transform",
      "translate(" + (width - margin.left- margin.padding) +
      "," + (height / 3.5) + ")");

  const colorBoxSize = 20 - 3; // in pixels

  legendMap.selectAll('text')
    .attr("x", 0)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .text("Vaccinatiegraad (%)")

  legendMap.selectAll('rect')
    .data(colors)
    .enter()
    .append('rect')
    .attr('x', 0)
    // Drawing a rect starts at top left corner, and goes down. Subtract the box
    // size to align the boxes with the legend text.
    .attr("y", (d, i) => i * 20 - margin.padding - colorBoxSize)
    .attr('width', colorBoxSize)
    .attr('height', colorBoxSize)
    .style('fill',(d, i) => colors[i]);

  legendMap.selectAll('text')
    .data(domains)
    .enter()
    .append("text")
    .attr('x', 30)
    .attr("y", (d, i) => i * 20 - margin.padding)
    .text((d, i) => domains[i])
    .attr('width', colorBoxSize)
    .attr('height', colorBoxSize);

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

function makeTitles(svg, svg_map, svg_line, width, margin) {
  svg_line.append("text")
    .attr("x", (width + margin.left + margin.right) / 2)
    .attr("y", margin.top + margin.padding / 2)
    .attr("text-anchor", "middle")
    .text("Line chart van geselecteerde landnaam")

  svg_map.append("text")
    .attr("x", (width + margin.left + margin.right) / 2)
    .attr("y", margin.top + margin.padding / 2)
    .attr("text-anchor", "middle")
    .text("Choropleth van vaccinatiegraad in Europa")
}

async function main() {
  const margin = {
      top: 10,
      right: 30,
      bottom: 30,
      left: 40,
      padding: 80
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // svg for grouped bar chart
  const svg = d3.select('.groupedBars')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + margin.padding)
    .style("background", "white")

  const g = svg.append("g")
    .attr("transform", "translate(" + margin.left + ","
      + (margin.top + margin.padding) + ")");

  // SVG for map
  const svg_map = d3.select('.map')
    .attr("width", width + margin.left + margin.right + 200)
    .attr("height", height + margin.top + margin.bottom + 400)
    .style("background", "white")

  const g_map = svg_map.append("g")
    .attr("transform", "translate(" + margin.left + ","
      + (margin.top + margin.padding) + ")");

  // SVG for line graph
  const svg_line = d3.select('.line')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + margin.padding)
    .style("background", "white")

  const g_line = svg_line.append("g")
    .attr("transform", "translate(" + margin.left + ","
      + (margin.top + margin.padding) + ")");

  let xScale = d3.scaleLinear()
    .domain([1997, 2017])
    .range([margin.top, width - margin.top - margin.padding]);

  let yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.top, margin.top]);

  const selectedCountry = "AL";
  const countryComparisonData = await loadCountryComparisonData('Hib');

  const selectedYear = 2000;
  const mapData = await loadMapData('Hib');

  makeTitles(svg, svg_map, svg_line, width, margin)

  drawBars(g, xScale, yScale, margin, height, countryComparisonData,
          selectedCountry);
  xLabels(g, g_line, xScale, height, margin);
  yLabels(g, g_line, yScale, margin);

  drawMap(svg_map, g_map, mapData, selectedYear);
  generateLegend(svg_map, svg, width, margin, height);

  drawline(g_line, xScale, yScale);
}

main();
