var submitBtn = document.getElementById("submit-btn");
var plantInputEl = document.getElementById("plant-input");

plantapiURL = "http://www.quantitative-plant.org/api?type=TYPE&field=FIELD&q=Q";
console.log(plantapiURL);

function submitPlant(event) {
  event.preventDefault();
  console.log("click");

  var plantInput = plantInputEl.value.trim();

  if (plantInput) {
    getplantInput(plantInput);
  }
}

var getplantInput = function () {
  plantapiURL =
    "http://www.quantitative-plant.org/api?type=TYPE&field=FIELD&q=Q";
  console.log(plantapiURL);

  fetch(plantapiURL).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
      });
    }
  });
};

submitBtn.addEventListener("click", submitPlant);
