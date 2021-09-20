// window.addEventListener("load", function () {
//     const loader = document.querySelector(".loader");
//     loader.className += " hidden"; // class "loader hidden"
// });

// SELECT CVS
const cvs = document.getElementById("submarine");
const ctx = cvs.getContext("2d");

// GAME VARS
let frames = 0;
const DEGREE = Math.PI / 180;

// LOAD SPRITE IMAGE
const sprite = new Image();
sprite.src = "img/subSprite2.png";

// LOAD SOUNDS
const MUSIC = new Audio();
MUSIC.src = "audio/subgame.mp3"
MUSIC.loop = true;
MUSIC.volume = 0.4;

ACT = new Audio();
ACT.src = "audio/rememberWinter.ogg"
ACT.loop = true;
ACT.volume = 0.8;

const SCORE_S = new Audio();
SCORE_S.src = "audio/coin.wav";

const SWIM = new Audio();
SWIM.src = "audio/bubbles.mp3";
SWIM.volume = 0.2;

const HIT = new Audio();
HIT.src = "audio/atari_boom6.wav";

const GO = new Audio();
GO.src = "audio/sfx_swooshing.wav";

const DIE = new Audio();
DIE.src = "audio/atari_boom2.wav";

// GAME STATE
const state = {
    current: 0,
    getReady: 0,
    game: 1,
    over: 2
}

// START BUTTON COORD - at the moment it is a constrain
const startBtn = {
    x: 120,
    y: 263,
    w: 83,
    h: 29
}

// CONTROL THE GAME
cvs.addEventListener("click", action);
cvs.addEventListener("touch", action);
function action(e) {
    switch (state.current) {
        case state.getReady:
            state.current = state.game;
            GO.play();
            break;
        case state.game:
            if (submarine.cY - submarine.radius <= 0) return;
            submarine.goUp();
            SWIM.play();
            break;
        case state.over:
            //get coord of a click
            let rect = cvs.getBoundingClientRect();
            let clickX = e.clientX - rect.left;
            let clickY = e.clientY - rect.top;

            // start button click inspection
            if (clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h) {
                pMines.reset();
                submarine.speedReset();
                score.reset();
                state.current = state.getReady;
            }
            break;
    }
}

// Create each drawing figure as an object with:
//sX - source img X coord from sprite
//sY - source img Y coord from sprite
// sW, sH -source img dimensions from sprite
// cX, cY -canvas destination coords
//cW, cH -canvas dimensions
// draw - method to draw that figure
// BACKGROUND
const bg = {
    sX: 0,
    sY: 262,
    sW: 726,
    sH: 1069,
    cX: 0,
    cY: 0,
    cW: cvs.width,
    cH: cvs.height,

    draw: function () {
        ctx.drawImage(sprite, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
    }
}

// FLOOR
const floor = {
    sX: 5,
    sY: 0,
    sW: 1015,
    sH: 250,
    cX: 0,
    cY: cvs.height - 112,
    cW: cvs.width,
    cH: 112,
    // add dx - 2px img move
    dx: 2,

    draw: function () {
        ctx.drawImage(sprite, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
        // add 2nd same size img to emulate mvmnt
        ctx.drawImage(sprite, this.sX, this.sY, this.sW, this.sH, this.cX + this.cW, this.cY, this.cW, this.cH);
    },
    // update coords in game state
    update: function () {
        if (state.current == state.game) {
            this.cX = (this.cX - this.dx) % (this.cW);
        }
    }
}

// submarine
const submarine = {
    //add animation property - where located frames
    animation: [
        { sX: 731, sY: 264 },
        { sX: 731, sY: 424 },
        { sX: 731, sY: 584 },
        { sX: 731, sY: 424 },
    ],
    sW: 292,
    sH: 158,
    cX: 50,
    cY: 150,
    cW: 34,
    cH: 34,
    //set up radius - dimensins for collision
    radius: 12,
    //frame of animation storage
    frame: 0,
    //add vars of draw
    gravity: 0.1,
    jump: 2,
    speed: 0,
    rotation: 0,

    draw: function () {
        let submarine = this.animation[this.frame];

        ctx.save();
        ctx.translate(this.cX, this.cY);
        ctx.rotate(this.rotation);
        ctx.drawImage(sprite, submarine.sX, submarine.sY, this.sW, this.sH, - this.cW / 2, - this.cH / 2, this.cW, this.cH);

        ctx.restore();
    },
    // add movement function
    goUp: function () {
        this.speed = - this.jump;
    },

    update: function () {
        // lower frames speed in get ready state
        this.period = state.current == state.getReady ? 10 : 5;
        // frame calculation
        this.frame += frames % this.period == 0 ? 1 : 0;
        // frame on dependance of frames qty
        this.frame = this.frame % this.animation.length;

        if (state.current == state.getReady) {
            this.cY = 150; // reset the position
            this.rotation = 0 * DEGREE;
        } else {
            //update location
            this.speed += this.gravity;
            this.cY += this.speed;
            //floor hit inspection
            if (this.cY + this.cH / 2 >= cvs.height - floor.cH) {
                this.cY = cvs.height - floor.cH - this.cH / 2;
                if (state.current == state.game) {
                    state.current = state.over;
                    DIE.play();
                }
            }

            // change rotation in case of speed value
            if (this.speed >= this.jump) {
                this.rotation = 90 * DEGREE;
                this.frame = 1;
            } else {
                this.rotation = -25 * DEGREE;
            }
        }

    },
    //new game speed =0
    speedReset: function () {
        this.speed = 0;
    }
}

// get ready msg obj
const getReady = {
    sX: 0,
    sY: 1330,
    sW: 171,
    sH: 152,
    cX: cvs.width / 2 - 173 / 2,
    cY: 80,
    cW: 173,
    cH: 152,

    draw: function () {
        if (state.current == state.getReady) {
            ctx.drawImage(sprite, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
        }
    }

}

// game over msg obj
const gameOver = {
    sX: 175,
    sY: 1330,
    sW: 225,
    sH: 202,
    cX: cvs.width / 2 - 225 / 2,
    cY: 90,
    cW: 225,
    cH: 202,

    draw: function () {
        if (state.current == state.over) {
            ctx.drawImage(sprite, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH);
        }
    }
}

// pMines - obstacles , equal to pipes in flappy bird
const pMines = {
    position: [],

    top: {
        sX: 727,
        sY: 741
    },
    bottom: {
        sX: 778,
        sY: 741
    },

    sW: 50,
    sH: 226,
    cW: 53,
    cH: 400,

    gap: 85,
    maxYPos: -150,
    dx: 2,

    draw: function () {
        //draw each pMine
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            let topYPos = p.cY;
            let bottomYPos = p.cY + this.cH + this.gap;
            // top pipe
            ctx.drawImage(sprite, this.top.sX, this.top.sY, this.sW, this.sH, p.cX, topYPos, this.cW, this.cH);
            // bottom pipe
            ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.sW, this.sH, p.cX, bottomYPos, this.cW, this.cH);
        }
    },

    update: function () {
        if (state.current !== state.game) return;
        //create obstacle 
        if (frames % 100 == 0) {
            this.position.push({
                //each pMine is out from canvas
                cX: cvs.width,
                //randomizer for Y pos of top pMine
                cY: this.maxYPos * (Math.random() + 1)
            });
        }
        for (let i = 0; i < this.position.length; i++) {
            let p = this.position[i];
            let bottomPipeYPos = p.cY + this.cH + this.gap;

            // collision detection
            // top
            if (submarine.cX + submarine.radius > p.cX && submarine.cX - submarine.radius < p.cX + this.cW && submarine.cY + submarine.radius > p.cY && submarine.cY - submarine.radius < p.cY + this.cH) {
                state.current = state.over;
                HIT.play();
            }
            // bottom
            if (submarine.cX + submarine.radius > p.cX && submarine.cX - submarine.radius < p.cX + this.cW && submarine.cY + submarine.radius > bottomPipeYPos && submarine.cY - submarine.radius < bottomPipeYPos + this.cH) {
                state.current = state.over;
                HIT.play();
            }

            // move pMine to the left each frame
            p.cX -= this.dx;

            // if the pMines go beyond canvas, we delete them from the array
            if (p.cX + this.cW <= 0) {
                this.position.shift();
                score.value += 1;
                SCORE_S.play();
                //score update in local storage
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
        }
    },
    //reset pMines ech start
    reset: function () {
        this.position = [];
    }
}

// score
const score = {
    best: parseInt(localStorage.getItem("best")) || 0,
    value: 0,

    draw: function () {
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";

        if (state.current == state.game) {
            ctx.lineWidth = 2;
            ctx.font = "35px Teko";
            ctx.fillText(this.value, cvs.width / 2, 50);
            ctx.strokeText(this.value, cvs.width / 2, 50);

        } else if (state.current == state.over) {
            // current value
            ctx.font = "25px Teko";
            ctx.fillText(this.value, 225, 186);
            ctx.strokeText(this.value, 225, 186);
            // best
            ctx.fillText(this.best, 225, 228);
            ctx.strokeText(this.best, 225, 228);
            //draw medal
            if (this.value > this.best) {
                ctx.save();
                ctx.fillStyle = 'gold';
                ctx.beginPath();
                ctx.arc(gameOver.cX + 47, gameOver.cY + gameOver.cH / 2 + 7, 20, 0, 360, false)
                ctx.fill();
                ctx.restore();
            }
        }
    },

    reset: function () {
        this.value = 0;
    }
}

// main draw function
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    bg.draw();
    pMines.draw();
    floor.draw();
    submarine.draw();
    getReady.draw();
    gameOver.draw();
    score.draw();
}

// update positions function
function update() {
    submarine.update();
    floor.update();
    pMines.update();
}

// main loop
function loop() {
    update();
    draw();
    frames++;
    switch (state.current) {
        case 0:
            MUSIC.play();
            ACT.pause();
            break;
        case 1:
            MUSIC.pause();
            ACT.play();
            break;
    }
    requestAnimationFrame(loop);
}
loop();