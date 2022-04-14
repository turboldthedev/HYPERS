const canvas = document.querySelector("canvas");

let arrowR = document.getElementById('arrowR')

let arrowL = document.getElementById('arrowL')

const c = canvas.getContext("2d");

let button = document.getElementById("but");
var stop = false;
const currentHref = window.location.href;
canvas.width = 420;
canvas.height = 700;

var pause = true;
var mouseX, mouseY;
let wiw = window.innerWidth, wih = window.innerHeight;

var colors = ['green', 'yellow', 'orange', 'red', 'blue', 'purple']
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

// grd.addColorStop(0,"rgb(47, 108, 165)");
// grd.addColorStop(1,"black");
// Fill with gradient
c.fillStyle = "white";

c.fillRect(0, 0, canvas.width, canvas.height);

//TrashCans classes
class Trash {
  constructor({ position, color = "green" }) {
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
  constructor({ x, y, velocity, color = "green" }) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.width = 30;
    this.height = 30;
    this.color = color;
  }
  draw() {
    c.fillRect(this.x, this.y, this.width, this.height);
    c.fillStyle = this.color;
  }
  update() {
    this.draw();
    // if (!garbages[idx]) {
    this.velocity.y = gravity;
    this.y += this.velocity.y;

    // }

    // Stop getting fall if
    // if (this.y + this.height + this.velocity.y >= canvas.height) {
    //     this.velocity.y = 0

    // }
    // else {
    //     this.velocity.y = gravity
    // }
  }
}
const mTrash = new Trash({
  position: {
    x: hcan - 40,
    y: 585,
  },
  color: "yellow",
});

const gTrash = new Trash({
  position: {
    x: mTrash.position.x - 120,
    y: 585,
  },
  color: "green",
});



const pTrash = new Trash({
  position: {
    x: mTrash.position.x + 120,
    y: 585,
  },
  color: "orange",
});

// const eTrash = new Trash({
//   position: {
//     x: 220,
//     y: 585,
//   },
//   color: "red",
// });

// const paTrash = new Trash({x
//   position: {
//     x: 285,
//     y: 585,
//   },
//   color: "blue",
// });

// const oTrash = new Trash({
//   position: {
//     x: 350,
//     y: 585,
//   },
//   color: "purple",`
// });

var cal = canvas.width - 45;

let garbages = [];
let garbage;
let idx;

arrowR.style.left = widthcent + canvas.width - 40 + 'px';
arrowR.style.top = heicent + canvas.height - 80 + 'px'

arrowL.style.left = widthcent + 2 + 'px'
arrowL.style.top = heicent + canvas.height - 82 + 'px'

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

  // console.log(garbages)
}, 1500);

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
      mouseX = event.clientX - mbx
      mouseY = event.clientY - mbyloo
      // garbages.slice(idx, 1);
      console.log("ajilji");
    }
  });
});
canvas.addEventListener("mouseup", function (event) {
  drag = false;
  // garbages.slice(idx, 0, garbages[idx]);
});
canvas.addEventListener("mouseout", function (event) {
  drag = false;
  // garbages.slice(idx, 0, garbages[idx]);
});
canvas.addEventListener("mousemove", function (event) {
  if (drag) {
    mouseX = event.clientX - mbx
    mouseY = event.clientY - mby
    // garbages[idx].x = event.clientX - mbx;
    // garbages[idx].y = event.clientY - mby;
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
        mouseX = `${touch.pageX}` - mpx
        mouseY = `${touch.pageY}` - mpy
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
      mouseX = `${touch.pageX}` - mpx
      mouseY = `${touch.pageY}` - mpy
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
  gTrash.draw();
  //   oTrash.draw();
  //   eTrash.draw();
  mTrash.draw();
  pTrash.draw();
  //   paTrash.draw();
  canvas.style.backgroundColor = "white";
}

function animate() {
  window.requestAnimationFrame(animate);
  wiw = innerWidth
  wih = innerHeight
  let widthcent = (wiw - canvas.width) / 2;
  let heicent = (wih - canvas.height) / 2;
  arrowR.style.left = widthcent + canvas.width - 40 + 'px';
  arrowR.style.top = heicent + canvas.height - 80 + 'px'
  arrowL.style.left = widthcent + 2 + 'px'
  arrowL.style.top = heicent + canvas.height - 82 + 'px'
  if (pause) {

    c.clearRect(0, 0, canvas.width, canvas.height);

    dreg();
    garbages.forEach((garbage) => {
      garbage.update();
    });
  }


  drawer();
}
animate();

window.addEventListener("focus", () => {
  pause = true;
  console.log('orson')
});

window.addEventListener("blur", () => {
  pause = false;
  console.log("garsan");
  //   clearTimeout(interval);
});
