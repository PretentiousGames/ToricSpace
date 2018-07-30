import SpriteInfo from "./spriteInfo";

class SpritePalette {
    constructor() {
        this.player = new SpriteInfo(98, 75, 211, 941);
        this.brownAsteroids = [
            new SpriteInfo(118, 96, 1, 521),
            new SpriteInfo(99, 82, 225, 665),
            new SpriteInfo(96, 94, 328, 453),
            new SpriteInfo(87, 80, 519, 811),
            new SpriteInfo(43, 38, 238, 453),
            new SpriteInfo(41, 40, 652, 449),
            new SpriteInfo(26, 26, 407, 235),
            new SpriteInfo(27, 24, 779, 588),
            new SpriteInfo(16, 16, 365, 815),
            new SpriteInfo(14, 13, 400, 815),
        ];
        this.grayAsteroids = [
            new SpriteInfo(118, 96, 1, 619),
            new SpriteInfo(99, 82, 225, 749),
            new SpriteInfo(96, 94, 328, 549),
            new SpriteInfo(87, 80, 519, 729),
            new SpriteInfo(43, 38, 283, 453),
            new SpriteInfo(41, 40, 675, 221),
            new SpriteInfo(26, 26, 407, 263),
            new SpriteInfo(27, 24, 397, 414),
            new SpriteInfo(16, 16, 365, 815),
            new SpriteInfo(14, 13, 603, 647),
        ];
        this.fire = new SpriteInfo(13, 31, 835, 365);
        this.shield = new SpriteInfo(133, 106, 0, 413);
        this.laser = new SpriteInfo(9, 54, 856, 421);
    }
}

export default SpritePalette;