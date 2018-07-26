class Background {
    constructor(image) {
        this.image = image;
    }

    draw(viewPort) {
        var vHeight = viewPort.height;
        var vWidth = viewPort.width;
        var iHeight = this.image.height;
        var iWidth = this.image.width;

        var x = ((-viewPort.x % iWidth) - iWidth) % iWidth;
        var y = ((-viewPort.y % iHeight) - iHeight) % iHeight;

        var cx = x;
        var cy = y;
        while (cy < vHeight) {
            while (cx < vWidth) {
                viewPort.context.drawImage(this.image, cx, cy);
                cx += iWidth;            
            }
            cx = x;
            cy += iHeight;    
        }
    }
}

export default Background;