var $ = jQuery.noConflict();

var imgPath = '/modules/olm/img/';

var map = new ol.Map({
  target: 'olm-map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([12.4846, 41.8977]),
    zoom: 9
  })
});
map.on('click', function(e) {
  var f = map.forEachFeatureAtPixel(e.pixel, function(feature) { return feature; });
  if (f) {
    alert(f.get("name"));
  }
});
map.on('pointermove', function(e) {
  var f = map.forEachFeatureAtPixel(e.pixel, function(feature) { return feature; });
  if (f) {
    $('#lbl-out').text(f.get("name"));
  }
  else {
    $('#lbl-out').text('');
  }
});

var vectorMarkers;
var vectorPolygon;

$("#lnk-c").click(function() {
  removeMarkes();
  removePolygon();
});
$("#lnk-m").click(function() {
  removeMarkes();
  addMarkers();
});
$("#lnk-p").click(function() {
  removePolygon();
  addPolygon();
});

function removeMarkes() {
  if(vectorMarkers) {
    map.removeLayer(vectorMarkers);
  }
  vectorMarkers = null;
}

function removePolygon() {
  if(vectorPolygon) {
    map.removeLayer(vectorPolygon);
  }
  vectorPolygon = null;
}

function addMarkers() {
  var mf0 = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([12.2497, 41.7981])),
    name: 'Fiumicino Airport',
  });
  var mf1 = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([12.5945, 41.7978])),
    name: 'Ciampino Airport',
  });
  mf0.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: imgPath + 'marker-blue.png',
      scale: 0.6,
    })
  }));
  mf1.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: imgPath + 'marker-red.png',
      scale: 0.6,
    })
  }));
  vectorMarkers = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [ mf0, mf1 ]
    })
  });
  map.addLayer(vectorMarkers);
}

function addPolygon() {
  var c = [[[[12.6116,41.9209],[12.7406,41.9267],[12.8047,41.8230],[12.5990,41.8531]]]];
  for(var a0 of c) {
    for(var a1 of a0) {
      for(var a2 of a1) {
        var ll = ol.proj.fromLonLat(a2);
        a2[0] = ll[0];
        a2[1] = ll[1];
      }
    }
  }
  var pf = new ol.Feature({
    geometry: new ol.geom.MultiPolygon(c),
    name: 'Test Polygon',
  });
  pf.setStyle(new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#000000',
      width: 1,
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255,0,0,0.4)',
    }),
  }));
  vectorPolygon = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [ pf ]
    })
  });
  map.addLayer(vectorPolygon);
}