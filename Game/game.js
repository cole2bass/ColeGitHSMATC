
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
var score = 0;
var difficulty = "Easy";

function Rocket(){
    this.x = 50;
    this.y = 200;
    this.rWidth = 69;
    this.rHeight = 30;

    this.frame = 0;
    this.animation = [0,1,2,1];

    this.rotation = 0;
    this.maxRot = 1.6;
    // this.angDrag = 0.89;
    this.radius = 15;
    this.moveUp = false;
    this.moveDown = false;

    this.update = function() {
        var h = currentState === states.Splash ? 10: 5;
        this.frame += frames % h === 0 ? 1: 0;
        this.frame %= this.animation.length;

        if (currentState === states.Splash) {
            this.updateIdleRocket();
        }
        else if (currentState === states.Game){
            this.updateGameRocket();
        }
    };

    this.updateIdleRocket  = function () {
        this.y = 200;
    };

    this.updateGameRocket = function () {
        if (this.moveUp) {
            this.y -= 5;
            this.rotation -= 0.02;
            if (this.rotation <= -this.maxRot) {
                this.rotation = this.maxRot;
            }
        }
        if (this.moveDown) {
            this.y += 5;
            this.rotation += 0.02;
            if (this.rotation >= this.maxRot) {
                this.rotation = -this.maxRot;
            }
        }
        this.rotation *= 0.94;

        if (this.y + this.rHeight >= height) {
            endGame();
        }
    };

    this.movePlayer = function (keyCode) {
        //if key is up key move up (-y)
        //if key is down key move down (y)
        if (keyCode === 38) {
            this.moveUp = true;
        }
        if (keyCode === 40) {
            this.moveDown = true;
        }
    };

    this.reset = function () {
        this.y = 200;
        this.frame = 0;
        this.rotation = 0;
        this.moveUp = false;
        this.moveDown = false;
    };

    // this.moveTouch = function (evt) {
    //
    // }

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
    this.stackX = [];
    this.stacks = [];
    this.stackScored = [];

    this.add = function (missile) {
        this.missleArr.push(missile);
    };

    this.stackAdd = function () {
        var spawnY = 0;
        var missileHoleCount = 3;
        if (difficulty === "Easy") {
            missileHoleCount = 3;
        }
        if (difficulty === "Medium") {
            missileHoleCount = 2;
        }
        if (difficulty === "Hard") {
            missileHoleCount = 1;
        }
        var missileMakeHole = false;
        var mCount = 0;
        var count = 0;
        var randomCount = 0;
        var randomSet = false;
        var holeMade = false;
        var newStack = [];
        while (spawnY < (height - (mHeight * 3))) {
            var missile = new Missile(spawnY);
            if (missileMakeHole) {
                if (missileHoleCount === mCount) {
                    missileMakeHole = false;
                }
                spawnY += missile.mHeight;
                mCount++;
                count++;
                continue;
            }
            newStack.push(missile);
            spawnY += missile.mHeight;
            if (!randomSet) {
                randomCount = Math.floor(Math.random() * ((height - (missile.mHeight * 3) ) / missile.mHeight));
                randomSet = true;
            }
            if (!holeMade && count === randomCount) {
                missileMakeHole = true;
                count++;
                continue;
            }
            count ++;
        }
        this.stacks.push(newStack);
        this.addStackX(missile.x + missile.mWidth);
        this.newScored(false);
    };

    this.addStackX = function(num) {
        this.stackX.push(num);
    };

    this.newScored = function (val) {
        this.stackScored.push(val);
    };

    this.reset = function () {
        this.stacks = [];
        this.stackScored = [];
        this.stackX = [];
    };

    this.update = function () {
        var delay = 0;
        switch (difficulty) {
            case "Easy":
                delay = 200;
                break;
            case "Medium":
                delay = 150;
                break;
            case "Hard":
                delay = 100;
                break;
        }
        if (frames % 150 === 0) {
            this.stackAdd();
        }

        for (var i = 0; i < this.stacks.length; i++) {
            for (var missile in this.stacks[i]) {
                if (i === 0) {
                    this.stacks[i][missile].detectCollision();
                }
                this.stacks[i][missile].x -= 2;
                this.stackX[i] = this.stacks[i][missile].x + this.stacks[i][missile].mWidth;
                this.stacks[i][missile].update();
            }


            if (currentState === states.Game) {
                if (playerRocket.x > this.stackX[i] && this.stackScored[i] == false) {
                    this.stackScored[i] = true;
                    updateScore(1);
                }
            }


            if (this.stackX[i] <= 0) {
                this.stackX.shift();
                this.stacks.shift();
                this.stackScored.shift();
                i--;
            }
        }

    };

    this.draw = function () {

        for (var i = 0; i < this.stacks.length; i++) {
            for (var j = 0; j < this.stacks[i].length; j++) {
                this.stacks[i][j].draw();
            }
        }
    }

}

function Missile(y) {
    this.x = width;
    this.y = y;
    this.mWidth = enemyRocket.width;
    this.mHeight = enemyRocket.height;
    this.frame = 0;
    this.animation = [0,1,2,1];

    this.update = function () {
        var r = 5;
        this.frame += frames % r === 0 ? 1 : 0;
        this.frame %= this.animation.length;
    };

    this.draw = function () {
        var d = this.animation[this.frame];
        enemyRocket[d].draw(renderingContext, this.x, this.y);
    };

    this.detectCollision = function () {

        if (isWithinRange(this.x, this.y, this.mWidth, this.mHeight)) {
            console.log("You are dead as a toadstool.");
            endGame();
        }

        function isWithinRange(x, y, width, height) {
            var xRange = false, yRange = false;

            if ((playerRocket.x + playerRocket.rWidth) >= x && playerRocket.x <= (x + width)) {
                xRange = true;
            }
            if ((playerRocket.y + playerRocket.rHeight) >= y && playerRocket.y <= (y + height)) {
                yRange = true;
            }

            return xRange && yRange;
        }

    }

}

function main() {
    windowSetup();
    canvasSetup();
    currentState = states.Splash;
    $("#canvasBox").append(canvas);
    getHighScore();
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
    if (currentState === states.Splash) {
        currentState = states.Game;
        $("#startText").css("display", "none");
    }
}

// function touchStart(evt) {
//     if (currentState === states.Splash) {
//         currentState = states.Game;
//         $("#startText").css("display", "none");
//     }
// }

function canvasSetup() {
    canvas = document.createElement("canvas");
    canvas.style.border = "3px solid black";
    canvas.width = width;
    canvas.height = height;
    renderingContext = canvas.getContext("2d");
    addEventListener("blur", function () {
       playerRocket.moveUp = false;
       playerRocket.moveDown = false;
    });
    // if (inputType === "touch") {
    //     canvas.addEventListener("touchstart", touchStart);
    //     addEventListener("touchmove", move);
    // }
    // else if (inputType === "keys") {
        canvas.addEventListener("mousedown", clickedMouse);
        addEventListener("keydown", move);
        addEventListener("keyup", release);
    // }
    // switch (width) {
    //
    // }
}

function move(evt) {
    if (evt.type === "keydown") {
        playerRocket.movePlayer(evt.keyCode);
    }
    else if (evt.type === "touchmove") {
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
    if (currentState === states.Splash) {
        $("#selectDifficulty").css("display", "block");
    }
    if (currentState !== states.Splash) {
        missiles.update();
        $("#selectDifficulty").css("display", "none");
    }
    playerRocket.update();
}

function render() {
    renderingContext.fillRect(0,0,width,height);
    drawBackground(renderingContext);
    if (currentState !== states.Splash) {
        missiles.draw();
    }
    if (currentState !== states.Score) {
        playerRocket.drawRocket(renderingContext);
    }
}

function drawBackground(renderingContext) {
    renderingContext.save();

    renderingContext.scale(5, 1.4);
    background.draw(renderingContext, 0,0);

    renderingContext.restore();
}

function endGame() {
    currentState = states.Score;
    $("#restartGame").css("display", "block");
}

function resetGame() {
    playerRocket.reset();
    missiles.reset();
    currentState = states.Splash;
    if (score > Number(localStorage.getItem("HighScore"))) {
        localStorage.setItem("HighScore", score);
    }
    document.getElementById("highScore").innerHTML = localStorage.getItem("HighScore");
    score = 0;
    document.getElementById("scoreText").innerHTML = "Score: " + score;
    document.getElementById("restartGame").style.display = "none";
}

function getHighScore() {
    if (localStorage.getItem("HighScore") !== undefined) {
        var high = Number(localStorage.getItem("HighScore"));
        document.getElementById("highScore").innerHTML = ""+high;
    }
}

function updateScore(points) {
    score += points;
    $("#scoreText").text("Score: "+score);
}

function changeDifficulty(value) {
    difficulty = value;
}