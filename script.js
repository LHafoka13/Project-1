//Variable Declarations stored in global memory
var submitBtn = document.getElementById("submit-btn");
var plantInputEl = document.getElementById("plant-input");
var plantImgEl = document.getElementById("plant-img");
var randomEl = document.getElementById("random-div");

var plantInput;
var plantapiURL;
var playlist;

var equals = window.location.href.indexOf("=");
var amp = window.location.href.indexOf("&");
var token = "Bearer " + window.location.href.substring(equals + 1, amp);

fetch("https://api.spotify.com/v1/playlists/0Gzi5T0PokYRwdGkGctFkU/tracks", {
  headers: {
    Authorization: token,
  },
})
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    playlist = result.items;
  });

console.log(window.location.href);

//function to run code block of searched plant
function submitPlant(event) {
  event.preventDefault();
  console.log("click");
  plantInput = plantInputEl.value.trim();
  plantapiURL = `https://trefle.io/api/v1/plants/search?q=${plantInput}&token=8NGOesjjgvLLOXm-MiJ-xN9-T8lWrQ-QMYNUBntLR2g`;
  console.log(plantapiURL);
  if (plantInput) {
    getplantInput(plantInput);
    generateRandomSong();
  }
}

function generateRandomSong() {
  var randomNum = Math.floor(Math.random() * 100);
  var spotifyLink = playlist[randomNum].track.uri;

  var player = document.createElement("iframe");
  player.setAttribute("id", "playSong");
  player.setAttribute("allow", "encrypted-media");

  spotifyLink =
    "https://open.spotify.com/embed/track/" +
    spotifyLink.substring(spotifyLink.indexOf(":") + 1);
  player.setAttribute("src", spotifyLink);
  var test = document.getElementById("show-yourself");
  console.log(test);
  var songDivEl = document.createElement("div");
  console.log(player);
  songDivEl.append(player);
  test.append(songDivEl);
}

var getplantInput = function () {
  fetch(plantapiURL).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);

        // plantImgEl.innerHTML = data.data[0].img_url;
        randomEl.textContent = data.data[0].family;

        var planticon = data.data[0].image_url;
        console.log(planticon);

        plantImgEl.setAttribute("src", planticon);
      });
    }
  });
};

//event handler to submit requests by button click
submitBtn.addEventListener("click", submitPlant);
