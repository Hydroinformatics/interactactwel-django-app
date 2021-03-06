// 1. Create a map object.

//var mymap = L.map('mapid').setView([51.505, -0.09], 13);

var mymap = L.map('map', {
    center: [45.6735777, -118.8455003],
    zoom: 10,
    maxZoom: 17,
    minZoom: 3,
    detectRetina: true // detect whether the sceen is high resolution or not.
});

// 2. Add a base map.
// var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
//     maxZoom: 16
// }).addTo(mymap);
// var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//     maxZoom: 16
// }).addTo(mymap);

var Esri_WorldGrayCanvas = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 18,
    ext: 'png'
}).addTo(mymap);

/*var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);*/

////////////////////////////////////////////////////////////////////////////
// 3.1 Add wind turbine GeoJSON Data
/*
  var wt = null;
  // Get GeoJSON and put on it on the map when it loads
  wt = L.geoJson.ajax("assets/wt.geojson",{
      onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.CNTL_TWR);
      },
      pointToLayer: function (feature, latlng) {
          var id = 0;
          if (feature.properties.CNTL_TWR == "Y") { id = 0; }
          else { id = 1;}
          return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-bolt marker-color-' + (id + 1).toString() })});
      },
      attribution: 'Base Map &copy; CartoDB | Majid Farahani & Hoda Tahami'
  });
  // Add wind turbine  to the map.
  wt.addTo(mymap);*/
/////////
////////
///////

////////////////////////////////////////////////////////////////////////////
// 3.2 Add DataCenter GeoJSON Data
// 4. build up a set of colors from colorbrewer's "set2" category
var colors = chroma.scale('RdGy').mode('lch').colors(2);

// 5. dynamically append style classes to this page using a JavaScript for loop. These style classes will be used for colorizing the markers.
for (i = 0; i < 5; i++) {
    $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 20px; text-shadow: 0 0 3px #ffffff;} </style>"));
}
var DataCenter = null;
// Get GeoJSON and put on it on the map when it loads
DataCenter = L.geoJson.ajax("/static/assets/DataCenter.geojson", {
    onEachFeature: function (feature, layer) {

        layer.on('click', function (e) {
            console.log(e);
            $('#DataCenters').show();
            $('#FarmerswSWGW1').hide();
            $('#EnergyCooperative1').hide();
            $('#FoodProcessors1').hide();
            // $("#panel2").show();
            $("#DataCenters1").show();
        });
    },
    pointToLayer: function (feature, latlng) {


        var id = 0;
        if (feature.properties.Id == "0") {
            id = 0;
        }
        else {
            id = 1;
        }
        return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-database  marker-color-' + (id + 1).toString()})}).bindPopup("<b>More Information</b><br>on this actor.").openPopup();
    },


});
// Add DataCenter  to the map.
$('#data-center').change(function () {
    if (this.checked)
        DataCenter.addTo(mymap);
    else
        DataCenter.remove();
});

///////////////////////////////////////////////////////////////////////

// 3.3 Add FoodProcessor GeoJSON Data

var FoodProcessor = null;
// Get GeoJSON and put on it on the map when it loads
FoodProcessor = L.geoJson.ajax("/static/assets/FoodProcessor.geojson", {
    onEachFeature: function (feature, layer) {
        // layer.bindPopup(feature.properties.CNTL_TWR);
        layer.on('click', function (e) {
            console.log(e);
            $('#FoodProcessors').show();
            $('#FarmerswSWGW1').hide();
            $('#EnergyCooperative1').hide();
            $('#DataCenters1').hide();
            // $("#panel2").show();
            $("#FoodProcessors1").show();
        });
    },
    pointToLayer: function (feature, latlng) {
        var id = 0;
        if (feature.properties.CNTL_TWR == "Y") {
            id = 0;
        }

        else {
            id = 2;
        }
        return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-utensils marker-color-' + (id + 1).toString()})}).bindPopup("<b>More Information</b><br>on this actor.").openPopup();
    },


});
// Add FoodProcessor  to the map.
$('#food-processor').change(function () {
    if (this.checked)
        FoodProcessor.addTo(mymap);
    else
        FoodProcessor.remove();
});

///////////////////////////////////////////////////////////////////////

// 3.4 Add Energy GeoJSON Data

var Energy = null;
// Get GeoJSON and put on it on the map when it loads
Energy = L.geoJson.ajax("static/assets/Energy.geojson", {
    onEachFeature: function (feature, layer) {
        // layer.bindPopup(feature.properties.CNTL_TWR);
        layer.on('click', function (e) {
            console.log(e);
            $('#EnergyCooperative').show();
            $('#FarmerswSWGW1').hide();
            $('#FoodProcessors1').hide();
            $('#DataCenters1').hide();
            // $("#panel2").show();
            $("#EnergyCooperative1").show();
        });
    },
    pointToLayer: function (feature, latlng) {
        var id = 0;
        if (feature.properties.CNTL_TWR == "Y") {
            id = 0;
        }

        else {
            id = 3;
        }
        return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-bolt marker-color-' + (id + 1).toString()})}).bindPopup("<b>More Information</b><br>on this actor.").openPopup();
    },
    attribution: 'Base Map &copy; CartoDB | Majid Farahani & Hoda Tahami'

});
// Add Energy  to the map.
$('#energy-provider').change(function () {
    if (this.checked)
        Energy.addTo(mymap);
    else
        Energy.remove();
});

//////////////////////////////////////////////////////////////////////////////
// 3.4 Add Farm GeoJSON Data

var Farm = null;
// Get GeoJSON and put on it on the map when it loads

Farm = L.geoJson.ajax("/static/assets/basin.geojson", {


    onEachFeature: function (feature, layer) {


        layer.on('click', function (e) {
            console.log(e);
            $('#FarmerswSWGW').show();
            $('#EnergyCooperative1').hide();
            $('#FoodProcessors1').hide();
            $('#DataCenters1').hide();
            // $("#panel2").show();
            $("#FarmerswSWGW1").show();
        });
    },
    pointToLayer: function (feature, latlng) {
        var id = 0;
        if (feature.properties.CNTL_TWR == "Y") {
            id = 0;
        }

        else {
            id = 4;
        }
        return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-bolt marker-color-' + (id + 1).toString()})}).bindPopup("<b>More Information</b><br>on this actor.").openPopup();
    },
    attribution: 'Base Map &copy; CartoDB | Majid Farahani & Hoda Tahami'

});
// Add Energy  to the map.
Farm.addTo(mymap);


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//  build up a set of colors from colorbrewer's "set2" category
var col = chroma.scale(['#b30000', '#08519c']).mode('lch').colors(2);

// dynamically append style classes to this page. This style classes will be used for colorize the markers.
for (i = 0; i < 2; i++) {
    $('head').append($("<style> .marker-color2-" + (i + 1).toString() + " { color: " + col[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}


/*
// 3.2 Add airports GeoJSON Data
  // Null variable that will hold airports data
  var airports = null;
  // 4. build up a set of colors from colorbrewer's "set2" category
  var colors = chroma.scale('Set2').mode('lch').colors(2);
  // 5. dynamically append style classes to this page using a JavaScript for loop. These style classes will be used for colorizing the markers.
  for (i = 0; i < 2; i++) {
      $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
  }
  // Get GeoJSON and put on it on the map when it loads
  airports= L.geoJson.ajax("assets/airports.geojson",{
// assign a function to the onEachFeature parameter of the airports object.
// Then each (point) feature will bind a popup window.
// The content of the popup window is the value of `feature.properties.company`
      onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.CNTL_TWR);
      },
      pointToLayer: function (feature, latlng) {
          var id = 0;
          if (feature.properties.CNTL_TWR == "Y") { id = 0; }
          else { id = 1;}
          return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-plane marker-color-' + (id + 1).toString() })});
      },
      attribution: 'Base Map &copy; CartoDB | Majid Farahani & Hoda Tahami'
  });
  // Add the airports to the map.
  airports.addTo(mymap);
*/


// 6. Set function for color ramp
colors = chroma.scale('set1').colors(13);

function setColor(density) {
    var id = 0;
    if (density == 13) {
        id = 12;
    }
    else if (density == 12) {
        id = 11;
    }
    else if (density == 11) {
        id = 10;
    }
    else if (density == 10) {
        id = 9;
    }
    else if (density == 9) {
        id = 8;
    }
    else if (density == 8) {
        id = 7;
    }
    else if (density == 7) {
        id = 6;
    }
    else if (density == 6) {
        id = 5;
    }
    else if (density == 5) {
        id = 4;
    }
    else if (density == 4) {
        id = 3;
    }
    else if (density == 3) {
        id = 2;
    }
    else if (density == 2) {
        id = 1;
    }
    else {
        id = 0;
    }
    return colors[id];
}

// 7. Set style function that sets fill color.md property equal to cell tower density
function style(feature) {
    return {
        fillColor: setColor(feature.properties.Subbasin),
        fillOpacity: 0.4,
        weight: 2,
        opacity: 1,
        color: '#b4b4b4',
        dashArray: '4'
    };
}

// 8. Add basin polygons
// L.geoJson.ajax("assets/basin.geojson", {
//     style: style
// }).addTo(mymap);


// 12. Add a scale bar to map
L.control.scale({position: 'bottomleft'}).addTo(mymap);



//add an miniglobe
new L.Control.GlobeMiniMap({
    marker: 'red',
    position: 'bottomright'
}).addTo(mymap);

// Create Leaflet Control Object for Legend
var legend = L.control({position: 'bottomright'});
// Function that runs when legend is added to map
legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'ui card legend');

    div.innerHTML += '<div class="content"><i class="fa fa fa-database"></i> Data Center</div>';
    div.innerHTML += '<div class="content"><i class="fa fa-utensils"></i> Food Processor</div>';
    div.innerHTML += '<div class="content"><i class="fa fa-bolt"></i> Energy</div>';
    // Return the Legend div containing the HTML content
    return div;
};

// Add a legend to map
legend.addTo(mymap);
