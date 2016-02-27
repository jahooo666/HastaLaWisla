document.addEventListener('DOMContentLoaded', function () {
    initMap();
});

var map;
var service;
var infoWindow;
var riverCenter = [
    {lat: 52.260964, lng: 21.010678},
    {lat: 52.249313, lng: 21.021554},
    {lat: 52.254627, lng: 21.016011},
    {lat: 52.245088, lng: 21.027933},
    {lat: 52.241630, lng: 21.033057},
    {lat: 52.238236, lng: 21.037763},
    {lat: 52.235610, lng: 21.040168},
    {lat: 52.230166, lng: 21.045292},
    {lat: 52.225298, lng: 21.049998},
    {lat: 52.218891, lng: 21.067567},
    {lat: 52.214791, lng: 21.092143}
];

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.243656, lng: 21.030119},
        zoom: 16,
        styles: [{
            stylers: [{visibility: 'simplified'}]
        }, {
            elementType: 'labels',
            stylers: [{visibility: 'off'}]
        }],
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    service = new google.maps.places.PlacesService(map);
    infoWindow = new google.maps.InfoWindow();

    map.addListener('idle', performSearch);
}

var rad = function (x) {
    return x * Math.PI / 180;
};

var getDistance = function (p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat() - p1.lat);
    var dLong = rad(p2.lng() - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat())) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // returns the distance in meter
};

function performSearch() {
    var request = {
        bounds: map.getBounds(),
        type: 'bar',
        openNow: true

    };
    service.radarSearch(request, callback);
}

function callback(results, status) {
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
    }

    for (var i = 0, result; result = results[i]; i++) {
        con = true;
        for (loc in riverCenter) {
            if (con == false) {
                con = true;
                break;
            }
            if ((getDistance(riverCenter[loc], result.geometry.location) < 1000)) {
                addMarker(result);
                con = false;
            }
        }
    }
}

function addMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: {
            url: 'http://yorkshirehogroast.com/wp-content/uploads/2014/05/Catering-Bar-icon.png',
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(10, 17)
        }
    });

    google.maps.event.addListener(marker, 'click', function () {
        service.getDetails(place, function (result, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                console.error(status);
                return;
            }
            infoWindow.setContent(result.name);
            infoWindow.open(map, marker);
        });
    });
}










