// Name: Amber Nobel
// Student ID: 11819359

(function() {
  "use strict";

function loadMapData(vaccType) {
  return Promise.all([
    d3.json('data/vacc_map_' + vaccType + '.json'),
    d3.json('data/eu.json'),
  ]);
}

function drawMap(svg_map, g_map, polygons) {
  // This code has been obtained form the video of Curran Kelleher
  // https://www.youtube.com/watch?v=Qw6uAg3EO64
  const projection = d3.geoMercator()
    .scale(650)
    .center([19, 62])
  // .translate([width/2, height/2]);
  const pathGenerator = d3.geoPath().projection(projection)

      const countries = topojson.feature(polygons, polygons.objects.europe)

      // TODO: verander colorscale en pas aan naar de juiste treshold grenzen
      // var colors = ['#045a8d', '#2b8cbe', '#74a9cf', '#bdc9e1', '#f1eef6']
      var colors = ['#f1eef6','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#034e7b']
      const color = d3.scaleThreshold()
        .domain([0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95])
        .range(colors);

      let map = g_map.selectAll('path').data(countries.features)
        .enter().append('path')
        .attr('class', 'kaart')
        .attr('d', pathGenerator)
        .append('title')
        .text(d => d.properties.NAME);
      // .text('hello');
      //   .attr('fill', (d, i) => color(countryRate[d.id] / 100));

}

function generateLegend(svg_map, graph) {

  // Legenda wordt nog gemaakt aan de hand van de data
  // TODO: verander de legenda naar waarden die loppen met de margins
  var colors = ['#f1eef6','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#034e7b']
  var domains = ['0-20%', '20-40%', '40-60%', '70-80%', '80-90%', '90-95%', '95-100%']

  // TODO add text 'Vacciantiegraad (%)'
  var legendMap = svg_map.append('g')
    .attr('class', 'legend')
    .attr('transform',
    'translate(' + (graph.width + graph.margin.left) + ',' + (graph.height / 2) + ')');

  const colorBoxSize = 20 - 3; // in pixels

  legendMap.selectAll('text')
    .attr('x', 0)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .text('Vaccinatiegraad (%)')

  legendMap.selectAll('rect')
    .data(colors)
    .enter()
    .append('rect')
    .attr('x', 0)
    // Drawing a rect starts at top left corner, and goes down. Subtract the box
    // size to align the boxes with the legend text.
    .attr('y', (d, i) => i * 20 - graph.margin.padding - colorBoxSize)
    .attr('width', colorBoxSize)
    .attr('height', colorBoxSize)
    .style('fill',(d, i) => colors[i]);

  legendMap.selectAll('text')
    .data(domains)
    .enter()
    .append('text')
    .attr('x', 30)
    .attr('y', (d, i) => i * 20 - graph.margin.padding)
    .text((d, i) => domains[i])
    .attr('width', colorBoxSize)
    .attr('height', colorBoxSize);
}

function makeTitles(svg_map, graph) {

  svg_map.append('text')
    .attr('x', (graph.width + graph.margin.left + graph.margin.right) / 2)
    .attr('y', graph.margin.top + graph.margin.padding / 2)
    .attr('text-anchor', 'middle')
    .text('De vaccinatiegraad in Europa')
}

// function updateMap(yearUpdate) {
//
//   var colors = ['#f1eef6','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#034e7b']
//   const color = d3.scaleThreshold()
//     .domain([0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95])
//     .range(colors);
//
//   d3.json('data/eu.json')
//     .then(data => {
//       let countryRate = mapData[yearUpdate]
//
//        g_map.selectAll('path')
//        .attr('fill', (d, i) => color(countryRate[d.id] / 100));
//   });
// }

// update the elements
function updateMap(yearUpdate, mapData) {

  var colors = ['#f1eef6','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#034e7b']
  const color = d3.scaleThreshold()
    .domain([0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95])
    .range(colors);

  //d3.json('data/eu.json').then(jkjjkk => {
    let countryRate = mapData[yearUpdate]
    g_map.selectAll('path')
      // .attr('fill', (d, i) => color(Object.values(countryRate) / 100));
      .attr('fill', (d, i) => color(countryRate[d.id] / 100));

    console.log("iii", countryRate)
    console.log("jjj", Object.values(countryRate))

  //});
}

function main(data) {
  const [vaccData, polygons] = data;
  const defaultSelectedYear = 2002;

  // TODO: svg_map veranderen voor map
  drawMap(svg_map, g_map, polygons)

  generateLegend(svg_map, graph)

  makeTitles(svg_map, graph)

  updateMap(defaultSelectedYear, vaccData);

  d3.select('#slider').on('input', function() {
    updateMap(+this.value, vaccData);
  });
}

// SVG for map
const svg_map = d3.select('.map')
  .attr('width', graph.width + graph.margin.left + graph.margin.right + 200)
  .attr('height', graph.height + graph.margin.top + graph.margin.bottom + 400)
  .style('background', 'white')

const g_map = svg_map.append('g')
  .attr('transform', 'translate(' + graph.margin.left + ','
    + (graph.margin.top + graph.margin.padding) + ')');

loadMapData('Hib').then(main);

})();
