var questionBar = document.getElementById("question");
var clickAfter = document.getElementById("next-clicker");
var answerBar = document.getElementById("answer");
// display photo
var corePhotoEl = document.getElementById('photo3');
corePhotoEl.style.width = window.innerWidth

function nextclick() {
  questionBar.style.display = "none";
  answerBar.style.display = "flex";
}
document.addEventListener("keydown", function (event) {
  if (event.key == "f" || event.key == "F") {
    nextclick();
  }
});
