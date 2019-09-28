let locationInput = document.getElementById('enterLocation');
let googleLogo = document.getElementById('google-logo');

let locationResult;
let searchResults;


// Google Maps Initializer
function initMap(venue0, locationResult) {
    let location = venue0;
    map = new google.maps.Map(document.getElementById('map'), {
      center: locationResult,
      zoom: 15
    });
    searchResults.forEach(function(e, i) {
      makeMarker(locationResult[i]);
    })
}

// gMaps Marker Creation
function makeMarker(locationResult) {
    var marker = new google.maps.Marker({position: venues.coords, map: map});
    let infoWindow = new google.maps.InfoWindow({
      content:locationResult.content
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

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Added Code from Dylan

$(document).ready(function() {

  const url = window.location.search;

  // grabs the user ID passed through the url
  let userId = url.split("=")[1];

  getUserInfo(userId);

  $(document).on("submit", "#newBud", newBudAdder(userId));
});

const getUserInfo = (userId) => {
  queryUrl = "/api/user/" + userId;
  $.get(queryUrl, function(data) {
      console.log(data);

      // Template markup to home page
      let newTr = `
      <h1>
          ${data.name}
      </h1>
      `

      budReplace(data);

      // !!!!!! To be replaced with actual front-end !!!!!!!!!!!!!!!!!
      $("#nametag").append(newTr);
  })
}

const budReplace = (data) => {
  // for (let i = 1; i < 6; i++) {
  //   let bud = data.bud + i;
  //   console.log(bud)
  // }
}

const newBudAdder = (userId) => {
  queryUrl = "/api/user";
  $.get(queryUrl, function(data) {
      console.log(data);

      let budName = $("#newBudName").val().trim();
      let budEmail = $("#newBudEmail").val().trim();

      for (let i=0; i < data.length; i++) {
        console.log(data[i])
      }      

      // Bud.update();
  })
}