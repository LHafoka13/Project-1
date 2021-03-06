//Variable Declarations stored in global memory
var submitBtn = document.getElementById("submit-btn");
var plantInputEl = document.getElementById("plant-input");
var plantImgEl = document.getElementById("plant-img");
var randomEl = document.getElementById("plant-fam");
var plantdescEL = document.getElementById("plant-desc");
var cardEl = document.getElementById("card-area");
var plantSearchEl = document.getElementById("searchHist");

var plantInput;
var plantapiURL;
var playlist;

var searchHistoryArray = [];
var searchHistory = [];
if (localStorage.getItem("searchHistory")) {
  searchHistory = localStorage.getItem("searchHistory");

  searchHistoryArray = searchHistory.split(",");

        for (var i = 0; i < searchHistoryArray.length; i++) {
         
          var plantSearchHist = document.getElementById("saved-searches");
          console.log(plantSearchHist);
          var plantSearchHistListItem = document.createElement("li");
          plantSearchHistListItem.classList = "collection-item";

          console.log(plantSearchHistListItem);
          plantSearchHistListItem.innerHTML = searchHistoryArray[i];
 
          plantSearchHist.append(plantSearchHistListItem);


        }


}

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

var player = document.createElement("iframe");
  player.setAttribute("id", "playSong");
  player.setAttribute("allow", "encrypted-media");

function generateRandomSong() {
  var randomNum = Math.floor(Math.random() * 100);
  var spotifyLink = playlist[randomNum].track.uri;


  spotifyLink = spotifyLink.substring(spotifyLink.indexOf(":") + 1);

  spotifyLink =
    "https://open.spotify.com/embed/track/" +
    spotifyLink.substring(spotifyLink.indexOf(":") + 1);

  console.log(spotifyLink);
  player.setAttribute("src", spotifyLink);

  var test = document.getElementById("show-yourself");
  console.log(test);
  var songDivEl = document.createElement("div");
  console.log(player);
  songDivEl.append(player);
  test.append(songDivEl);
}

var getplantInput = function (plantInput) {
  fetch(plantapiURL).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        cardEl.classList.remove("hide");

        //defining the html content for the plant family name and plant common name

        randomEl.textContent = data.data[0].family;
        plantdescEL.textContent = data.data[0].common_name;

        var planticon = data.data[0].image_url;
        console.log(planticon);

        plantImgEl.setAttribute("src", planticon);
        
        // setting what the user searches to local storage
        console.log(searchHistoryArray);
        searchHistoryArray.push(plantInput);
        localStorage.setItem("searchHistory", searchHistoryArray);
        searchHistory = localStorage.getItem("searchHistory");
        var historyDiv = $("#saved-searches")
        historyDiv.empty();
       
        for (var i = 0; i < searchHistoryArray.length; i++) {
      

          var plantSearchHist = document.getElementById("saved-searches");
          console.log(plantSearchHist);
          var plantSearchHistListItem = document.createElement("li");
          plantSearchHistListItem.classList = "collection-item";

          console.log(plantSearchHistListItem);
          plantSearchHistListItem.innerHTML = searchHistoryArray[i];
       
          plantSearchHist.append(plantSearchHistListItem);


        }
        console.log(searchHistoryArray);

      });
    }
  });
};

//event handler to submit requests by button click
submitBtn.addEventListener("click", submitPlant);
