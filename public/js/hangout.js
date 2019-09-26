let locationInput = document.getElementById('enterLocation');

let map;
let service;
let infowindow;

      function initMap() {
        let orlando = new google.maps.LatLng(28.5383, 81.3792);

        infowindow = new google.maps.InfoWindow();

        map = new google.maps.Map(
            document.getElementById('map'), {center: orlando, zoom: 15});

        var request = {
          query: 'Kres Chophouse',
          fields: ['name', 'geometry'],
        };

        service = new google.maps.places.PlacesService(map);

        service.findPlaceFromQuery(request, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
            map.setCenter(results[0].geometry.location);
        }
      });
    }

    function createMarker(place) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }