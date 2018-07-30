import SpritePalette from "./spritePalette";

class Asteroid {
    constructor(image, x, y, a = 0, xv = 0, yv = 0, av = 0, mass = null, color = null) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.xv = xv;
        this.yv = yv;
        this.a = a;
        this.av = av;
        this.mass = mass || (Math.floor(Math.random() * 10) + 1);
        this.color = color || Math.random() > 0.7 ? "gray" : "brown";
        this.spriteInfo = this.color === "brown" ?
            new SpritePalette().brownAsteroids[10 - this.mass] :
            new SpritePalette().grayAsteroids[10 - this.mass];
    }
}

export default Asteroid;