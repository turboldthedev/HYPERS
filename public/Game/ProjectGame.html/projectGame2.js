let wiw = window.innerWidth;
let wih = window.innerHeight;

// Canvas
const canvas = document.querySelector("canvas");

// trash values
let trashWidth;
let trashHeight;
let trashX;
let trashY;
let trashSpace;
let garbageSize;

// time value
let timing = 3700;
let timer = 0;
let timeq = 20;

//tutorial
const tutorialEl = document.getElementById("tutorial");

//Types of garbages

const garbageImg = [];
garbageImg[0] = [
  "./img/Glass/greenGlass.png",
  "./img/Glass/brokenCodka.png",
  "./img/Glass/brokenGlass.png",
  "./img/Glass/codka.png",
  "./img/Glass/vineGlass.png",
];

garbageImg[1] = [
  "./img/Medical/medical1.png",
  "./img/Medical/medical2.png",
  "./img/Medical/medical4.png",
  "./img/Medical/medical5.png",
];

garbageImg[2] = [
  "./img/Metal/bigCan.png",
  "./img/Metal/blueCan.png",
  "./img/Metal/can.png",
];

garbageImg[6] = [
  "./img/NonRecyclable/image 10206.png",
  "./img/NonRecyclable/lamp.png",
  "./img/NonRecyclable/poison.png",
  "./img/NonRecyclable/boiler.png",
];

garbageImg[5] = [
  "./img/Organic/apple.png",
  "./img/Organic/bread.png",
  "./img/Organic/deadFish.png",
  "./img/Organic/egg.png",
  "./img/Organic/meat.png",
];

garbageImg[4] = [
  "./img/paper/cardon.png",
  "./img/paper/eggBox.png",
  "./img/paper/newsPaper.png",
  "./img/paper/paperBag.png",
  "./img/paper/pizzaPack.png",
];

garbageImg[3] = [
  "./img/Plastic/plastic1.png",
  "./img/Plastic/plastic2.png",
  "./img/Plastic/plastic3.png",
  "./img/Plastic/plastic4.png",
];
//Background Img Src
const bImg = [];
bImg[0] = ["./img/Background/gameWallpaper1.webp"];
bImg[1] = ["./img/Background/GAMEWALLPAPER2.jpeg"];
bImg[2] = ["./img/Background/ulaanbaatar.jpeg"];

//Phone size
if (screen.height >= 700 && screen.width >= 420) {
  canvas.width = 420;
  canvas.height = 700;
  tutorialEl.style.width = 420 + "px";
  tutorialEl.style.height = 700 + "px";
  // tutorial.style.marginTop = 14.8 + '%';
  trashX = -190;
  trashY = 585;
  trashHeight = 100;
  trashWidth = 80;
  trashSpace = 120;
  garbageSize = trashWidth * 0.6;
} else if (screen.width < 420 || screen.height < 700) {
  if (screen.width < 420 && screen.height < 700) {
    canvas.width = screen.width;
    canvas.height = screen.height * 0.8;
    tutorialEl.style.width = screen.width + "px";
    tutorialEl.style.height = screen.height * 0.8 + "px";
    // tutorial.style.marginTop = 18 + '%';
    trashHeight = canvas.height / 7;
    trashWidth = canvas.width / 5.25;
    trashSpace = canvas.width / 3.5;
    trashX = canvas.width / 2 - trashSpace * 3.35;
    trashY = canvas.height / 1.2;
    garbageSize = trashWidth * 0.6;
  } else if (screen.width < 420 && screen.height >= 700) {
    canvas.width = screen.width;
    canvas.height = 700;
    tutorialEl.style.width = screen.width + "px";
    tutorialEl.style.height = 700 + "px";
    // tutorial.style.marginTop =  + 'px';
    trashHeight = 100;
    trashWidth = canvas.width / 5.25;
    trashSpace = canvas.width / 3.5;
    trashX = canvas.width / 2 - trashSpace * 3.35;
    trashY = 585;
    garbageSize = trashWidth * 0.6;
  } else if (screen.width >= 420 && screen.height < 700) {
    canvas.width = 420;
    canvas.height = screen.height * 0.8;
    tutorialEl.style.width = 420 + "px";
    tutorialEl.style.height = screen.height * 0.8 + "px";
    // tutorial.style.marginTop = 14.8 + '%';
    trashHeight = canvas.height / 7;
    trashWidth = 80;
    trashSpace = canvas.width / 3.5;
    trashX = -190;
    trashY = canvas.height / 1.2;
    garbageSize = trashWidth * 0.6;
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
const pauseEl = document.getElementById("pause");

//Back Button
const backButtonEl = document.getElementById("backButton");

//Defeat
const defeatEl = document.getElementById("def");

// States
var pause = true;

// Drag
var mouseX;
var mouseY;
let drag;
let mbx, mby;
let mpx, mpy;

// Trashcan types
const tImage = [
  "./img/TrashCan/trsh1.png",
  "./img/TrashCan/trsh2.png",
  "./img/TrashCan/trsh3.png",
  "./img/TrashCan/trsh4.png",
  "./img/TrashCan/trsh5.png",
  "./img/TrashCan/trsh6.png",
  "./img/TrashCan/trsh7.png",
];

// Center
let widthcent = (wiw - canvas.width) / 2;
let heicent = (wih - canvas.height) / 2;
canvas.style.marginTop = heicent + "px";
tutorialEl.style.marginTop = heicent + "px";
// Gravity
var gravity = 0.5;

c.fillRect(0, 0, canvas.width, canvas.height);

//Background class
class Background {
  constructor({ backgroundImg }) {
    this.image = new Image();
    this.image.src = backgroundImg;
    this.width = canvas.width;
    this.height = canvas.height;
  }
  draw() {
    c.drawImage(this.image, 0, 0, this.width, this.height);
  }
}

//TrashCan classes
class Trash {
  constructor({ position, image, id }) {
    this.position = position;
    this.width = trashWidth;
    this.height = trashHeight;
    this.image = new Image();
    this.image.src = image;
    this.id = id;
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

//Garbage classes
class Garbage {
  constructor({ x, y, velocity, image, id }) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.width = garbageSize;
    this.height = garbageSize;
    this.image = new Image();
    this.image.src = image;
    this.id = id;
  }
  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height);
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
      image: tImage[i],
      id: i,
    })
  );
}
console.log(trashes, "asdajhflksdhjkfhasdkflhjdshfkl");

//Background Image by Class
const backgroundImg = new Background({
  backgroundImg: bImg[Math.floor(Math.random() * bImg.length)],
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

buttonEl.style.left = widthcent + 10 + "px";
buttonEl.style.top = heicent + 10 + "px";

backButtonEl.style.left = widthcent + 10 + "px";
backButtonEl.style.top = heicent + 10 + "px";

arrowL.addEventListener("click", keyMoveL);
arrowR.addEventListener("click", keyMoveR);

document.addEventListener("keydown", function (e) {
  if (e.key == "A" || e.key == "a" || e.key == "ArrowLeft") {
    keyMoveR();
  }
  if (e.key == "D" || e.key == "d" || e.key == "ArrowRight") {
    keyMoveL();
  }
  if (e.key == " ") {
    if (pause) {
      paused();
    } else {
      resumed();
    }
  }
});

const interval = setInterval(function () {
  if (pause) {
    const x = Math.floor(Math.random() * cal);
    const y = -80;

    const velocity = {
      x: 0,
      y: 1,
    };
    const id = Math.floor(Math.random() * garbageImg.length);
    const image =
      garbageImg[id][Math.floor(Math.random() * garbageImg[id].length)];
    garbage = new Garbage({ x, y, velocity, image, id });
    garbages.push(garbage);
    timer++;
    console.log(id);
  }
}, timing);

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
canvas.addEventListener("touchcancel", (e) => {
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
}
function bgdraw() {
  backgroundImg.draw();
}
// Main Animate Function

function animate() {
  window.requestAnimationFrame(animate);
  dreg();
  if (pause) {
    detect();
    c.clearRect(0, 0, canvas.width, canvas.height);

    bgdraw();
    garbages.forEach((garbage) => {
      garbage.update();
    });
    drawer();
    score.innerText = scoreCount;
    scoreMine();
    if (timer > timeq) {
      gravity += 0.3;
      timeq += 20;
    }
  }
}

animate();

// Pause button clicked

function paused() {
  if (pause) {
    pause = false;
    pauseEl.style.display = "flex";
  }
}

function resumed() {
  if (!pause) {
    pause = true;
    pauseEl.style.display = "none";
    defeatEl.style.display = "none";
  }
}

function tutorial() {
  if (!pause) {
    pause = false
    pauseEl.style.display = "none";
    buttonEl.style.display = "none"
    tutorialEl.style.display = "flex"
    backButtonEl.style.display = 'flex'
  }
}

function backToPause() {
  if (!pause) {
    pause = false
    pauseEl.style.display = "flex";
    buttonEl.style.display = "flex"
    tutorialEl.style.display = "none"
    backButtonEl.style.display = 'none'
  }
}
window.addEventListener("focus", () => {
  resumed();
});

window.addEventListener("blur", () => {
  paused();
});

function keyMoveL() {
  if (pause) {
    const interval = setInterval(() => {
      if (tlmove < 12) {
        trashes.forEach((trash) => {
          trash.position.x += trashSpace / 12;
        });
        tlmove++;
        if (
          trashes[0].position.x.toFixed(2) == (trashX + trashSpace).toFixed(2)
        ) {
          trashes.splice(0, 0, trashes[6]);
          trashes.splice(7, 1);
          trashes[0].position.x -= trashSpace * 7;
        }
      }
    }, 30);

    if (tlmove >= 12) {
      tlmove = 0;
      clearInterval(interval);
    }
  }
}

function keyMoveR() {
  if (pause) {
    const interval = setInterval(() => {
      if (trmove < 12) {
        trashes.forEach((trash) => {
          trash.position.x -= trashSpace / 12;
        });
        trmove++;
        if (
          trashes[6].position.x.toFixed(2) ==
          (trashX + trashSpace * 5).toFixed(2)
        ) {
          trashes.splice(7, 0, trashes[0]);
          trashes.splice(0, 1);
          trashes[6].position.x += trashSpace * 7;
        }
      }
    }, 30);
    if (trmove >= 12) {
      trmove = 0;
      clearInterval(interval);
    }
  }
}

function defeated() {
  pause = false;
  defeatEl.style.display = "flex";
}

// Detect Trash
function detect() {
  garbages.forEach((garbage, index) => {
    for (let i = 0; i < 7; i++) {
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
let oneDetect = true;
function scoreMine() {
  garbages.forEach((garbage, index) => {
    if (garbage.y >= canvas.height) {
      if (garbages[index] == garbages[idx]) {
        drag = false;
      }
      garbage.detectr();
      scoreCount -= 25;
      console.log("detect");
    }
  });
  if (scoreCount <= 0) {
    defeated();
    scoreCount = 0;
  }
}

//Resize the Arrow & PauseButton according windows size
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
  backButtonEl.style.left = widthcent + 10 + "px";
  backButtonEl.style.top = heicent + 10 + "px";
}

//Reset the Game
function reset() {
  scoreCount = 100;
  pause = false;
  garbages.splice(0, garbages.length);
  timer = 0;
  timeq = 20;
  gravity = 0.5;
  trashes = [];
  for (let i = 0; i < 7; i++) {
    trashes.push(
      new Trash({
        position: {
          x: trashX + i * trashSpace,
          y: trashY,
        },
        image: tImage[i],
        id: i,
      })
    );
  }
  resumed();
}
