// Name: Amber Nobel
// Student ID: 11819359

const graph = (function() {
  const margin = {
      top: 10,
      right: 30,
      bottom: 30,
      left: 40,
      padding: 80
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .domain([1998, 2017])
    .range([margin.top, width - margin.top - margin.padding]);

  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.top, margin.top]);

  const fullCountryNames = {
    "AL": "Albanië",
    "AD": "Andorra",
    "AT": "Oostenrijk",
    "AZ": "Azerbaijan",
    "BY": "Wit-Rusland",
    "BE": "België",
    "BA": "Bosnië en Herzegovina",
    "BG": "Bulgarije",
    "HR": "Kroatia",
    "CY": "Cyprus",
    "CZ": "Tsjechië",
    "DK": "Denemarken",
    "EE": "Estland",
    "FI": "Finland",
    "FR": "Frankrijk",
    "GE": "Georgië",
    "DE": "Duitsland",
    "GR": "Griekenland",
    "HU": "Hongarije",
    "IS": "IJsland",
    "IE": "Ierland",
    "IT": "Italië",
    "KZ": "Kazakhstan",
    "XK": "Kosovo",
    "LV": "Letland",
    "LI": "Liechtenstein",
    "LT": "Litouwen",
    "LU": "Luxemburg",
    "MK": "Macedonië",
    "MT": "Malta",
    "MD": "Moldavië",
    "MC": "Monaco",
    "ME": "Montenegro",
    "NL": "Nederland",
    "NO": "Norwegen",
    "PL": "Polen",
    "PT": "Portugal",
    "RO": "Roemenië",
    "SM": "San Marino",
    "RS": "Servië",
    "SK": "Slowakije",
    "SI": "Slovenië",
    "ES": "Spanje",
    "SE": "Zweden",
    "CH": "Zwitzerland",
    "TR": "Turkije",
    "UA": "Oekraïne",
    "GB": "Verenigd Koninkrijk",
    "VA": "Vaticaan Stad",
  };

  return {
    margin: margin,
    width: width,
    height: height,
    xScale: xScale,
    yScale: yScale,
    maxYears: 20,
    // detetects and creates global of selected country
    fullCountryNames: fullCountryNames,
    setSelectedCountry: function(countryCode) {
      barChart.setSelectedCountry(countryCode);
      lineChart.setSelectedCountry(countryCode);
    },
    // detetects and creates global of selected vaccine type
    setSelectedVaccType: function(vaccType) {
      barChart.setSelectedVaccType(vaccType);
      lineChart.setSelectedVaccType(vaccType);
      choropleth.setSelectedVaccType(vaccType);

    },
  };
})();
