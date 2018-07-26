class PlayerShip {
    constructor(image, x, y, a = 0, xv = 0, yv = 0, av = 0) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.xv = xv;
        this.yv = yv;
        this.a = a;
        this.av = av;

        //image properies
        this.imageHeight = 75;
        this.imageWidth = 98;
        this.offsetX = 211;
        this.offSetY = 941;
    }

    draw(viewPort) {
        var angleInRadians = this.a * (Math.PI / 180);

        viewPort.context.translate(this.x, this.y);
        viewPort.context.rotate(angleInRadians);
        viewPort.context.drawImage(this.image,
            this.offsetX, this.offSetY,
            this.imageWidth, this.imageHeight,
            -this.imageWidth / 2, -this.imageHeight / 2,
            this.imageWidth, this.imageHeight);
        viewPort.context.rotate(-angleInRadians);
        viewPort.context.translate(-this.x, -this.y);
    }
}

export default PlayerShip;