let resultsArr = [];
let randomPick;

let googleName;
let googleLocation;

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
            for (let i = 0; i < response.results.length; i++) {
                let place_id = response.results[i].place_id;
                resultsArr.push(place_id);
                randomPick = resultsArr[randomize(0, resultsArr.length - 1)];
            }
            // randomPick = response.results[randomize(0, response.results.length - 1)].place_id;
            console.log(randomPick);
            let pickedQueryURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?key=${APIKEY}&place_id=${randomPick}`;
            $.ajax({
                url: pickedQueryURL,
                method: "GET"
            }).then(function(response) {
                let pickName = response.result.name;

                // Setting Variables for Module
                googleName = pickName;
                googleLocation = response.result.formatted_address;
                console.log(googleLocation)

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

  //MIMIC CREATE HANGOUT TEST
  $("#planIt").on("click", function(event) {
    event.preventDefault();

    
    let dateTime = $("#dateTime").val().trim();

    console.log(dateTime)

    if (dateTime !== undefined && googleLocation !== undefined && googleName !== undefined) {
      budFinder(userId)
    }
    else {
      if (dateTime === undefined && googleLocation === undefined && googleName === undefined) {
        alert("Please fill spin the Dining Roullete Wheel and enter a time!")
      }
      else if (dateTime === undefined) {
        alert("Please fill out a date and time!")
      }
      else {
        alert("Please fill out location and spin Roullete Wheel!")
      };
    };
    
  });
  
});

// let locationName = $("#locName").val().trim();
// let locationAdddress = $("#locAdd").val().trim(); 
// let hangoutDateTime = $("#date").val().trim(); 

const getUserInfo = (userId) => {
  queryUrl = "/api/user/" + userId;
  $.get(queryUrl, function(data) {

    console.log(data)

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
          <div class="col-sm-12 p-0">
            <div class="card">
              <div class="card-body d-inline show-bud">
                <p class="d-inline mr-1 bud-name">${data.Buds[i].name}</p>
                <br>
                <p class="d-inline"><a class="buds-email" href="mailto: ${data.Buds[i].email}?Subject=Let's%20hangout!">${data.Buds[i].email}</a></p>
                <button type="submit" class="btn btn-link mb-2 d-inline" data-id="${data.Buds[i].id}" id="deleteBud">
                <img class="trash" src="img/trashcan.png" alt="Delete">
                </button>
                <input type="checkbox" class="checkbox" name="check" value="${data.Buds[i].id}">
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

$( ".create-hangout" ).mouseenter(function() {
  $( ".spin" ).hide();
});

$( ".create-hangout" ).mouseleave(function() {
  $( ".spin" ).show();
});




//Handles the buds selected when creating a hangout
const budFinder = (userId) => {

  // Clear Fields
  $("#locName").empty();
  $("#locAdd").empty();
  $("#date").empty();
  $("#module-lister").empty();
  

  queryUrl = "/api/user/" + userId;
  $.get(queryUrl, function(data) {

  let ids = [];

    $('input[type="checkbox"]:checked').each(function() {

      ids.push($(this).val());
    });
    
  //loop through Database Buds
  for (let i=0; i < data.Buds.length; i++) {
    let budId = data.Buds[i];

    //loop through checked buds
    for (let o=0; o < ids.length; o++) {

      //If Match: display
      if (budId.id === ids[o]) {
        console.log(budId.name);

        // Appends friends to Plan Module
        let list = `
        <li class="list-group-item text-right">
        ${budId.name}<br>
        <a class="buds-email" href="mailto: ${data.Buds[i].email}?Subject=Let's%20hangout!">${data.Buds[i].email}</a>
        </li>
        `

        $("#module-lister").append(list);
      };
    };
  };

});

$("#locName").append(googleName);
$("#locAdd").append(googleLocation);

let planTime = $("#dateTime").val().trim();
$("#date").append(planTime);

$("#resultsModal").modal('toggle');
};




