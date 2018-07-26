class Asteroid {
    constructor(image, x, y, a = 0, xv = 0, yv = 0, av = 0) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.xv = xv;
        this.yv = yv;
        this.a = a;
        this.av = av;

        //image properies
        this.imageHeight = 98;
        this.imageWidth = 120;
        this.offsetX = 0;
        this.offSetY = 520;
    }
}

export default Asteroid;