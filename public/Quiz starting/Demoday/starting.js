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

console.log(screen.orientation.type);

const cont = document.getElementById('cont');
const plsrotate = document.getElementById('rotate');
console.log(cont);

if (screen.orientation.type == 'portrait-primary' ) { 
  console.log("huurhun");
 cont.classList.add("invisible");
}

addEventListener('orientationchange', event => { 
  console.log(screen.orientation.type);
  if (screen.orientation.type == 'landscape-primary') { 
   cont.classList.remove("invisible");
   plsrotate.classList.add("invisible")
  }
  else { 
    cont.classList.add("invisible");
    plsrotate.classList.remove("invisible")
  }
});
Жж
