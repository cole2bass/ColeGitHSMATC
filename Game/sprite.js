
var rocket;
var background;
var enemyRocket;
var mHeight;

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
        new Sprite(img, 0, 30, 53, 30),
        new Sprite(img, 56, 30, 53, 26),
        new Sprite(img, 110, 30, 53, 26)
    ];

    enemyRocket.width = enemyRocket[0].width;
    enemyRocket.height = enemyRocket[0].height;
    mHeight = enemyRocket.height;

    background = new Sprite(img, 165, 0, 300, 319);
}