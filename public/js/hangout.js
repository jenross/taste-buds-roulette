let locationInput = document.getElementById('enterLocation');
let googleLogo = document.getElementById('google-logo');

let locationResult;
let searchResults;
let map; 

// Google Maps Initializer
function initMap() {
    console.log("working");
    // let location = venue0;
    // map = new google.maps.Map(document.getElementById('map'), {
    //   center: {lat: -28.5383, lng: 81.3792},
    //   zoom: 15
    // });
    // searchResults.forEach(function(e, i) {
    //   makeMarker(locationResult[i]);
    // })
}

initMap();

// gMaps Marker Creation
function makeMarker(locationResult) {
    var marker = new google.maps.Marker({position: searchResults.coords, map: map});
    let infoWindow = new google.maps.InfoWindow({
      content:searchResults.content
    });
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    })
}

// let map;
// let service;
// let infowindow;

// function initMap() {
//     let sydney = new google.maps.LatLng(-33.867, 151.195);

//     infowindow = new google.maps.InfoWindow();

//     map = new google.maps.Map(
//         document.getElementById('map'), {center: sydney, zoom: 15});

//     let request = {
//         query: 'Museum of Contemporary Art Australia',
//         fields: ['name', 'geometry'],
//     };

//     service = new google.maps.places.PlacesService(map);

//     service.findPlaceFromQuery(request, function(results, status) {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//             createMarker(results[i]);
//         }
//         map.setCenter(results[0].geometry.location);
//     }
//     });
// }

// function createMarker(place) {
//     var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location
//     });

//     google.maps.event.addListener(marker, 'click', function() {
//     infowindow.setContent(place.name);
//     infowindow.open(map, this);
//     });
// }