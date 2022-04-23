const canvas = document.querySelector("canvas");

let arrowR = document.getElementById("arrowR");

let arrowL = document.getElementById("arrowL");
console.log(arrowR, arrowL)

const c = canvas.getContext("2d");

let button = document.getElementById("but");

var pause = true;
var stop = false;
const currentHref = window.location.href;
canvas.width = 420;
canvas.height = 700;

var mouseX, mouseY;
let wiw = window.innerWidth,
  wih = window.innerHeight;

var colors = ["green", "yellow", "orange", "brown", "blue", "grey", "black"];
canvas.style.width = "420px";
canvas.style.height = "700px";

let widthcent = (wiw - canvas.width) / 2;
let heicent = (wih - canvas.height) / 2;

canvas.style.marginTop = heicent + "px";
let drag;
let mbx, mby;
let mpx, mpy;
let hcan = canvas.width / 2;

var gravity = 1;
var grd = c.createLinearGradient(0, 0, canvas.width, canvas.height);
c.fillStyle = "white";

c.fillRect(0, 0, canvas.width, canvas.height);

//TrashCans classes
class Trash {
  constructor({ position, color }) {
    this.position = position;
    this.width = 80;
    this.height = 100;
    this.color = color;
  }
  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
//Garbage classes
class Garbage {
  constructor({ x, y, velocity, color , id}) {
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
    //console.log(this.color);
  }
  update() {
    this.draw();
    this.velocity.y = gravity;
    this.y += this.velocity.y;
  }
}
var trashes = [];

trashes.push(
  new Trash({
    position: {
      x: -190,
      y: 585,
    },
    color: "yellow",
  })
);

trashes[1] = new Trash({
  position: {
    x: -70,
    y: 585,
  },
  color: "brown",
});

trashes[2] = new Trash({
  position: {
    x: 50,
    y: 585,
  },
  color: "green",
});

trashes[3] = new Trash({
  position: {
    x: 170,
    y: 585,
  },
  color: "orange",
});

trashes[4] = new Trash({
  position: {
    x: 290,
    y: 585,
  },
  color: "blue",
});

trashes[5] = new Trash({
  position: {
    x: 410,
    y: 585,
  },
  color: "grey",
});

trashes[6] = new Trash({
  position: {
    x: 530,
    y: 585,
  },
  color: "black",
});

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

arrowL.addEventListener("click", keyMoveR);
arrowR.addEventListener("click", keyMoveL);

document.addEventListener("keydown", function (e) {
  if (e.key == "A" || e.key == "a" || e.key == "ArrowLeft") {
    keyMoveR();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key == "D" || e.key == "d" || e.key == "ArrowRight") {
    keyMoveL();
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
    garbage = new Garbage({ x, y, velocity, color });
    garbages.push(garbage);
  }
}, 2000);

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
function animate() {
  window.requestAnimationFrame(animate);
  dreg();
  wiw = innerWidth;
  widthcent = (wiw - canvas.width) / 2;
  heicent = (wih - canvas.height) / 2;
  arrowR.style.left = widthcent + canvas.width - 40 + "px";
  arrowR.style.top = heicent + canvas.height - 80 + "px";
  arrowL.style.left = widthcent + 2 + "px";
  arrowL.style.top = heicent + canvas.height - 82 + "px";

  if (pause) {
    detect();
    c.clearRect(0, 0, canvas.width, canvas.height);
    garbages.forEach((garbage) => {
      garbage.update();
    });
  }
  drawer();
}
animate();

window.addEventListener("focus", () => {
  pause = true;
  // console.log("orson");
});

window.addEventListener("blur", () => {
  pause = false;
  // console.log("garsan");
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
        trash.position.x += 10;
      });
      tlmove++;
      if (trashes[0].position.x == -70) {
        trashes.splice(0, 0, trashes[6]);
        trashes.splice(7, 1);
        trashes[0].position.x -= 840;
      }
    }

  }, 30);

  if (tlmove >= 12) {
    tlmove = 0;
    clearInterval(interval);
  }
  console.log(trashes);
}

function keyMoveR() {
  const interval = setInterval(() => {
    if (trmove < 12) {
      trashes.forEach((trash) => {
        trash.position.x -= 10;
      });
      trmove++;
      if (trashes[6].position.x == 410) {
        trashes.splice(7, 0, trashes[0]);
        trashes.splice(0, 1);
        trashes[6].position.x += 840;
      }
    }
  }, 30);
  if (trmove >= 12) {
    trmove = 0;
    clearInterval(interval);
  }

  console.log(trashes);
}

let yi;

garbageNull = new Garbage({
  x: Math.floor(Math.random() * cal),
  y: -80,
  color: "white",
  velocity: {
    x: 0,
    y: 1,
  },
});

function detect() {
  garbages.forEach((garbage, index) => {
    if (
      garbage.y > 585 &&
      garbage.y < 685 &&
      garbage.x > 40 &&
      garbage.x < 130
    ) {
      setTimeout(() => {
        if (garbages[index] == garbages[idx]) {
          drag = false;
        }
        garbages.splice(index, 1, garbageNull);
      }, 0);
    }
    if (
      garbage.y > 585 &&
      garbage.y < 685 &&
      garbage.x > 160 &&
      garbage.x < 260
    ) {
      setTimeout(() => {
        if (garbages[index] == garbages[idx]) {
          drag = false;
        }
        garbages.splice(index, 1, garbageNull);
      }, 0);
    }
    if (
      garbage.y > 585 &&
      garbage.y < 685 &&
      garbage.x > 280 &&
      garbage.x < 380
    ) {
      setTimeout(() => {
        if (garbages[index] == garbages[idx]) {
          drag = false;
        }
        garbages.splice(index, 1, garbageNull);
      }, 0);
    }
  });
}
console.log(trashes);
