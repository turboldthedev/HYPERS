const textEl = document.getElementById("text");
const playEl = document.getElementById("play");
const container2El = document.getElementsByClassName("container")[0];
const containerEl = document.getElementById("cont1");

function startingMap() {
  container2El.removeChild(textEl);
  container2El.removeChild(playEl);

  containerEl.style.display = "flex";
  containerEl.classList.add("appear");
  console.log(textEl);
}
