
const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

var stop = false;

canvas.width = 420;
canvas.height = 670;

canvas.style.width = "420px";
canvas.style.height = "670px";

let widthcent = (window.innerWidth - canvas.width) / 2
let heicent = (window.innerHeight - canvas.height) / 2

canvas.style.marginTop = heicent + 'px'
let drag;
let trag;
const gravity = 1;
var grd = c.createLinearGradient(0, 0, canvas.width, canvas.height);

// grd.addColorStop(0,"rgb(47, 108, 165)");
// grd.addColorStop(1,"black");
// Fill with gradient
c.fillStyle = "white";

c.fillRect(0, 0, canvas.width, canvas.height);

//TrashCan classes
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
  constructor({ x, y, color}) {
    this.x = x;
    this.y = y;
    // this.velocity = velocity;
    this.width = 40;
    this.height = 40;
    this.color = color ;
  }
  draw() {
    c.fillRect(this.x, this.y, this.width, this.height);
    c.fillStyle = this.color;
  }
  update() {
    this.draw();
    this.y += gravity;
    

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

let garbage;

function movingGarbage(garbage) {
    setInterval(function () {

        const x = Math.floor(Math.random() * cal)
        const y = -80
        const color = 'blue';
        const velocity = {
            x: 0,
            y: 1
        }
        garbage = new Garbage({x, y, color})
        garbages.push(garbage)
        // console.log(garbages)

    }, 2000)
}
canvas.addEventListener("mousedown", function (event) {
  l
  if (
    garbage.x <= event.clientX - widthcent &&
    garbage.x + garbage.width >= event.clientX - widthcent &&
    garbage.y <= event.clientY - heicent &&
    garbage.y + garbage.height >= event.clientY - heicent
  ) {
    garbages.forEach(drag => {
      drag = true;
      console.log(drag)
    })
    
  }
});
canvas.addEventListener("mouseup", function (event) {
  drag = false;
});
canvas.addEventListener("mouseout", function (event) {
  drag = false;
});
canvas.addEventListener("mousemove", function (event) {
  if (drag) {
    garbage.x = event.clientX - widthcent - garbage.width / 2;
    garbage.y = event.clientY - heicent - garbage.height / 2;
  }
});
canvas.addEventListener('touchstart', e => {
  ;[...e.changedTouches].forEach(touch => {
    if (garbage.x <= `${touch.pageX}` - widthcent &&
      garbage.x + garbage.width >= `${touch.pageX}` - widthcent &&
      garbage.y <= `${touch.pageY}` - heicent &&
      garbage.y + garbage.height >= `${touch.pageY}` - heicent) {
        trag = true
    }
  })
})
canvas.addEventListener('touchend', e => {
  trag = false
})
canvas.addEventListener('touchmove', e => {
  if (trag) {
    ;[...e.changedTouches].forEach(touch => {
      garbage.x = `${touch.pageX}` - widthcent - garbage.width / 2
      garbage.y = `${touch.pageY}` - heicent - garbage.height / 2
    })
  }

})


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

 
  
  garbages.forEach(garbage => {
    garbage.update()

  })
  drawer();
  
}
animate();

movingGarbage()


