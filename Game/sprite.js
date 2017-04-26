
var rocket;
var background;
var enemyRocket;

function Sprite(img, x, y, width, height) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Sprite.prototype.draw = function (renderingContext, x, y) {
    renderingContext.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
}

function initSprites(img) {
    rocket = [
        new Sprite(img, 0, 0, 53, 26),
        new Sprite(img, 56, 0, 53, 26),
        new Sprite(img, 110, 0, 53, 26)
    ];

    enemyRocket = [
        new Sprite(img, 0, 30, 69, 30),
        new Sprite(img, 69, 30, 69, 26),
        new Sprite(img, 138, 30, 69, 26)
    ];

    background = new Sprite(img, 165, 0, 300, 319);
}