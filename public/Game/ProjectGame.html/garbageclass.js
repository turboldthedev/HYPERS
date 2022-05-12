//Types of garbages
const garbageImg = [];
garbageImg[0] = [
    "./img/Organic/organic0.png",
    "./img/Organic/organic1.png",
    "./img/Organic/organic2.png",
    "./img/Organic/organic3.png",
    "./img/Organic/organic4.png",
    "./img/Organic/organic5.png",
];

garbageImg[1] = [
    "./img/paper/paper0.png",
    "./img/paper/paper1.png",
    "./img/paper/paper2.png",
    "./img/paper/paper3.png",
    "./img/paper/paper4.png",
    "./img/paper/paper5.png",
    "./img/paper/paper6.png",
];

garbageImg[2] = [
    "./img/Plastic/plastic0.png",
    "./img/Plastic/plastic1.png",
    "./img/Plastic/plastic2.png",
    "./img/Plastic/plastic3.png",
    "./img/Plastic/plastic4.png",
];

garbageImg[3] = [
    "./img/Glass/glass0.png",
    "./img/Glass/glass1.png",
    "./img/Glass/glass2.png",
    "./img/Glass/glass3.png",
    "./img/Glass/glass4.png",
];

garbageImg[4] = [
    "./img/Metal/metal0.png",
    "./img/Metal/metal1.png",
    "./img/Metal/metal2.png",
    "./img/Metal/metal3.png",
    "./img/Metal/metal4.png",
];

garbageImg[5] = [
    "./img/NonRecyclable/electron0.png",
    "./img/NonRecyclable/electron1.png",
    "./img/NonRecyclable/electron2.png",
    "./img/NonRecyclable/electron3.png",
    "./img/NonRecyclable/electron4.png",
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


