// for (var i = 0; i < response.length; i++) {
// var obj = {
//     lat: -40,
//     long: 40,
// };
// mapArr.push(obj);

var observations;

(function($) {
    $.ajax({
            dataType: 'json',
            url: 'http://localhost:8000/observations',
            method: 'GET',
            cache: false,
        })
        .done(function(data) {
            observations = data;
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("jxXHR : ", jqXHR, " - status : ", textStatus, " - error : ", errorThrown);
        });
})(jQuery); // end of jQuery name space

require([
    "esri/Color",
    "esri/geometry/Point",
    "esri/geometry/webMercatorUtils",
    "esri/graphic",
    "esri/layers/FeatureLayer",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/map",
    "esri/dijit/Search",
    "esri/InfoTemplate",
    "esri/renderers/SimpleRenderer",
    "esri/renderers/TemporalRenderer",
    "esri/renderers/TimeClassBreaksAger",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/TimeExtent",
    "dojo/parser",
    "dojo/ready",
    "dojo/_base/array",
    "dojo/dom-style",
    "dojo/query",
    "dojo/domReady!"
], function(Color, Point, webMercatorUtils, Graphic, FeatureLayer, ArcGISTiledMapServiceLayer, Map, Search, InfoTemplate, SimpleRenderer, TemporalRenderer,
    TimeClassBreaksAger, SimpleLineSymbol, SimpleMarkerSymbol, PictureMarkerSymbol, TimeExtent
) {

    // can be used to center map later
    var long = -98;
    var lat = 39;
    var observationArray = [];

    var pointArr = observations;

    // var pointArr = [{  created_at:"2016-12-10T22:51:41.010Z",
    //     description:"Ok, Devin kept shining a flashlight at me",
    //     id:2,
    //     latitude:"40.0150",
    //     longitude:"-99.2705",
    //     name:"Galvanize Balcony",
    //     stars:2,
    //     updated_at:"2016-12-10T22:51:41.010Z",
    //     user_id:2,
    //     Image: "<img src='http://davidzentz.com/blog/wp-content/uploads/2014/01/20131223-untitled-_DEZ6857-Edit1.jpg' style='height: 150px;'>"
    // }, {
    //     created_at:"2016-12-10T22:51:41.010Z",
    //     description:"Ok, Devin kept shining a flashlight at me",
    //     id:2,
    //     latitude:"38.0150",
    //     longitude:"-97.2705",
    //     name:"Galvanize Balcony",
    //     stars:2,
    //     updated_at:"2016-12-10T22:51:41.010Z",
    //     user_id:2,
    //     Image: "<img src='http://davidzentz.com/blog/wp-content/uploads/2014/01/20131223-untitled-_DEZ6857-Edit1.jpg' style='height: 150px;'>"
    // }, {
    //     created_at:"2016-12-10T22:51:41.010Z",
    //     description:"Ok, Devin kept shining a flashlight at me",
    //     id:2,
    //     latitude:"42.0150",
    //     longitude:"-96.2705",
    //     name:"Galvanize Balcony",
    //     stars:2,
    //     updated_at:"2016-12-10T22:51:41.010Z",
    //     user_id:2,
    //     Image: "<img src='http://davidzentz.com/blog/wp-content/uploads/2014/01/20131223-untitled-_DEZ6857-Edit1.jpg' style='height: 150px;'>"
    // }];

    var map = new Map("map", {
        center: [long, lat],
        zoom: 4
    });

    var search = new Search({
        map: map
    }, "search");
    search.startup();

    var grayBase = new ArcGISTiledMapServiceLayer("https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/");
    map.addLayer(grayBase);

    var tiled2 = new ArcGISTiledMapServiceLayer("https://tiles.arcgis.com/tiles/b3fMqPOmotX6SV4k/arcgis/rest/services/ArtificialSkyBrightness/MapServer/");
    map.addLayer(tiled2);

    var tiled1 = new ArcGISTiledMapServiceLayer("https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/");
    map.addLayer(tiled1);

    map.on("load", initFunc);
    map.on("load", formatData);

    function orientationChanged() {
        if (map) {
            map.reposition();
            map.resize();
        }
    }

    function initFunc(map) {
        if (navigator.geolocation) {
            console.log("observations", observations);
            navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
            watchId = navigator.geolocation.watchPosition(showLocation, locationError);
        } else {
            alertUser("Browser doesn't support Geolocation. Visit http://caniuse.com to see browser support for the Geolocation API.");
        }
    }

    function alertUser(message) {
      alert(message);
    }

    function locationError(error) {
        //error occurred so stop watchPosition
        if (navigator.geolocation) {
            navigator.geolocation.clearWatch(watchId);
        }
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alertUser("Location not provided");
                break;

            case error.POSITION_UNAVAILABLE:
                alertUser("Current location not available");
                break;

            case error.TIMEOUT:
                alertUser("Timeout");
                break;

            default:
                alertUser("unknown error");
                break;
        }
    }

    function zoomToLocation(location) {
        var pt = new Point(location.coords.longitude, location.coords.latitude);
        addGraphic(pt);
        map.centerAndZoom(pt, 5);
    }

    function showLocation(location) {
        //zoom to the users location and add a graphic
        var pt = new Point(location.coords.longitude, location.coords.latitude);
        if (!graphic) {
            addGraphic(pt);
        } else { // move the graphic if it already exists
            graphic.setGeometry(pt);
        }
        map.centerAt(pt);
    }

    function addGraphic(pt) {
        var symbol = new SimpleMarkerSymbol(
            SimpleMarkerSymbol.STYLE_CIRCLE,
            12,
            new SimpleLineSymbol(
                SimpleLineSymbol.STYLE_SOLID,
                new Color([255, 255, 255, 0.6]),
                8
            ),
            new Color([255, 255, 255, 0.9])
        );
        graphic = new Graphic(pt, symbol);
        map.graphics.add(graphic);
    }

    // Data Example
    // *************************************************************
    // created_at:"2016-12-10T22:51:41.010Z"
    // description:"Ok, Devin kept shining a flashlight at me"
    // id:2
    // latitude:"40.0150"
    // longitude:"105.2705"
    // name:"Galvanize Balcony"
    // stars:2
    // updated_at:"2016-12-10T22:51:41.010Z"
    // user_id:2
    function formatData() {
        for (var i = 0; i < pointArr.length; i++) {
            var lon = pointArr[i].longitude;
            var lat = pointArr[i].latitude;
            var point = new Point(lon, lat);

            // var obsMarker = new SimpleMarkerSymbol();
            // obsMarker.setSize(25);
            // obsMarker.setAngle(0);
            // obsMarker.setColor(new Color([255, 255, 255, 1]));
            // obsMarker.setPath(
            //     "M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z"
            // );
            // obsMarker.setStyle(SimpleMarkerSymbol.STYLE_PATH);

            var obsMarker = new SimpleMarkerSymbol(
                SimpleMarkerSymbol.STYLE_CIRCLE,
                12,
                new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new Color([255, 255, 255, 0.6]),
                    8
                ),
                new Color([255, 255, 255, 0.9])
            );

            var popUp = {
                Location: pointArr[i].name,
                Rating: pointArr[i].stars,
                Latitude: pointArr[i].latitude,
                Longitude: pointArr[i].longitude,
                Description: pointArr[i].description
                    // Image: pointArr[i].Image
            };

            var obsInfoTemplate = new InfoTemplate("Observation");
            var obsGraphic = new Graphic(point, obsMarker, popUp).setInfoTemplate(obsInfoTemplate);

            observationArray.push(obsGraphic);
        }

        addGraphics();
    }

    function addGraphics() {
        console.log("pins : " , observationArray.length);
        for (i = 0; i < observationArray.length; ++i) {
            map.graphics.add(observationArray[i]);
        }
    }
});

// function getObservations() {
//   $.ajax({
//              dataType: 'json',
//              url: 'http://localhost:8000/observations',
//              method: 'GET',
//              cache: false,
//          })
//              .done(function(data) {
//                var dataAsString = data;
//                console.log(data);
//
//              })
//              .fail(function(jqXHR, textStatus, errorThrown) {
//                console.log("jxXHR : ", jqXHR , " - status : " , textStatus , " - error : " , errorThrown);
//              });
// }
