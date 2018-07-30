import SpritePalette from "./spritePalette";
import AddOnPalette from "./addOnPalette";
import AddOnDrawer from "./addOnDrawer";

class PlayerShip {
    constructor(image, x, y, a = 0, xv = 0, yv = 0, av = 0) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.xv = xv;
        this.yv = yv;
        this.a = a;
        this.av = av;
        this.mass = 5;

        var sp = new SpritePalette();
        var ap = new AddOnPalette();
        this.spriteInfo = sp.player;
        this.state = 0;
        this.addOns = [ap.accelerationFire, ap.rightRotateFire, ap.leftRotateFire, ap.shield];
    }
    States = Object.freeze({accellerating:1, turningRight:2, turningLeft:4, shielding:8, })
    drawAddons = function(viewPort) {
        var addOnDrawer = new AddOnDrawer();
        if ((this.state & this.States.accellerating) === this.States.accellerating) {
            addOnDrawer.draw(this.addOns[0], viewPort, this.image);
        }
        if ((this.state & this.States.turningRight) === this.States.turningRight) {
            addOnDrawer.draw(this.addOns[1], viewPort, this.image);
        }
        if ((this.state & this.States.turningLeft) === this.States.turningLeft) {
            addOnDrawer.draw(this.addOns[2], viewPort, this.image);
        }
        if ((this.state & this.States.shielding) === this.States.shielding) {
            addOnDrawer.draw(this.addOns[3], viewPort, this.image);
        }
    }
}

export default PlayerShip;