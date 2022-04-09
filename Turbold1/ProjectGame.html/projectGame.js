const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

var stop = false;

canvas.width = 420;
canvas.height = 670;

canvas.style.width = "420px";
canvas.style.height = "670px";

let windows = (window.innerWidth - canvas.width ) / 2

const gravity = 3;
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
    this.width = 55;
    this.height = 80;
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
    this.width = 40;
    this.height = 40;
    this.color = color;
  }
  draw() {
    c.fillRect(this.x, this.y, this.width, this.height);
    c.fillStyle = this.color;
  }
  update() {
    if (!stop) {
      this.velocity.y = gravity;
      this.y += this.velocity.y;
      console.log(this.x, this.y);
      this.draw();
    }

    // Stop getting fall if
    // if (this.y + this.height + this.velocity.y >= canvas.height) {
    //     this.velocity.y = 0

    // }
    // else {
    //     this.velocity.y = gravity
    // }
  }
}

const gTrash = new Trash({
  position: {
    x: 25,
    y: 585,
  },
  color: "green",
});

const mTrash = new Trash({
  position: {
    x: 90,
    y: 585,
  },
  color: "yellow",
});

const pTrash = new Trash({
  position: {
    x: 155,
    y: 585,
  },
  color: "orange",
});

const eTrash = new Trash({
  position: {
    x: 220,
    y: 585,
  },
  color: "red",
});

const paTrash = new Trash({
  position: {
    x: 285,
    y: 585,
  },
  color: "blue",
});

const oTrash = new Trash({
  position: {
    x: 350,
    y: 585,
  },
  color: "purple",
});

var cal = canvas.width - 45;

let garbages = [];

let garbage = new Garbage({
  x: 100,
  y: -80,
  velocity: {
    x: 0,
    y: 1,
  },
  color: "blue",
});
// function movingGarbage(garbage) {
//     setInterval(function () {

//         const x = Math.floor(Math.random() * cal)
//         const y = -80
//         const color = 'blue';
//         const velocity = {
//             x: 0,
//             y: 1
//         }
//         const garbage = new Garbage(x, y, velocity, color)
//         garbages.push(garbage)
//         // console.log(garbages)

//     }, 1000)
// }

let drag;
let eventLeft = parseInt(
  window.getComputedStyle(canvas).getPropertyValue("left")
);
canvas.addEventListener("mousedown", function (event) {
//   stop = true;
  console.log("x", event.clientX - windows);
  console.log("y", event.clientY);
  console.log("e", eventLeft);

  if (
    garbage.x <= event.clientX - windows &&
    garbage.x + garbage.width >= event.clientX - windows &&
    garbage.y <= event.clientY &&
    garbage.y + garbage.height >= event.clientY
  ) {
    drag = true;
    console.log("ajilj bn");
  }
});
canvas.addEventListener("mouseup", function (event) {
  // if (player.position.x <= event.clientX && player.position.x + player.width >= event.clientX && player.position.y <= event.clientY && player.position.y + player.height >= event.clientY)
  drag = false;
});
canvas.addEventListener("mouseout", function (event) {
  drag = false;
});
canvas.addEventListener("mousemove", function (event) {
  // if (player.position.x <= event.clientX && player.position.x + player.width >= event.clientX && player.position.y <= event.clientY && player.position.y + player.height >= event.clientY) {
  if (drag) {
    garbage.x = event.clientX - windows - garbage.width / 2;
    garbage.y = event.clientY - garbage.height / 2;
  }
});

function drawer() {
  gTrash.draw();
  oTrash.draw();
  eTrash.draw();
  mTrash.draw();
  pTrash.draw();
  paTrash.draw();
  canvas.style.backgroundColor = "white";
}

function animate() {
  window.requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  garbage.update();
  drawer();
  // garbages.forEach(garbage => {
  //     garbage.update()

  // })
  // drawer()
}
animate();

// movingGarbage()
