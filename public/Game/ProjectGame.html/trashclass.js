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