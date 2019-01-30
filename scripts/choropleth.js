// Name: Amber Nobel
// Student ID: 11819359

const choropleth = (function() {

function loadMapData(vaccType) {
  return Promise.all([
    // also loads the topojson with the polygons of Europe in it
    d3.json('data/vacc_map_' + vaccType + '.json'),
    d3.json('data/eu.json'),
  ]);
}

function drawMap(svg, g, polygons) {
  // This code has been obtained form the video of Curran Kelleher
  // https://www.youtube.com/watch?v=Qw6uAg3EO64
  const projection = d3.geoMercator()
    .scale(500)
    .center([27, 60])

  const pathGenerator = d3.geoPath().projection(projection)
  const countries = topojson.feature(polygons, polygons.objects.europe)

  // sets margins to color the map
  var colors = ['#fff7fb','#ece7f2','#d0d1e6','#a6bddb','#74a9cf','#3690c0',
    '#0570b0','#034e7b']
  const color = d3.scaleThreshold()
    .domain([0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95])
    .range(colors);

  // draws the map
  let map = g.selectAll('path').data(countries.features)
    .enter()
    .append('path')
    .attr('class', 'kaart')
    .attr('d', pathGenerator)
    .append('title')
    .text(d => d.properties.NAME);
}

function generateLegend(svg, graph) {
  // set margins with sequential colors from http://colorbrewer2.org/
  var colors = ['#ffffff', '#fff7fb','#ece7f2','#d0d1e6','#a6bddb','#74a9cf',
    '#3690c0','#0570b0','#034e7b', '#000000']
  var domains = ['Vaccinatiegraad', '<40%', '40-50%', '50-60%', '60-70%',
    '70-80%', '85-90%', '90-95%', '95-100%', 'Geen data']

  var legendMap = svg.append('g')
    .attr('class', 'legend')
    .attr('transform',
    'translate(' + (graph.width + graph.margin.left - 130) + ',' +
      (graph.height / 2) + ')');

  const colorBoxSize = 20 - 3; // in pixels

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

  // places legend catorgies net to the colored rectangles
  legendMap.selectAll('text')
    .remove()
    .exit()
    .data(domains)
    .enter()
    .append('text')
    .attr('x', 30)
    .attr('y', (d, i) => i * 23 - graph.margin.padding)
    .text((d, i) => domains[i])
    .attr('width', colorBoxSize)
    .attr('height', colorBoxSize);
}

function makeTitle(svg, graph) {
  svg.append('text')
    .attr('class', 'title')
    .attr('x', (graph.width + graph.margin.left + graph.margin.right) / 2)
    .attr('y', graph.margin.top + graph.margin.padding / 2)
    .attr('text-anchor', 'middle')
    .text('Vaccinatiegraad in Europa in het jaar 2007')
}

function updateTitle(yearUpdate, svg, graph) {
  svg.selectAll('.title')
    .remove()
    .exit()

  // updates title based on the selected year on slider
  svg.append('text')
    .attr('class', 'title')
    .attr('x', (graph.width + graph.margin.left + graph.margin.right) / 2)
    .attr('y', graph.margin.top + graph.margin.padding / 2)
    .attr('text-anchor', 'middle')
    .text('Vaccinatiegraad in Europa in het jaar ' + yearUpdate)
}

// update the elements based on the year of de slider
function updateMap(yearUpdate, mapData) {
  var colors = ['#fff7fb','#ece7f2','#d0d1e6','#a6bddb','#74a9cf',
    '#3690c0','#0570b0','#034e7b']
  const color = d3.scaleThreshold()
    .domain([0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95])
    .range(colors);

  let countryRate = mapData[yearUpdate]
  g.selectAll('path')
    .attr('fill', (d, i) => color(countryRate[d.id] / 100));
}

function main(data) {
  const [vaccData, polygons] = data;
  const defaultSelectedYear = 2007;

  drawMap(svg, g, polygons)

  updateMap(defaultSelectedYear, vaccData);

  d3.select('#slider').on('input', function() {
    updateMap(+this.value, vaccData)
    updateTitle(+this.value, svg, graph);
  });

  d3.selectAll('path').on('click', (d, i) => graph.setSelectedCountry(d.id));
}

// SVG for map
const svg = d3.select('.map')
  .attr('width', graph.width + graph.margin.left + graph.margin.right)
  .attr('height', graph.height + graph.margin.top + graph.margin.bottom + 250)

const g = svg.append('g')
  .attr('transform', 'translate(' + graph.margin.left + ','
    + (graph.margin.top + graph.margin.padding) + ')');

let selectedVaccType = 'DTP';

function load() {
  loadMapData(selectedVaccType).then(main);
}

load();
makeTitle(svg, graph)
generateLegend(svg, graph)

// returns selected vaccine type
return {
  setSelectedVaccType: function(vaccType) {
    selectedVaccType = vaccType;
    load();
  },
};

})();
