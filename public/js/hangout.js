let locationInput = document.getElementById('enterLocation');
let googleLogo = document.getElementById('google-logo');

let locationResult;
let searchResults;
var map; 

// Google Maps Initializer
function initMap() {
    console.log("working");
    // let location = venue0;
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
          zoom: 15
      });
    // searchResults.forEach(function(e, i) {
    //   makeMarker(locationResult[i]);
    // })
}

// initMap();

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

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Added Code from Dylan

$(document).ready(function() {

  const url = window.location.search;

  // grabs the user ID passed through the url
  let userId = url.split("=")[1];

  getUserInfo(userId);

  $(document).on("submit", "#newBud", function() {
    event.preventDefault();

    const budName = $("#newBudName").val().trim();
    const budEmail = $("#newBudEmail").val().trim();
    const queryUrl = "/api/bud/" + userId;

    const postBud = (budData) =>{
      $.post(queryUrl, budData)
      .then(refreshBuds)
    };

    postBud({
      name: budName,
      email: budEmail
    });
  });

  
});

const getUserInfo = (userId) => {
  queryUrl = "/api/user/" + userId;
  $.get(queryUrl, function(data) {

      // Display User Name
      let newTr = `
      <h1>
          ${data.name}
      </h1>
      `
      $("#nametag").append(newTr);

      // Appends User's Buds to page
      for (i=0; i < data.Buds.length; i++) {

        let budsDiv = `
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <div class="card-title">${data.Buds[i].name}</div>
                <div class="card-text">${data.Buds[i].email}</div>
              </div>
              <div class="card-body pt-0">
                <button data-id="${data.Buds[i].id}" id="deleteBud">DELETE</button>
              </div>
            </div>
          </div>
          <div class="col-md-8"></div>
          `
          $("#budsRow").append(budsDiv);

      };

      
  });
};

// Grabs ID of Bud
$("#budsRow").on("click", 'button', function() {
  let id = $(this).attr("data-id");

  $.ajax({
    method: "DELETE",
    url: "/api/bud/" + id
  })
  .then(function() {
    refreshBuds();
  })
});


const refreshBuds = () => {
  // Currently refreshed page... Will be upgraded with simple friend refresh
  window.location.reload();
};

