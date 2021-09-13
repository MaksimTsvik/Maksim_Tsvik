const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

const cvs = document.querySelector(".game_canvas");
cvs.height = 0.7*vh;
cvs.width = cvs.height/1.85; 
const ctx = cvs.getContext("2d");

// load images
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "./assets/images/bird.png";
bg.src = "./assets/images/bg.png";
fg.src = "./assets/images/fg.png";
pipeNorth.src = "./assets/images/pipeNorth.png";
pipeSouth.src = "./assets/images/pipeSouth.png";

// some variables
const gap = cvs.width/3;
let flag = false;
let constant;

let bX = 10;
let bY = 150;

const gravity = 1;

let score = 0;

// audio files

const fly = new Audio();
const scor = new Audio();
fly.src = "./assets/sounds/fly.mp3";
scor.src = "./assets/sounds/score.mp3";

// on key down or touch pressed

document.addEventListener("mousedown", moveUp);
document.addEventListener("mouseup", moveD);
document.addEventListener("touchstart", moveUp);
document.addEventListener("touchend", moveD);

function moveUp() {
  flag = true;
}
function moveD() {
  flag = false;
}

// pipe coordinates

let pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0
};

// draw images

function draw() {

  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {

    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }

    // detect collision

    if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
      location.reload(); // reload the page
    }

    if (pipe[i].x == 5) {
      score++;
      scor.play();
    }


  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);

  ctx.drawImage(bird, bX, bY);
  if (flag) { bY -= 2; }
  else { bY += gravity; }


  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);

}

draw();