class AddOnDrawer {
    draw(item, viewPort, image) {
        viewPort.context.drawImage(image,
            item.spriteInfo.offsetX, item.spriteInfo.offsetY,
            item.spriteInfo.imageWidth, item.spriteInfo.imageHeight,
            item.offsetX, item.offsetY,
            item.spriteInfo.imageWidth, item.spriteInfo.imageHeight);
    }
}

export default AddOnDrawer;