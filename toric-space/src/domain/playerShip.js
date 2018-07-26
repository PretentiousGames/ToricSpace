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
}

export default PlayerShip;