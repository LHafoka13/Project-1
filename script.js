var submitBtn = document.getElementById("submit-btn");
var plantInputEl = document.getElementById("plant-input");
var plantInput;
var plantapiURL;

function submitPlant(event) {
  event.preventDefault();
  console.log("click");

  plantInput = plantInputEl.value.trim();

  plantapiURL = `https://trefle.io/api/v1/plants/search?q=${plantInput}&token=8NGOesjjgvLLOXm-MiJ-xN9-T8lWrQ-QMYNUBntLR2g`;
  console.log(plantapiURL);

  if (plantInput) {
    getplantInput(plantInput);
  }
}

var getplantInput = function () {
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
