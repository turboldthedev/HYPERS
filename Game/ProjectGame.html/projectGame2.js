let wiw = window.innerWidth;
let wih = window.innerHeight;

// Canvas
const canvas = document.querySelector("canvas");

// trash values
let trashWidth
let trashHeight
let trashX
let trashY
let trashSpace

//Phone size
if (screen.height >= 700 && screen.width >= 420) {
  canvas.width = 420;
  canvas.height = 700;
  trashX = -190;
  trashY = 585;
  trashHeight = 100;
  trashWidth = 80;
  trashSpace = 120;
} else if (screen.width < 420 || screen.height < 700) {
  if (screen.width < 420 && screen.height < 700) {
    canvas.width = screen.width;
    canvas.height = screen.height * 0.8;
    trashHeight = canvas.height / 7;
    trashWidth = canvas.width / 5.25;
    trashSpace = canvas.width / 3.5;
    trashX = (canvas.width / 2) - (trashSpace * 3.35);
    console.log(trashX)
    trashY = canvas.height / 1.2;
  } else if (screen.width < 420 && screen.height >= 700) {
    canvas.width = screen.width;
    canvas.height = 700;
    trashHeight = 100;
    trashWidth = canvas.width / 5.25;
    trashSpace = canvas.width / 3.5;
    trashX = (canvas.width / 2) - (trashSpace * 3.35);
    console.log(trashX)
    trashY = 585;
  } else if (screen.width >= 420 && screen.height < 700) {
    canvas.width = 420;
    canvas.height = screen.height * 0.8;
    trashHeight = canvas.height / 7;
    trashWidth = 80;
    trashSpace = canvas.width / 3.5;
    trashX = -190;
    trashY = canvas.height / 1.2;
  }
}
const c = canvas.getContext("2d");

// Arrows
let arrowR = document.getElementById("arrowR");
let arrowL = document.getElementById("arrowL");

// Score
let score = document.getElementById("timer");
let scoreCount = 100;

//Pause Button
const buttonEl = document.getElementById("button");
const pauseEl = document.getElementById('pause');
// States
var pause = true;

// Drag
var mouseX;
var mouseY;
let drag;
let mbx, mby;
let mpx, mpy;


// Colors
var colors = ["yellow", "brown", "green", "orange", "blue", "grey", "black"];

// Center
let widthcent = (wiw - canvas.width) / 2;
let heicent = (wih - canvas.height) / 2;
canvas.style.marginTop = heicent + "px";

//
var gravity = 0.5;
var grd = c.createLinearGradient(0, 0, canvas.width, canvas.height);
c.fillStyle = "white";

c.fillRect(0, 0, canvas.width, canvas.height);

//TrashCans classes
class Trash {
  constructor({ position, color, id }) {
    this.position = position;
    this.width = trashWidth;
    this.height = trashHeight;
    this.color = color;
    this.id = id;
  }
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

}

//Garbage classes
class Garbage {
  constructor({ x, y, velocity, color, id }) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.width = 30;
    this.height = 30;
    this.color = color;
    this.id = id;
  }
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.velocity.y = gravity;
    this.y += this.velocity.y;
  }
  detectr() {
    delete this.x;
    delete this.y;
    delete this.width;
    delete this.height;
    delete this.color;
    delete this.id;
  }
}

var trashes = [];
for (let i = 0; i < 7; i++) {
  trashes.push(
    new Trash({
      position: {
        x: trashX + i * trashSpace,
        y: trashY,
      },
      color: colors[i],
      id: i,
    })
  );
}

var cal = canvas.width - 45;
let garbages = [];
let garbage;
let idx;
let trmove = 0;
let tlmove = 0;

arrowR.style.left = widthcent + canvas.width - 40 + "px";
arrowR.style.top = heicent + canvas.height - 80 + "px";

arrowL.style.left = widthcent + 2 + "px";
arrowL.style.top = heicent + canvas.height - 82 + "px";

buttonEl.style.left = widthcent + 10 + "px";
buttonEl.style.top = heicent + 10 + "px";

arrowL.addEventListener("click", keyMoveR);
arrowR.addEventListener("click", keyMoveL);

document.addEventListener("keydown", function (e) {
  if (e.key == "A" || e.key == "a" || e.key == "ArrowLeft") {
    keyMoveR();
  }
  if (e.key == "D" || e.key == "d" || e.key == "ArrowRight") {
    keyMoveL();
  }
  if (e.key == ' ') {
    paused();
  }
});

const interval = setInterval(function () {
  if (pause) {
    const x = Math.floor(Math.random() * cal);
    const y = -80;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const velocity = {
      x: 0,
      y: 1,
    };
    const id = colors.indexOf(color);
    garbage = new Garbage({ x, y, velocity, color, id });
    garbages.push(garbage);
  }
}, 1800);

// Mouse down

canvas.addEventListener("mousedown", function (event) {
  garbages.forEach((garbage) => {
    if (
      garbage.x <= event.clientX - widthcent &&
      garbage.x + garbage.width >= event.clientX - widthcent &&
      garbage.y <= event.clientY - heicent &&
      garbage.y + garbage.height >= event.clientY - heicent
    ) {
      drag = true;
      mbx = event.clientX - garbage.x;
      mby = event.clientY - garbage.y;
      idx = garbages.indexOf(garbage);
      mouseX = event.clientX - mbx;
      mouseY = event.clientY - mby;
    }
  });
});
canvas.addEventListener("mouseup", function (event) {
  drag = false;
});
canvas.addEventListener("mouseout", function (event) {
  drag = false;
});
canvas.addEventListener("mousemove", function (event) {
  if (drag) {
    mouseX = event.clientX - mbx;
    mouseY = event.clientY - mby;
  }
});
canvas.addEventListener("touchstart", (e) => {
  garbages.forEach((garbage) => {
    [...e.changedTouches].forEach((touch) => {
      if (
        garbage.x <= `${touch.pageX}` - widthcent &&
        garbage.x + garbage.width >= `${touch.pageX}` - widthcent &&
        garbage.y <= `${touch.pageY}` - heicent &&
        garbage.y + garbage.height >= `${touch.pageY}` - heicent
      ) {
        drag = true;
        mpx = `${touch.pageX}` - garbage.x;
        mpy = `${touch.pageY}` - garbage.y;
        idx = garbages.indexOf(garbage);
        mouseX = `${touch.pageX}` - mpx;
        mouseY = `${touch.pageY}` - mpy;
      }
    });
  });
});

canvas.addEventListener("touchend", (e) => {
  drag = false;
});
canvas.addEventListener("touchmove", (e) => {
  if (drag) {
    [...e.changedTouches].forEach((touch) => {
      mouseX = `${touch.pageX}` - mpx;
      mouseY = `${touch.pageY}` - mpy;
    });
  }
});

function dreg() {
  if (drag) {
    garbages[idx].x = mouseX;
    garbages[idx].y = mouseY;
  }
}
function drawer() {
  trashes.forEach((trash) => {
    trash.draw();
  });
  canvas.style.backgroundColor = "white";
}
let garbageNull;

// Main Animate Function

function animate() {
  window.requestAnimationFrame(animate);
  dreg();
  if (pause) {
    detect();
    c.clearRect(0, 0, canvas.width, canvas.height);
    garbages.forEach((garbage) => {
      garbage.update();
    });
    score.innerText = scoreCount;
    scoreMine();
  }
  drawer();
}

animate();

// Pause button clicked

function paused() {
  pause = false;
  pauseEl.style.display = 'flex';
}

function resumed() {
  pause = true;
  pauseEl.style.display = 'none';
}

window.addEventListener("focus", () => {
  resumed()
});

window.addEventListener("blur", () => {
  paused()
});

let timer = null;
let timerId;

// function decreaseTimer() {
//   if (timer < 10000) {
//     timerId = setTimeout(decreaseTimer, 100);
//     timer++;
//     document.getElementById("timer").innerHTML = timer;
//   }
// }

function keyMoveL() {
  const interval = setInterval(() => {
    if (tlmove < 12) {
      trashes.forEach((trash) => {
        trash.position.x += trashSpace / 12;
      });
      tlmove++;
      if ((trashes[0].position.x).toFixed(2) == (trashX + trashSpace).toFixed(2)) {
        trashes.splice(0, 0, trashes[6]);
        trashes.splice(7, 1);
        trashes[0].position.x -= trashSpace * 7;
        console.log('comp')
      }
    }
  }, 30);

  if (tlmove >= 12) {
    tlmove = 0;
    clearInterval(interval);
  }
  console.log((trashes[0].position.x).toFixed(2));
  console.log('> : ',(trashX + trashSpace).toFixed(2));
}

function keyMoveR() {
  const interval = setInterval(() => {
    if (trmove < 12) {
      trashes.forEach((trash) => {
        trash.position.x -= trashSpace / 12;
      });
      trmove++;
      if ((trashes[6].position.x).toFixed(2) == (trashX + (trashSpace * 5)).toFixed(2)) {
        trashes.splice(7, 0, trashes[0]);
        trashes.splice(0, 1);
        trashes[6].position.x += trashSpace * 7;
        console.log('comp')
      }
    }
  }, 30);
  if (trmove >= 12) {
    trmove = 0;
    clearInterval(interval);
  }
  console.log((trashes[6].position.x).toFixed(2));
  console.log('< : ',trashX + (trashSpace * 5))
}

function detect() {
  garbages.forEach((garbage, index) => {
    for (let i=0; i<7; i++) {
      if (
        garbage.y > trashY &&
        garbage.y < trashY + trashHeight &&
        garbage.x > trashX - 10 + i * trashSpace &&
        garbage.x < trashX + trashWidth - 10 + i * trashSpace
      ) {
        setTimeout(() => {
          if (trashes[i].id == garbage.id) {
            if (garbages[index] == garbages[idx]) {
              drag = false;
            }
            garbage.detectr();
            scoreCount += 20;
          } else {
            if (garbages[index] == garbages[idx]) {
              drag = false;
            }
            garbage.detectr();
            scoreCount -= 20;
          }
        }, 0);
      }
    }
  });
}

function scoreMine() {
  garbages.forEach((garbage) => {
    if (garbage.y == canvas.height) {
      garbage.detectr();
      scoreCount -= 25;
      console.log(666)
    }
  });
}

function reportSize() {
  wiw = innerWidth;
  widthcent = (wiw - canvas.width) / 2;
  heicent = (wih - canvas.height) / 2;
  arrowR.style.left = widthcent + canvas.width - 40 + "px";
  arrowR.style.top = heicent + canvas.height - 80 + "px";
  arrowL.style.left = widthcent + 2 + "px";
  arrowL.style.top = heicent + canvas.height - 82 + "px";
  buttonEl.style.left = widthcent + 10 + "px";
  buttonEl.style.top = heicent + 10 + "px";
}

function pp() {
  garbage.splice()
}