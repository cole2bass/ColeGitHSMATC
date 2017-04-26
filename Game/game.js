
var currentState;
var states = {
    Splash: 0,
    Game: 1,
    Score: 2
};
var canvas, width, height;
var renderingContext;
var playerRocket;
var frames = 0;
var inputType = "";

function Rocket(){
    this.x = 50;
    this.y = 200;
    this.width = 69;
    this.height = 30;

    this.frame = 0;
    this.animation = [0,1,2,1];

    this.rotation = 0;
    this.radius = 15;

    this.update = function() {
        var h = currentState === states.Splash ? 10: 5;
        this.frame += frames % h === 0 ? 1: 0;
        this.frame %= this.animation.length;

        if (currentState == states.Splash) {
            this.updateIdleRocket();
        }
        else if (currentState == states.Game){
            this.updateGameRocket();
        }
    }

    this.updateIdleRocket  = function () {
        this.y = 200;
    }

    this.updateGameRocket = function () {

    }

    this.movePlayer = function (key) {
        //if key is up key move up (-y)
        //if key is down key move down (y)
    }

    this.drawRocket = function (renderingContext) {
        renderingContext.save();

        renderingContext.translate(this.x, this.y);
        renderingContext.rotate(this.rotation);

        var h = this.animation[this.frame];
        rocket[h].draw(renderingContext, 0, 0);

        renderingContext.restore();
    };

}

function Missle() {
    this.x = width;
    this.y = 0;
    this.width = enemyRocket.width;
    this.height = enemyRocket.height;
}

function main() {
    windowSetup();
    canvasSetup();
    currentState = states.Splash;
    $("#canvasBox").append(canvas);
    // document.body.appendChild(canvas);
    playerRocket = new Rocket();
    loadGraphics();
}

function windowSetup() {
    var windowWidth = $(window).width();
    console.log(windowWidth);
    if (windowWidth < 768) {
        width = 320;
        height = 430;
        if (windowWidth < 667) {
            width = 660;
            height = 375
        }
        inputType = "touch";
    }
    else {
        width = ($(window).width())*0.5;
        height = 430;
        inputType = "keys"
    }
    $("#canvasBox").css("width", ""+width);
    $("#canvasBox").css("height", ""+height);
}

function clickedMouse(evt) {
    if (currentState == states.Splash) {
        currentState = states.Game;
        $("#startText").css("display", "none");
    }
}

function touchStart(evt) {
    if (currentState == states.Splash) {
        currentState = states.Game;
        $("#startText").css("display", "none");
    }
}

function canvasSetup() {
    canvas = document.createElement("canvas");
    canvas.style.border = "3px solid black";
    canvas.width = width;
    canvas.height = height;
    renderingContext = canvas.getContext("2d");
    if (inputType === "touch") {
        addEventListener("touchStart", touchStart);
        // addEventListener("touchMove", move());
    }
    else if (inputType === "keys") {
        addEventListener("mousedown", clickedMouse);
        addEventListener("keydown", movePlayer())
    }
    // switch (width) {
    //
    // }
}

function loadGraphics() {
    var img = new Image();
    img.src = "RocketWarsSpriteSheet.png";
    img.onload = function() {
        initSprites(this);

        renderingContext.fillStyle = "#000000";

        background.draw(renderingContext,0,0);
        // rocket[0].draw(renderingContext,0,0);

        gameLoop()
    }
}

function gameLoop() {
    update();
    render();
    window.requestAnimationFrame(gameLoop);
}

function update() {
    frames ++;
    if (currentState == states.Game) {

    }
    playerRocket.update();
}

function render() {
    renderingContext.fillRect(0,0,width,height);
    drawBackground(renderingContext);
    playerRocket.drawRocket(renderingContext);
}

function drawBackground(renderingContext) {
    renderingContext.save();

    renderingContext.scale(2.6, 1.4);
    background.draw(renderingContext, 0,0);

    renderingContext.restore();
}