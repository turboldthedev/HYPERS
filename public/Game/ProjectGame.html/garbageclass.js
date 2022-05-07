//Types of garbages
const garbageImg = [];

garbageImg[0] = [
    "./img/Medical/medical1.png",
    "./img/Medical/medical2.png",
    "./img/Medical/medical4.png",
    "./img/Medical/medical5.png",
];

garbageImg[1] = [
    "./img/Glass/greenGlass.png",
    "./img/Glass/brokenCodka.png",
    "./img/Glass/brokenGlass.png",
    "./img/Glass/codka.png",
    "./img/Glass/vineGlass.png",
];

garbageImg[2] = [
    "./img/Metal/bigCan.png",
    "./img/Metal/blueCan.png",
    "./img/Metal/can.png",
];

garbageImg[3] = [
    "./img/Plastic/plastic1.png",
    "./img/Plastic/plastic2.png",
    "./img/Plastic/plastic3.png",
    "./img/Plastic/plastic4.png",
];

garbageImg[4] = [
    "./img/paper/cardon.png",
    "./img/paper/eggBox.png",
    "./img/paper/newsPaper.png",
    "./img/paper/paperBag.png",
    "./img/paper/pizzaPack.png",
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