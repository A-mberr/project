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
    "AL": "Albania",
    "AD": "Andorra",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BY": "Belarus",
    "BE": "Belgium",
    "BA": "Bosnia and Herzegovina",
    "BG": "Bulgaria",
    "HR": "Croatia",
    "CY": "Cyprus",
    "CZ": "Czechia",
    "DK": "Denmark",
    "EE": "Estonia",
    "FI": "Finland",
    "FR": "France",
    "GE": "Georgia",
    "DE": "Germany",
    "GR": "Greece",
    "HU": "Hungary",
    "IS": "Iceland",
    "IE": "Ireland",
    "IT": "Italy",
    "KZ": "Kazakhstan",
    "XK": "Kosovo",
    "LV": "Latvia",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MK": "The former Yugoslav republic of Macedonia",
    "MT": "Malta",
    "MD": "Republic of Moldova",
    "MC": "Monaco",
    "ME": "Montenegro",
    "NL": "Netherlands",
    "NO": "Norway",
    "PL": "Poland",
    "PT": "Portugal",
    "RO": "Romania",
    "SM": "San Marino",
    "RS": "Serbia",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "ES": "Spain",
    "SE": "Sweden",
    "CH": "Switzerland",
    "TR": "Turkey",
    "UA": "Ukraine",
    "GB": "United Kingdom of Great Britain and Northern Ireland",
    "VA": "Vatican City",
  };

  return {
    margin: margin,
    width: width,
    height: height,
    xScale: xScale,
    yScale: yScale,
    maxYears: 20,
    fullCountryNames: fullCountryNames,
    setSelectedCountry: function(countryCode) {
      console.log('clicked country:', countryCode);
      barChart.setSelectedCountry(countryCode);
      lineChart.setSelectedCountry(countryCode);
    },
    setSelectedVaccType: function(vaccType) {
      console.log('selection:', vaccType);
      barChart.setSelectedVaccType(vaccType);
      lineChart.setSelectedVaccType(vaccType);
      choropleth.setSelectedVaccType(vaccType);

    },
  };
})();
