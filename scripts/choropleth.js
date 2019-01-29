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
    .scale(500)
    .center([27, 60])
  const pathGenerator = d3.geoPath().projection(projection)

  const countries = topojson.feature(polygons, polygons.objects.europe)

  // TODO: verander colorscale en pas aan naar de juiste treshold grenzen
  var colors = ['#f1eef6','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#034e7b']
  const color = d3.scaleThreshold()
    .domain([0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95])
    .range(colors);

  let map = g_map.selectAll('path').data(countries.features)
    .enter().append('path')
    .attr('class', 'kaart')
    .attr('d', pathGenerator)
    .append('title')
    // .text(d => console.log(d.id));
    .text(d => d.properties.NAME);
}

function generateLegend(svg_map, graph) {

  // Legenda wordt nog gemaakt aan de hand van de data
  // TODO: verander de legenda naar waarden die loppen met de margins
  var colors = ['#fff7fb','#ece7f2','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#034e7b']
  var domains = ['<40%', '40-50%', '50-60%', '60-70%', '70-80%', '85-90%', '90-95%', '95-100%']

  // TODO add text 'Vacciantiegraad (%)'
  var legendMap = svg_map.append('g')
    .attr('class', 'legend')
    .attr('transform',
    'translate(' + (graph.width + graph.margin.left - 130) + ',' + (graph.height / 2) + ')');

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
    .attr('y', (d, i) => i * 23 - graph.margin.padding - colorBoxSize)
    .attr('width', colorBoxSize)
    .attr('height', colorBoxSize)
    .style('fill',(d, i) => colors[i]);

  legendMap.selectAll('text')
    .data(domains)
    .enter()
    .append('text')
    .attr('x', 30)
    .attr('y', (d, i) => i * 23 - graph.margin.padding)
    .text((d, i) => domains[i])
    .attr('width', colorBoxSize)
    .attr('height', colorBoxSize);
}

function makeTitle(svg_map, graph) {

  svg_map.append('text')
    .attr('class', 'title')
    .attr('x', (graph.width + graph.margin.left + graph.margin.right) / 2)
    .attr('y', graph.margin.top + graph.margin.padding / 2)
    .attr('text-anchor', 'middle')
    .text('Vaccinatiegraad in Europa')
}

// update the elements
function updateMap(yearUpdate, mapData) {

  var colors = ['#f1eef6','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#034e7b']
  const color = d3.scaleThreshold()
    .domain([0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95])
    .range(colors);

  let countryRate = mapData[yearUpdate]
  g_map.selectAll('path')
    .attr('fill', (d, i) => color(countryRate[d.id] / 100));
}

function main(data) {
  const [vaccData, polygons] = data;
  const defaultSelectedYear = 2002;

  // TODO: svg_map veranderen voor map
  drawMap(svg_map, g_map, polygons)

  generateLegend(svg_map, graph)

  makeTitle(svg_map, graph)

  updateMap(defaultSelectedYear, vaccData);

  d3.select('#slider').on('input', function() {
    updateMap(+this.value, vaccData);
  });

  d3.selectAll('path').on('click', (d, i) => graph.setSelectedCountry(d.id));
}

// SVG for map
const svg_map = d3.select('.map')
  .attr('width', graph.width + graph.margin.left + graph.margin.right)
  .attr('height', graph.height + graph.margin.top + graph.margin.bottom + 250)
  .style('background', 'white')

const g_map = svg_map.append('g')
  .attr('transform', 'translate(' + graph.margin.left + ','
    + (graph.margin.top + graph.margin.padding) + ')');

loadMapData('Hib').then(main);

})();
