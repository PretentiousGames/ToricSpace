import SpritePalette from "./spritePalette";

var sp = new SpritePalette();
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
        this.color = color || (Math.random() > 0.7 ? "gray" : "brown");
        this.spriteInfo = this.color === "brown" ?
            sp.brownAsteroids[10 - this.mass] :
            sp.grayAsteroids[10 - this.mass];
        if (typeof this.spriteInfo === "undefined"){
            debugger;
        }
    }
}

export default Asteroid;