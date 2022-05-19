let wih = window.innerHeight;
let wiw = window.innerWidth;

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

// //Background Img Src
const bImg = [];
bImg[0] = ["./img/Background/gameBg1.webp"];
bImg[1] = ["./img/Background/gameBg2.jpeg"];
bImg[2] = ["./img/Background/gameBg3.jpeg"];
bImg[3] = ["./img/Background/gameBg4.png"];

//Phone size
if (screen.height >= 700 && screen.width >= 420) {
    canvas.width = 420;
    canvas.height = 700;
    tutorialEl.style.width = 420 + "px";
    tutorialEl.style.height = 700 + "px";
    trashHeight = canvas.height / 7;
    trashWidth = canvas.width / 5.25;
    trashSpace = canvas.width / 3.5;
    trashX = canvas.width / 2 - trashSpace * 2.35;
    trashY = canvas.height / 1.2;
    garbageSize = trashWidth * 0.6;
} else if (screen.width < 420 || screen.height < 700) {
    if (screen.width < 420 && screen.height < 700) {
        canvas.width = screen.width;
        canvas.height = screen.height * 0.8;
        tutorialEl.style.width = screen.width + "px";
        tutorialEl.style.height = screen.height * 0.8 + "px";
        trashHeight = canvas.height / 7;
        trashWidth = canvas.width / 5.25;
        trashSpace = canvas.width / 3.5;
        trashX = canvas.width / 2 - trashSpace * 2.35;
        trashY = canvas.height / 1.2;
        garbageSize = trashWidth * 0.6;
    } else if (screen.width < 420 && screen.height >= 700) {
        canvas.width = screen.width;
        canvas.height = 700;
        tutorialEl.style.width = screen.width + "px";
        tutorialEl.style.height = 700 + "px";
        trashHeight = canvas.height / 7;
        trashWidth = canvas.width / 5.25;
        trashSpace = canvas.width / 3.5;
        trashX = canvas.width / 2 - trashSpace * 2.35;
        trashY = canvas.height / 1.2;
        garbageSize = trashWidth * 0.6;
    } else if (screen.width >= 420 && screen.height < 700) {
        canvas.width = 420;
        canvas.height = screen.height * 0.8;
        tutorialEl.style.width = 420 + "px";
        tutorialEl.style.height = screen.height * 0.8 + "px";
        trashHeight = canvas.height / 7;
        trashWidth = canvas.width / 5.25;
        trashSpace = canvas.width / 3.5;
        trashX = canvas.width / 2 - trashSpace * 2.35;
        trashY = canvas.height / 1.2;
        garbageSize = trashWidth * 0.6;
    }
}

const c = canvas.getContext("2d");
c.imageSmoothingEnabled = true
c.imageSmoothingQuality = 'high';
c.textBaseline = 'midle';
c.fillStyle = 'white';

// Arrows
const arrowR = document.getElementById("arrowR");
const arrowL = document.getElementById("arrowL");

// Score
let score = document.getElementById("timer");
let scoreCount = 100;

//Pause Button
const buttonEl = document.getElementById("button");
const pauseEl = document.getElementById("pause");
const menuEl = document.getElementById("menu");
const gameNameEl = document.getElementById("gameName");
//Back Button
const backButtonEl = document.getElementById("backButton");

//Defeat
const defeatEl = document.getElementById("def");

// Starting Bonus
const bonusEl = document.getElementById('bonus')
// const okEl = document.getElementById('ok')

//Victory
const victoryEL = document.getElementById("vic");

// States
var pause = true;
var game = true;

// Drag
var mouseX;
var mouseY;
let drag;
let mbx, mby;
let mpx, mpy;
// Gravity
var gravity = 0.3;
// Trashcan types
const tImage = [
    "./img/TrashCaNew/Trashcan0.png",
    "./img/TrashCaNew/Trashcan1.png",
    "./img/TrashCaNew/Trashcan2.png",
    "./img/TrashCaNew/Trashcan3.png",
    "./img/TrashCaNew/Trashcan4.png",
    "./img/TrashCaNew/Trashcan5.png",
];
const cardon = "./img/paper/paper7.png";

const trext = [
    'хүнс',
    'цаас',
    'хуван',
    'шил',
    'мет',
    'элек',
]
const trext2 = [
    ' ',
    ' ',
    'цар',
    ' ',
    'алл',
    'трон',
]
const trosition = [0.6, 0.6, 0.55, 0.6, 0.55, 0.55];

// Center
let widthcent = (wiw - canvas.width) / 2;
let heicent = (wih - canvas.height) / 2;
canvas.style.marginTop = heicent + "px";
tutorialEl.style.marginTop = heicent + "px";


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
    constructor({ position, image, id, name, name2, trosition }) {
        this.position = position;
        this.width = trashWidth;
        this.height = trashHeight;
        this.image = new Image();
        this.image.src = image;
        this.id = id;
        this.name = name;
        this.name2 = name2;
        this.trosition = trosition;
    }

    draw() {
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        c.font = "2vh Arial";
        c.textAlign = "center";
        c.fillText(this.name, this.position.x + trashWidth * 0.46, this.position.y + trashHeight * this.trosition);
        c.fillText(this.name2, this.position.x + trashWidth * 0.46, this.position.y + trashHeight * (this.trosition + 0.2));
    }
}

// Trash position
var trashes = [];
for (let i = 0; i < tImage.length; i++) {
    trashes.push(
        new Trash({
            position: {
                x: trashX + i * trashSpace,
                y: trashY,
            },
            image: tImage[i],
            id: i,
            name: trext[i],
            name2: trext2[i],
            trosition: trosition[i],
        })
    );
}

//Background Image by Class
const backgroundImg = new Background({
    backgroundImg: bImg[Math.floor(Math.random() * bImg.length)],
});

//sound
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

const detectSound = new sound("./sounds/soundeffect.wav");
const victorySound = new sound("./sounds/victoryornot.wav");
const defeatSound = new sound("./sounds/deftsound.wav");
var cal = canvas.width - 45;
let garbages = [];
let garbage;
let idx;
let trmove = 0;
let tlmove = 0;

arrowR.style.left = widthcent + canvas.width - 40 + "px";
arrowR.style.top = heicent + canvas.height - 80 + "px";
arrowL.style.left = widthcent + 2 + "px";
arrowL.style.top = heicent + canvas.height - 80 + "px";

buttonEl.style.left = widthcent + 10 + "px";
buttonEl.style.top = heicent + 10 + "px";

backButtonEl.style.left = widthcent + 10 + "px";
backButtonEl.style.top = heicent + 10 + "px";

document.body.addEventListener('touchstart', e => {
    arrowL.addEventListener("touchstart", keyMoveR);
    arrowR.addEventListener("touchstart", keyMoveL);
    arrowL.removeEventListener("click", keyMoveR);
    arrowR.removeEventListener("click", keyMoveL);
    // if (e.targetTouches.length >= 2) {

    // }
})

arrowL.addEventListener("click", keyMoveR);
arrowR.addEventListener("click", keyMoveL);


document.addEventListener("keydown", function (e) {
    if (e.key == "A" || e.key == "a" || e.key == "ArrowLeft") {
        keyMoveR();
    }
    if (e.key == "D" || e.key == "d" || e.key == "ArrowRight") {
        keyMoveL();
    }
    if (e.key == "Escape") {
        if (pause && !game) {
            paused();
        } else if (!game) {
            resumed(); d
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
        let id = Math.floor(Math.random() * garbageImg.length);
        let image =
            garbageImg[id][Math.floor(Math.random() * garbageImg[id].length)];
        if (timer == 82) {
            id = 1;
            image = cardon;
        }
        garbage = new Garbage({ x, y, velocity, image, id });
        garbages.push(garbage);
        timer++;
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
        c.font = "bold 2.5vh Arial";
        c.textAlign = "end";
        c.fillText(scoreCount, canvas.width - 10, 35);
        scoreMine();
        if (timer > timeq) {
            gravity += 0.2;
            timeq += 20;
        }
    }
}

animate();

function menu() {
    if (game) {
        pause = false;
        game = true;
        pauseEl.style.display = "none";
        defeatEl.style.display = "none";
        victoryEL.style.display = "none";
        menuEl.style.display = "flex";
        score.style.display = "none";
        arrowL.style.display = "none";
        arrowR.style.display = "none";
        buttonEl.style.display = "none";
        canvas.style.opacity = '0%';
    }
}

window.addEventListener("focus", () => {
    if (game) {
        menu2();
    } else {
        resumed();
    }
});

window.addEventListener("blur", () => {
    if (game) {
        menu2();
    } else {
        paused();
    }
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
                    trashes.splice(0, 0, trashes[5]);
                    trashes.splice(6, 1);
                    trashes[0].position.x -= trashSpace * trashes.length;
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
                    trashes[5].position.x.toFixed(2) ==
                    (trashX + trashSpace * 4).toFixed(2)
                ) {
                    trashes.splice(7, 0, trashes[0]);
                    trashes.splice(0, 1);
                    trashes[5].position.x += trashSpace * 6;
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
function victory() {
    pause = false;
    victoryEL.style.display = "flex"
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
                        detectSound.play();
                        scoreCount += 20;
                    } else {
                        if (garbages[index] == garbages[idx]) {
                            drag = false;
                        }
                        garbage.detectr();
                        scoreCount -= 20;
                        detectSound.play();
                    }
                }, 0);
            }
        }
    });
}

function scoreMine() {
    garbages.forEach((garbage, index) => {
        if (garbage.y >= canvas.height) {
            if (garbages[index] == garbages[idx]) {
                drag = false;
            }
            garbage.detectr();
            scoreCount -= 25;
        }
    });
    if (scoreCount <= 0) {
        defeated();
        scoreCount = 0;
        defeatSound.play();
    }
    if (scoreCount >= 5000) {
        victory();
        victorySound.play();
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
    gravity = 0.3;
    trashes = [];
    for (let i = 0; i < tImage.length; i++) {
        trashes.push(
            new Trash({
                position: {
                    x: trashX + i * trashSpace,
                    y: trashY,
                },
                image: tImage[i],
                id: i,
                name: trext[i],
                name2: trext2[i],
                trosition: trosition[i],
            })
        );
    }
    if (!game) {
        resumed();
    }
}
menu();