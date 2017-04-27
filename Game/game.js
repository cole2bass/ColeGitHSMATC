
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
var missiles;

function Rocket(){
    this.x = 50;
    this.y = 200;
    this.width = 69;
    this.height = 30;

    this.frame = 0;
    this.animation = [0,1,2,1];

    this.rotation = 0;
    this.radius = 15;
    this.moveUp = false;
    this.moveDown = false;

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
        if (this.moveUp) {
            this.y -= 5;
        }
        if (this.moveDown) {
            this.y += 5;
        }
        if (this.y + this.height >= height) {
            currentState = states.Score;
        }
    }

    this.movePlayer = function (keyCode) {
        //if key is up key move up (-y)
        //if key is down key move down (y)
        if (keyCode === 38) {
            this.moveUp = true;
        }
        if (keyCode === 40) {
            this.moveDown = true;
        }
    }

    this.moveTouch = function (evt) {

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

function MissileGroup() {
    this.missleArr = [];

    this.add = function (missile) {
        this.missleArr.push(missile);
    }

    this.stackAdd = function () {
        var spawnY = 0
        var missileHoleCount = 3;
        var missileMakeHole = false;
        var mCount = 0;
        var count = 0;
        var randomCount = 0;
        var randomSet = false;
        var holeMade = false;
        while (spawnY < height) {
            var missile = new Missile(spawnY);
            if (missileMakeHole) {
                if (missileHoleCount === mCount) {
                    missileMakeHole = false;
                }
                spawnY += missile.height;
                mCount;
                count++;
                continue;
            }
            this.add(missile);
            spawnY += missile.height;
            if (!randomSet) {
                randomCount = Math.floor(Math.random() * (height / missile.height));
                randomSet = true;
            }
            if (!holeMade && count === randomCount) {
                missileMakeHole = true;
                count++;
                continue;
            }
            count ++;
        }
    }

    this.reset = function () {
        this.missleArr = [];
    }

    this.update = function () {
        if (frames % 150 === 0) {
            this.stackAdd();
        }

        for (var i = 0, len = this.missleArr.length; i < len; i++) {
            var missile = this.missleArr[i];

            if (i === 0) {
                missile.detectCollision();
            }

            missile.update();

            missile.x -= 2;
            if (missile.x < -missile.width) {
                this.missleArr.splice(i,1);
                i --;
                len --;
            }
        }
    }

    this.draw = function () {
        for (var i = 0; i < this.missleArr.length; i ++) {
            var missile = this.missleArr[i];
            missile.draw();
        }
    }

}

function Missile(y) {
    this.x = width;
    this.y = y;
    this.width = enemyRocket.width;
    this.height = enemyRocket.height;
    this.frame = 0;
    this.animation = [0,1,2,1];

    this.update = function () {
        var r = 5;
        this.frame += frames % r === 0 ? 1 : 0;
        this.frame %= this.animation.length;
    }

    this.draw = function () {
        var d = this.animation[this.frame];
        enemyRocket[d].draw(renderingContext, this.x, this.y);
    }

    this.detectCollision = function () {


        function isWithinRange() {

        }

        function passed() {

        }
    }

}

function main() {
    windowSetup();
    canvasSetup();
    currentState = states.Splash;
    $("#canvasBox").append(canvas);
    // document.body.appendChild(canvas);
    playerRocket = new Rocket();
    missiles = new MissileGroup();
    loadGraphics();
}

function windowSetup() {
    var windowWidth = $(window).width();
    console.log(windowWidth);
    if (windowWidth < 768) {
        width = 320;
        height = 430;
        $("#startText").text("Touch to Start");
        if (windowWidth < 667) {
            width = windowWidth;
            height = 475;
        }
        inputType = "touch";
    }
    else {
        width = Math.floor(($(window).width())*0.75);
        height = 430;
        inputType = "keys"
    }
    $("#canvasBox").css("width", ""+Math.floor(width));
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
        addEventListener("touchstart", touchStart);
        addEventListener("touchmove", move);
    }
    else if (inputType === "keys") {
        addEventListener("mousedown", clickedMouse);
        addEventListener("keydown", move);
        addEventListener("keyup", release)
    }
    // switch (width) {
    //
    // }
}

function move(evt) {
    if (evt.type === "keydown") {
        playerRocket.movePlayer(evt.keyCode);
    }
    else if (evt.type == "touchmove") {
        console.log(evt);
    }
}

function release(evt) {
    if (evt.keyCode === 38) {
        playerRocket.moveUp = false;
    }
    if (evt.keyCode === 40) {
        playerRocket.moveDown = false;
    }
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
        missiles.update();
    }
    playerRocket.update();
}

function render() {
    renderingContext.fillRect(0,0,width,height);
    drawBackground(renderingContext);
    if (currentState == states.Game) {
        missiles.draw();
    }
    playerRocket.drawRocket(renderingContext);
}

function drawBackground(renderingContext) {
    renderingContext.save();

    renderingContext.scale(5, 1.4);
    background.draw(renderingContext, 0,0);

    renderingContext.restore();
}