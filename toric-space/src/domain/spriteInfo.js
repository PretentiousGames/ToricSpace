class SpriteInfo {
    constructor(imageWidth, imageHeight, offsetX, offsetY) {
        this.imageHeight = imageHeight;
        this.imageWidth = imageWidth;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.maxSize = Math.max(imageWidth, imageHeight);
        this.minSize = Math.min(imageWidth, imageHeight);
    }
}

export default SpriteInfo;