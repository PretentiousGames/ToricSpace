import SpritePalette from "./spritePalette";

class Laser {
    constructor(image, x, y, a = 0, xv = 0, yv = 0, av = 0, mass = null, color = null) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.xv = xv;
        this.yv = yv;
        this.a = a;
        this.av = av;
        this.mass = 0;
        this.color = "blue";
        this.spriteInfo = new SpritePalette().laser;
    }
}

export default Laser;