class ItemDrawer {
    draw(item, viewPort, gameHeight, gameWidth) {
        var angleInRadians = item.a * (Math.PI / 180);
        var biggestSize = Math.max(item.imageWidth, item.imageHeight);
        var iX = item.x;
        var iY = item.y;
        var vpX = viewPort.x;
        var vpY = viewPort.y;
        var vpW = viewPort.width;
        var vpH = viewPort.height;

        var vpL = vpX - biggestSize;
        var vpR = vpX + vpW + biggestSize;
        var vpT = vpY - biggestSize;
        var vpB = vpY + vpH + biggestSize;

        while (iX < vpL) { iX += gameWidth; }
        while (iX > vpR) { iX -= gameWidth; }
        while (iY < vpT) { iY += gameHeight; }
        while (iY > vpB) { iY -= gameHeight; }

        if (iX > vpL && iX < vpR &&
            iY > vpT && iY < vpB) {
            // visible;
            var xt = (iX - vpX);
            var yt = (iY - vpY);
            viewPort.context.translate(xt, yt);
            viewPort.context.rotate(angleInRadians);
            viewPort.context.drawImage(item.image,
                item.offsetX, item.offSetY,
                item.imageWidth, item.imageHeight,
                -item.imageWidth / 2, -item.imageHeight / 2,
                item.imageWidth, item.imageHeight);
            viewPort.context.rotate(-angleInRadians);
            viewPort.context.translate(-xt, -yt);
        }
        //        var x = ((iX % iWidth) - iWidth) % iWidth;
        //        var y = ((-viewPort.y % iHeight) - iHeight) % iHeight;
    }
}

export default ItemDrawer;