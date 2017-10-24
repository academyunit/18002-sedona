"use-strict";

(function() {
    var SEDONA_COORDINATES = {
        lat: 34.917941,
        lng: -111.758749
    };

    var mapIconExtension = 'svg';
    if (isMisterIE()) {
        mapIconExtension = 'png';
    }

    var markerData = {
        markerImg: "../img/icon-map-marker." + mapIconExtension,
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
            optimized: false,
            icon: markerData.markerImg
        });
    }

    function isMisterIE() {
        var ua = window.navigator.userAgent;

        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

        // Edge 12 (Spartan)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

        // Edge 13
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

        return (
            (ua.indexOf('MSIE ') > 0)
            || (ua.indexOf('Trident/') > 0)
            || (ua.indexOf('Edge/') > 0)
        );
    }

    window.map = initMap;
})();
