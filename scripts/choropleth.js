// Name: Amber Nobel
// Student ID: 11819359

async function loadMapData(vaccType) {
  return await d3.json("data/vacc_map_" + vaccType + ".json");
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

      // let countryRate = mapData[yearUpdate]

      // console.log(mapData)

      // TODO: verander coloscale en pas aan naar de juiste treshold grenzen
      // var colors = ['#045a8d', '#2b8cbe', '#74a9cf', '#bdc9e1', '#f1eef6']
      var colors = ['#f1eef6','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#034e7b']
      const color = d3.scaleThreshold()
        .domain([0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95])
        .range(colors);

      const years = Object.keys(mapData);

      let countryRate = mapData[selectedYear]
        console.log(data)

      console.log("blah", data)

      let map = g_map.selectAll('path').data(countries.features)
        .enter().append('path')
        .attr("class", "kaart")
        .attr("d", pathGenerator)
      .append('title')
      // .text(d => console.log(d.id));
      .text(d => d.properties.NAME);
      // .text('hello');
      //   .attr('fill', (d, i) => color(countryRate[d.id] / 100));

    });
}

function generateLegend(svg_map, svg, width, margin, height) {

  // Legenda wordt nog gemaakt aan de hand van de data
  var colors = ['#f1eef6','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#034e7b']
  var domains = ["0-20%", "20-40%", "40-60%", "70-80%", "80-90%", "90-95%", "95-100%"]

  // TODO add text "Vacciantiegraad (%)"
  var legendMap = svg_map.append("g")
    .attr("class", "legend")
    .attr("transform",
    "translate(" + (width + margin.left) + "," + (height / 2) + ")");

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
}

function makeTitles(svg, svg_map, svg_line, width, margin) {

  svg_map.append("text")
    .attr("x", (width + margin.left + margin.right) / 2)
    .attr("y", margin.top + margin.padding / 2)
    .attr("text-anchor", "middle")
    .text("De vaccinatiegraad in Europa")
}

function updateMap(yearUpdate) {

  var colors = ['#f1eef6','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#034e7b']
  const color = d3.scaleThreshold()
    .domain([0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95])
    .range(colors);

  d3.json('data/eu.json')
    .then(data => {
      let countryRate = mapData[yearUpdate]

       g_map.selectAll('path')
       .attr('fill', (d, i) => color(countryRate[d.id] / 100));
  });
}
