// Name: Amber Nobel
// Student ID: 11819359
// https://bl.ocks.org/d3noob/0e276dc70bb9184727ee47d6dd06e915 was used for constructing this code

async function loadCountryComparisonData(vaccType) {
  return await d3.json("data/vacc_bar_" + vaccType + ".json");
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

  const bars = [{'year': '2017', 'rate': 99, 'type': 'Hib', 'country': 'AL'},
  {'year': '2017', 'rate': 94, 'type': 'Hib', 'country': 'NL'},
  {'year': '2016', 'rate': '98', 'type': 'Hib', 'country': 'AL'},
  {'year': '2016', 'rate': '95', 'type': 'Hib', 'country': 'NL'},
  {'year': '2015', 'rate': '99', 'type': 'Hib', 'country': 'AL'},
  {'year': '2015', 'rate': '96', 'type': 'Hib', 'country': 'NL'},
  {'year': '2014', 'rate': '98', 'type': 'Hib', 'country': 'AL'},
  {'year': '2014', 'rate': '96', 'type': 'Hib', 'country': 'NL'},
  {'year': '2013', 'rate': '99', 'type': 'Hib', 'country': 'AL'},
  {'year': '2013', 'rate': '97', 'type': 'Hib', 'country': 'NL'},
  {'year': '2012', 'rate': '99', 'type': 'Hib', 'country': 'AL'},
  {'year': '2012', 'rate': '97', 'type': 'Hib', 'country': 'NL'},
  {'year': '2011', 'rate': '99', 'type': 'Hib', 'country': 'AL'},
  {'year': '2011', 'rate': '97', 'type': 'Hib', 'country': 'NL'},
  {'year': '2010', 'rate': '99', 'type': 'Hib', 'country': 'AL'},
  {'year': '2010', 'rate': '97', 'type': 'Hib', 'country': 'NL'},
  {'year': '2009', 'rate': '98', 'type': 'Hib', 'country': 'AL'},
  {'year': '2009', 'rate': '97', 'type': 'Hib', 'country': 'NL'},
  {'year': '2008', 'rate': 'NULL', 'type': 'Hib', 'country': 'AL'},
  {'year': '2008', 'rate': '97', 'type': 'Hib', 'country': 'NL'},
  {'year': '2007', 'rate': 'NULL', 'type': 'Hib', 'country': 'AL'},
  {'year': '2007', 'rate': '97', 'type': 'Hib', 'country': 'NL'},
  {'year': '2006', 'rate': 'NULL', 'type': 'Hib', 'country': 'AL'},
  {'year': '2006', 'rate': '96', 'type': 'Hib', 'country': 'NL'},
  {'year': '2005', 'rate': 'NULL', 'type': 'Hib', 'country': 'AL'},
  {'year': '2005', 'rate': '96', 'type': 'Hib', 'country': 'NL'},
  {'year': '2004', 'rate': 'NULL', 'type': 'Hib', 'country': 'AL'},
  {'year': '2004', 'rate': '97', 'type': 'Hib', 'country': 'NL'},
  {'year': '2003', 'rate': 'NULL', 'type': 'Hib', 'country': 'AL'},
  {'year': '2003', 'rate': '97', 'type': 'Hib', 'country': 'NL'},
  {'year': '2002', 'rate': 'NULL', 'type': 'Hib', 'country': 'AL'},
  {'year': '2002', 'rate': '96', 'type': 'Hib', 'country': 'NL'},
  {'year': '2001', 'rate': 'NULL', 'type': 'Hib', 'country': 'AL'},
  {'year': '2001', 'rate': '96', 'type': 'Hib', 'country': 'NL'},
  {'year': '2000', 'rate': 'NULL', 'type': 'Hib', 'country': 'AL'},
  {'year': '2000', 'rate': 96.0, 'type': 'Hib', 'country': 'NL'},
  {'year': '1999', 'rate': 'NULL', 'type': 'Hib', 'country': 'AL'},
  {'year': '1999', 'rate': 96.0, 'type': 'Hib', 'country': 'NL'}]

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
        x += barWidth + 1;
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

}

function drawMap(svg_map, g_map) {
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
      var colors = ['#f1eef6', '#bdc9e1', '#74a9cf', '#2b8cbe', '#045a8d']
      const color = d3.scaleThreshold()
        .domain([0.8, 0.85, 0.9, 0.93, 0.97])
        .range(colors);

        const countryRates = {"AZ":0,"AL":2,"AM":4,"BA":6,"BG":8,"CY":10,"DK":12,
          "IE":14,"EE":16,"AT":18,"CZ":20,"FI":22,"FR":24,"GE":26,"DE":28,"GR":30,
          "HR":32,"HU":34,"IS":36,"IL":38,"IT":40,"LV":42,"BY":44,"LT":46,"SK":48,
          "LI":50,"MK":52,"MT":54,"BE":56,"FO":58,"AD":60,"LU":62,"MC":64,"ME":66,
          "NL":68,"NO":70,"PL":72,"PT":74,"RO":76,"MD":78,"SI":80,"ES":82,"SE":84,
          "CH":86,"TR":88,"GB":90,"UA":92,"SM":94,"RS":96,"VA":98,"RU":100};

      // const countryRate = {'AL': 99, 'AD': 99, 'AT': 90, 'BY': 9, 'BE': 97, 'BA': 68, 'BG': 92, 'HR': 87, 'DK': 98, 'EE': 93, 'FI': 89, 'FR': 95, 'DE': 93, 'GR': 99, 'HU': 99, 'IS': 89, 'IE': 95, 'IT': 94, 'LV': 98, 'LT': 94, 'LU': 99, 'MT': 98, 'MC': 99, 'NL': 94, 'NO': 96, 'PL': 98, 'PT': 98, 'RO': 82, 'SM': 85, 'SK': 96, 'SI': 94, 'ES': 98, 'SE': 97, 'CH': 95, 'UA': 39}
      const countryRate = {'AL': 99, 'AD': 99, 'AT': 90, 'BY': 9, 'BE': 97,
      'BA': 68, 'BG': 92, 'HR': 87, 'CZ': 94, 'DK': 98, 'EE': 93, 'FI': 89,
      'FR': 95, 'DE': 93, 'GR': 99, 'HU': 99, 'IS': 89, 'IE': 95, 'IT': 94,
      'LV': 98, 'LT': 94, 'LU': 99, 'MT': 98, 'MC': 99, 'NL': 94, 'NO': 96,
      'PL': 98, 'PT': 98, 'MD': 88, 'RO': 82, 'SM': 85, 'SI': 94, 'ES': 98,
      'SE': 97, 'CH': 95, 'MK': 91, 'UA': 39, 'GB': 94}
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
  var domains = ["0-20%", "20-40%", "40-60%", "60-70%", "70-80%", "80-90%", "90-100%"]

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

  // svg.append("text")
  //   .attr("x", (width + margin.left + margin.right) / 2)
  //   .attr("y", margin.top + margin.padding / 2)
  //   .attr("text-anchor", "middle")
  //   .text("Nederland vergelijken met geselecteerde land")
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

  makeTitles(svg, svg_map, svg_line, width, margin)

  drawBars(g, xScale, yScale, margin, height, countryComparisonData,
          selectedCountry);
  xLabels(g, g_line, xScale, height, margin);
  yLabels(g, g_line, yScale, margin);

  drawMap(svg_map, g_map);
  generateLegend(svg_map, svg, width, margin, height);

  drawline(g_line, xScale, yScale);
}

main();
