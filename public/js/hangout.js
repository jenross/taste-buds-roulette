let resultsArr = [];
let randomPick;

const randomize = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });

var input = document.getElementById('enterLocation');
var autocomplete = new google.maps.places.Autocomplete(input);
autocomplete.bindTo('bounds', map);
autocomplete.setFields(
    ['address_components', 'geometry', 'icon', 'name']);

var infowindow = new google.maps.InfoWindow();
var infowindowContent = document.getElementById('infowindow-content');
infowindow.setContent(infowindowContent);

var marker = new google.maps.Marker({
  map: map,
  anchorPoint: new google.maps.Point(0, -29)
});

autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    $(".create-hangout").on("click", function(event) {
        event.preventDefault();
        console.log("working");
        const APIKEY = "AIzaSyDWLRgKxz3nTinzcUXCyjM1DNpe9e4_g2w";
        let lat = place.geometry.location.lat();
        console.log(lat);
        let lng = place.geometry.location.lng();
        console.log(lng);
        let initialQueryURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${APIKEY}&location=${lat},${lng}&radius=1000&type=restaurant`;
        $.ajax({
            url: initialQueryURL,
            method: "GET"
        }).then(function(response) {
            // for (let i = 0; i < response.results.length; i++) {
            //     let place_id = response.results[i].place_id;
            //     resultsArr.push(place_id);
            //     randomPick = resultsArr[randomize(0, resultsArr.length - 1)];
            // }
            randomPick = response.results[randomize(0, response.results.length - 1)].place_id;
            console.log(randomPick);
            let pickedQueryURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${APIKEY}&place_id=${randomPick}`;
            $.ajax({
                url: pickedQueryURL,
                method: "GET"
            }).then(function(response) {
                let pickName = response.result.name;
                console.log(pickName);
                map.setCenter(response.result.geometry.location);
                map.setZoom(17);  // Why 17? Because it looks good.
                // }
                marker.setPosition(response.result.geometry.location);
                marker.setVisible(true);

                var address = response.result.formatted_address;
                

                infowindowContent.children['place-icon'].src = response.result.icon;
                infowindowContent.children['place-name'].textContent = response.result.name;
                infowindowContent.children['place-address'].textContent = address;
                infowindow.open(map, marker);
                });
            });
        });
    });
}


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
      <div>
          ${data.name}
      </div>
      `
      $("#nametag").append(newTr);

      // Appends User's Buds to page
      for (i=0; i < data.Buds.length; i++) {

        let budsDiv = `
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body d-inline show-bud">
                <p class="d-inline mr-1">${data.Buds[i].name}:</p>
                <p class="d-inline">${data.Buds[i].email}</p>
                <button type="submit" class="btn btn-primary mb-2 d-inline" data-id="${data.Buds[i].id}" id="deleteBud">Delete</button>
              </div>
            </div>
          </div>
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

