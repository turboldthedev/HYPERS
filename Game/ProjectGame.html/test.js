let wiw = window.innerWidth;
let wih = window.innerHeight;

// Arrows
let arrowR = document.getElementById("arrowR");
let arrowL = document.getElementById("arrowL");

// Score
let score = document.getElementById("timer");
let scoreCount = 100;

// Canvas
const canvas = document.querySelector("canvas");
canvas.width = 420;
canvas.height = 700;
canvas.style.border = "1px solid red";
const context = canvas.getContext("2d");

context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

// Constants

GARBAGE_VELOCITY = 1;

// States
var pause = false;
var stop = false;
var mouse = { x: null, y: null, deltaX: null, deltaY: null };

canvas.addEventListener("mousedown", (e) => {
  console.log("down", e);
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  mouse.deltaY = 0;
  mouse.deltaX = 0;
  garbage.grag();
});
canvas.addEventListener("mousemove", function (e) {
  if (garbage.drag !== null) {
    mouse.deltaX = e.clientX - mouse.x;
    mouse.deltaY = e.clientY - mouse.y;
  }
});
canvas.addEventListener("mouseup", (e) => {
  console.log("up", e);
  mouse.x = null;
  mouse.y = null;
  mouse.deltaY = null;
  mouse.deltaX = null;
  if (garbage.drag) {
    garbage.undrag();
  }
});

//Garbage classes
class Garbage {
  constructor(x, y, color, id) {
    this.x = x;
    this.y = y;
    this.velocity = GARBAGE_VELOCITY;
    this.width = 30;
    this.height = 30;
    this.color = color;
    this.id = id;
    this.drag = null;
  }
  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.draw();

    if (this.drag === null) {
      this.y += this.velocity;
      console.log("this", this.x, this.y);
    } else {
      this.y = this.drag.x + mouse.deltaY;
      this.x = this.drag.y + mouse.deltaX;
    }
  }
  grag() {
    this.drag = { x: this.x, y: this.y };
    console.log("drag", this.drag);
    console.log("this", this.x, this.y);
  }
  undrag() {
    this.drag = null;
  }
}
const garbage = new Garbage(40, 0, "red", 1);
garbage.draw();

function animate() {
  window.requestAnimationFrame(animate);
  console.log(mouse.deltaY, mouse.deltaX);
  context.clearRect(0, 0, 420, 720);
  garbage.update();
}

animate();

// var colors = ["yellow", "brown", "green", "orange", "blue", "grey", "black"];
// canvas.style.width = "420px";
// canvas.style.height = "700px"; // CSS bolgo

// let widthcent = (wiw - canvas.width) / 2;
// let heicent = (wih - canvas.height) / 2; // Nershil!

// canvas.style.marginTop = heicent + "px"; // CSS bolgo

// let drag;
// let mbx, mby;
// let mpx, mpy;
// let hcan = canvas.width / 2;

// var gravity = 1;
// // var grd = c.createLinearGradient(0, 0, canvas.width, canvas.height);
// // c.fillStyle = "white";

// // c.fillRect(0, 0, canvas.width, canvas.height);

// //TrashCans classes
// class Trash {
//   constructor({ position, color, id }) {
//     this.position = position;
//     this.width = 80;
//     this.height = 100;
//     this.color = color;
//     this.id = id;
//   }
//   draw() {
//     c.fillStyle = this.color;
//     c.fillRect(this.position.x, this.position.y, this.width, this.height);
//   }
// }

// var trashes = [];
// for (let i = 0; i < 7; i++) {
//   trashes.push(
//     new Trash({
//       position: {
//         x: -190 + i * 120,
//         y: 585,
//       },
//       color: colors[i],
//       id: i,
//     })
//   );
// }

// var cal = canvas.width - 45;

// let garbages = [];
// let garbage;
// let idx;
// let trmove = 0;
// let tlmove = 0;

// arrowR.style.left = widthcent + canvas.width - 40 + "px";
// arrowR.style.top = heicent + canvas.height - 80 + "px";

// arrowL.style.left = widthcent + 2 + "px";
// arrowL.style.top = heicent + canvas.height - 82 + "px";

// arrowL.addEventListener("click", keyMoveR);
// arrowR.addEventListener("click", keyMoveL);

// document.addEventListener("keydown", function (e) {
//   if (e.key == "A" || e.key == "a" || e.key == "ArrowLeft") {
//     keyMoveR();
//   }
// });

// document.addEventListener("keydown", function (e) {
//   if (e.key == "D" || e.key == "d" || e.key == "ArrowRight") {
//     keyMoveL();
//   }
// });

// const interval = setInterval(function () {
//   if (pause) {
//     const x = Math.floor(Math.random() * cal);
//     const y = -80;
//     const color = colors[Math.floor(Math.random() * colors.length)];
//     const velocity = {
//       x: 0,
//       y: 1,
//     };
//     const id = colors.indexOf(color);
//     garbage = new Garbage({ x, y, velocity, color, id });
//     garbages.push(garbage);
//   }
// }, 1800);

// // Mouse down

// canvas.addEventListener("mousedown", function (event) {
//   garbages.forEach((garbage) => {
//     if (
//       garbage.x <= event.clientX - widthcent &&
//       garbage.x + garbage.width >= event.clientX - widthcent &&
//       garbage.y <= event.clientY - heicent &&
//       garbage.y + garbage.height >= event.clientY - heicent
//     ) {
//       drag = true;
//       mbx = event.clientX - garbage.x;
//       mby = event.clientY - garbage.y;
//       idx = garbages.indexOf(garbage);
//       mouseX = event.clientX - mbx;
//       mouseY = event.clientY - mby;
//     }
//   });
// });
// canvas.addEventListener("mouseup", function (event) {
//   drag = false;
// });
// canvas.addEventListener("mouseout", function (event) {
//   drag = false;
// });
// canvas.addEventListener("mousemove", function (event) {
//   if (drag) {
//     mouseX = event.clientX - mbx;
//     mouseY = event.clientY - mby;
//   }
// });
// canvas.addEventListener("touchstart", (e) => {
//   garbages.forEach((garbage) => {
//     [...e.changedTouches].forEach((touch) => {
//       if (
//         garbage.x <= `${touch.pageX}` - widthcent &&
//         garbage.x + garbage.width >= `${touch.pageX}` - widthcent &&
//         garbage.y <= `${touch.pageY}` - heicent &&
//         garbage.y + garbage.height >= `${touch.pageY}` - heicent
//       ) {
//         drag = true;
//         mpx = `${touch.pageX}` - garbage.x;
//         mpy = `${touch.pageY}` - garbage.y;
//         idx = garbages.indexOf(garbage);
//         mouseX = `${touch.pageX}` - mpx;
//         mouseY = `${touch.pageY}` - mpy;
//       }
//     });
//   });
// });

// canvas.addEventListener("touchend", (e) => {
//   drag = false;
// });
// canvas.addEventListener("touchmove", (e) => {
//   if (drag) {
//     [...e.changedTouches].forEach((touch) => {
//       mouseX = `${touch.pageX}` - mpx;
//       mouseY = `${touch.pageY}` - mpy;
//     });
//   }
// });

// function dreg() {
//   if (drag) {
//     garbages[idx].x = mouseX;
//     garbages[idx].y = mouseY;
//   }
// }
// function drawer() {
//   trashes.forEach((trash) => {
//     trash.draw();
//   });
//   canvas.style.backgroundColor = "white";
// }
// let garbageNull;

// // Main Animate Function

// function animate() {
//   window.requestAnimationFrame(animate);
//   dreg();
//   wiw = innerWidth;
//   widthcent = (wiw - canvas.width) / 2;
//   heicent = (wih - canvas.height) / 2;
//   arrowR.style.left = widthcent + canvas.width - 40 + "px";
//   arrowR.style.top = heicent + canvas.height - 80 + "px";
//   arrowL.style.left = widthcent + 2 + "px";
//   arrowL.style.top = heicent + canvas.height - 82 + "px";

//   if (pause) {
//     detect();
//     c.clearRect(0, 0, canvas.width, canvas.height);
//     garbages.forEach((garbage) => {
//       garbage.update();
//     });
//     score.innerText = scoreCount;
//     scoreMine();
//   }
//   drawer();
// }

// animate();

// window.addEventListener("focus", () => {
//   pause = true;
//   // console.log("orson");
// });

// window.addEventListener("blur", () => {
//   pause = false;
//   // console.log("garsan");
// });

// let timer = null;
// let timerId;

// // function decreaseTimer() {
// //   if (timer < 10000) {
// //     timerId = setTimeout(decreaseTimer, 100);
// //     timer++;
// //     document.getElementById("timer").innerHTML = timer;
// //   }
// // }

// function keyMoveL() {
//   const interval = setInterval(() => {
//     if (tlmove < 12) {
//       trashes.forEach((trash) => {
//         trash.position.x += 10;
//       });
//       tlmove++;
//       if (trashes[0].position.x == -70) {
//         trashes.splice(0, 0, trashes[6]);
//         trashes.splice(7, 1);
//         trashes[0].position.x -= 840;
//       }
//     }
//   }, 30);

//   if (tlmove >= 12) {
//     tlmove = 0;
//     clearInterval(interval);
//   }
//   // console.log(trashes);
// }

// function keyMoveR() {
//   const interval = setInterval(() => {
//     if (trmove < 12) {
//       trashes.forEach((trash) => {
//         trash.position.x -= 10;
//       });
//       trmove++;
//       if (trashes[6].position.x == 410) {
//         trashes.splice(7, 0, trashes[0]);
//         trashes.splice(0, 1);
//         trashes[6].position.x += 840;
//       }
//     }
//   }, 30);
//   if (trmove >= 12) {
//     trmove = 0;
//     clearInterval(interval);
//   }
//   // console.log(trashes);
// }

// let yi;

// garbageNull = new Garbage({
//   x: Math.floor(Math.random() * cal),
//   y: -80,
//   color: "white",
//   velocity: {
//     x: 0,
//     y: 1,
//   },
// });

// function detect() {
//   garbages.forEach((garbage, index) => {
//     if (
//       garbage.y > 585 &&
//       garbage.y < 685 &&
//       garbage.x > 40 &&
//       garbage.x < 130
//     ) {
//       setTimeout(() => {
//         if (trashes[2].id == garbage.id) {
//           if (garbages[index] == garbages[idx]) {
//             drag = false;
//           }
//           garbages.splice(index, 1, garbageNull);
//           scoreCount += 20;
//         } else {
//           if (garbages[index] == garbages[idx]) {
//             drag = false;
//           }
//           garbages.splice(index, 1, garbageNull);
//           scoreCount -= 20;
//         }
//       }, 0);
//     }
//     if (
//       garbage.y > 585 &&
//       garbage.y < 685 &&
//       garbage.x > 160 &&
//       garbage.x < 260
//     ) {
//       setTimeout(() => {
//         if (trashes[3].id == garbage.id) {
//           if (garbages[index] == garbages[idx]) {
//             drag = false;
//           }
//           garbages.splice(index, 1, garbageNull);
//           scoreCount += 20;
//         } else {
//           if (garbages[index] == garbages[idx]) {
//             drag = false;
//           }
//           garbages.splice(index, 1, garbageNull);
//           scoreCount -= 20;
//         }
//       }, 0);
//     }
//     if (
//       garbage.y > 585 &&
//       garbage.y < 685 &&
//       garbage.x > 280 &&
//       garbage.x < 380
//     ) {
//       setTimeout(() => {
//         if (trashes[4].id == garbage.id) {
//           if (garbages[index] == garbages[idx]) {
//             drag = false;
//           }
//           garbages.splice(index, 1, garbageNull);
//           scoreCount += 20;
//         } else {
//           if (garbages[index] == garbages[idx]) {
//             drag = false;
//           }
//           garbages.splice(index, 1, garbageNull);
//           scoreCount -= 20;
//         }
//       }, 0);
//     }

//     //suuliin 2
//     if (
//       garbage.y > 585 &&
//       garbage.y < 685 &&
//       garbage.x > 400 &&
//       garbage.x < 500
//     ) {
//       setTimeout(() => {
//         if (trashes[5].id == garbage.id) {
//           if (garbages[index] == garbages[idx]) {
//             drag = false;
//           }
//           garbages.splice(index, 1, garbageNull);
//           scoreCount += 20;
//         } else {
//           if (garbages[index] == garbages[idx]) {
//             drag = false;
//           }
//           garbages.splice(index, 1, garbageNull);
//           scoreCount -= 20;
//         }
//       }, 0);
//     }
//     if (
//       garbage.y > 585 &&
//       garbage.y < 685 &&
//       garbage.x > -80 &&
//       garbage.x < 10
//     ) {
//       setTimeout(() => {
//         if (trashes[1].id == garbage.id) {
//           if (garbages[index] == garbages[idx]) {
//             drag = false;
//           }
//           garbages.splice(index, 1, garbageNull);
//           scoreCount += 20;
//         } else {
//           if (garbages[index] == garbages[idx]) {
//             drag = false;
//           }
//           garbages.splice(index, 1, garbageNull);
//           scoreCount -= 20;
//         }
//       }, 0);
//     }
//   });
// }

// function scoreMine() {
//   garbages.forEach((garbage) => {
//     if (garbage.y == canvas.height) {
//       // garbages.splice(index, 1, garbageNull);
//       scoreCount -= 25;
//     }
//     // if (scoreCount <= 0) {
//     //   // alert("You Lose");
//     //   // scoreCount = 100;
//     // }
//     // if (scoreCount >= 1000) {
//     //   // alert("You won");
//     //   // scoreCount = 100;
//     // }
//   });
// }
