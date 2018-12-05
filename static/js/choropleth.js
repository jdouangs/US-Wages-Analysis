// Basemaps
let lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

let outdoormap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: API_KEY
});

// Initialize map
let myMap = L.map("map-id", {
  center: [37.8, -96],
  zoom: 4,
  layers: [lightmap]
});

// Color changer based on hourly wage
function getColor(d) {
  return d > 35 ? '#800026' :
         d > 30 ? '#BD0026' :
         d > 25 ? '#E31A1C' :
         d > 20 ? '#FC4E2A' :
         d > 15 ? '#FD8D3C' :
         d > 10 ? '#FEB24C' :
         d > 5  ? '#FED976' :
                  '#FFFFFF';
};

// Creating layer style
function style(feature) {
  return {
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
};

// Set mouse events to change map styling
function onEachFeature(feature, layer) {
  layer.on({
    // Opacity change to 90% on hover
    mouseover: function(event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.9
      });
    },
    // Opacity resents on mouse out
    mouseout: function(event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.7
      });
    }
  });

  // Tool tip
  layer.bindPopup("<h2>" + feature.properties.name + "</h2> <hr> Hourly Wage: " + feature.properties.density);
};

// Creating industry-specific layers
let constructionLayer = L.geoJson(ConstructionData, {style: style, onEachFeature: onEachFeature}).addTo(myMap);
let financeLayer = L.geoJson(FinanceData, {style: style, onEachFeature: onEachFeature}).addTo(myMap);
let informationLayer = L.geoJson(InformationData, {style: style, onEachFeature: onEachFeature}).addTo(myMap);
let leisureLayer = L.geoJson(LeisureData, {style: style, onEachFeature: onEachFeature}).addTo(myMap);
let manufacturingLayer = L.geoJson(ManufacturingData, {style: style, onEachFeature: onEachFeature}).addTo(myMap);
let miningLayer = L.geoJson(MiningData, {style: style, onEachFeature: onEachFeature}).addTo(myMap);
let otherLayer = L.geoJson(OtherData, {style: style, onEachFeature: onEachFeature}).addTo(myMap);
let professionalLayer = L.geoJson(ProfessionalData, {style: style, onEachFeature: onEachFeature}).addTo(myMap);
let tradeLayer = L.geoJson(TradeData, {style: style, onEachFeature: onEachFeature}).addTo(myMap);

// Set basemaps
let baseMaps = {
  "Light Map": lightmap,
  "Outdoors": outdoormap
};    

// set overlaymaps
var overlayMaps =  {
  "Industries - 2017": {
    "Construction": constructionLayer,
    "Finance": financeLayer,
    "Information": informationLayer,
    "Leisure": leisureLayer,
    "Manufacturing": manufacturingLayer,
    "Mining": miningLayer,
    "Professional": professionalLayer,
    "Trade": tradeLayer,
    "Other": otherLayer
  }
};

// Set industries as exclusive, like basemaps
var options = {
  // Make the "Landmarks" group exclusive (use radio inputs)
  exclusiveGroups: ["Industries - 2017"],
  // Show a checkbox next to non-exclusive group labels for toggling all
  groupCheckboxes: true
};

// Add layer control to map
var layerControl = L.control.groupedLayers(baseMaps, overlayMaps, options);
myMap.addControl(layerControl);   

// Initialize legend
let legend = L.control({position: 'bottomleft'});

// Create legend breakdown
legend.onAdd = function (map) {
  let div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 5, 10, 15, 20, 25, 30, 35],
    labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (let i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
      '$' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  };
  
  return div;
};


// Add legend to map
legend.addTo(myMap);