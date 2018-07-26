class ItemDrawer {
    draw(item, viewPort, gameHeight, gameWidth) {
        var angleInRadians = item.a * (Math.PI / 180);
        var biggestSize = Math.max(item.imageWidth, item.imageHeight);
        var viewPortLeft = viewPort.x - biggestSize;
        var viewPortRight = viewPort.x + viewPort.width + biggestSize;
        var viewPortTop = viewPort.y - biggestSize;
        var viewPortBottom = viewPort.y + viewPort.height + biggestSize;

        while (item.x < viewPortLeft) { item.x += gameWidth; }
        while (item.x > viewPortRight) { item.x -= gameWidth; }
        while (item.y < viewPortTop) { item.y += gameHeight; }
        while (item.y > viewPortBottom) { item.y -= gameHeight; }

        if (item.x > viewPortLeft && item.x < viewPortRight &&
            item.y > viewPortTop && item.y < viewPortBottom) {
            var xt = (item.x - viewPort.x);
            var yt = (item.y - viewPort.y);
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
    }
}

export default ItemDrawer;