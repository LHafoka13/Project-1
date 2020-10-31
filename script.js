var submitBtn = document.getElementById("submit-btn");

function submitPlant() {
  event.preventDefault();
  console.log("click");
}

submitBtn.addEventListener("click", submitPlant);
