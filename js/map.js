"use-strict";

(function() {
    var SEDONA_COORDINATES = {
        lat: 34.917941,
        lng: -111.758749
    };

    var markerData = {
        markerImg: "../img/icon-map-marker.svg",
        markerCoordinates: {
            lat: 34.817941,
            lng: -111.758749
        }
    };

    var zoom = 7;

    var indexMap = document.querySelector(".map__container");
    var indexMapMarker = indexMap.querySelector(".map__marker");

    indexMapMarker.style.display = "none";

    function initMap() {
        var map = new google.maps.Map(indexMap, {
            center: SEDONA_COORDINATES,
            zoom: zoom,
            disableDefaultUI: true,
            scrollwheel: true
        });

        new google.maps.Marker({
            position: markerData.markerCoordinates,
            map: map,
            icon: markerData.markerImg
        });
    }

    window.map = initMap;
})();
