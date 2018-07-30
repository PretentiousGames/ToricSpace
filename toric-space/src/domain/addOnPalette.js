import AddOn from "./addOn";
import SpritePalette from "./spritePalette";

class AddOnPalette {
    constructor() {
        var sprites = new SpritePalette();
        this.accelerationFire = new AddOn(sprites.fire, -6, 35);
        this.rightRotateFire = new AddOn(sprites.fire, -49, 25);
        this.leftRotateFire = new AddOn(sprites.fire, 37, 25);
        this.shield = new AddOn(sprites.shield, -66, -53);
    }
}

export default AddOnPalette;