const size = 500; //setup tennis deck height
const racketHeight = size / 4;
const racketWidth = racketHeight / 6;

let leftScore = 0; //setup score
let rightScore = 0;
//get score
const score = document.querySelector('.score');
score.innerHTML = `LEFT ${leftScore} : ${rightScore} RIGHT`

//get tennis container
const tennis = document.querySelector('.tennis')
tennis.style.height = size + 'px'; //update tennis container size
tennis.style.width = 2 * size + 'px'; //update tennis container size

//get canvas element to setup it's dimensions
const canvasTennis = document.querySelector('.tennis-canvas');
canvasTennis.height = size;
canvasTennis.width = 2 * size;

//get start/stop button
const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');

//setup request animation function
let raf;

//get canvas context
const ctx = canvasTennis.getContext('2d');

//setup players field
function drawField() {
  ctx.save();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasTennis.width, canvasTennis.height);
  ctx.restore();
}
drawField();

//create randomizer of balls direction
let vxRandomizer = Math.random() >= 0.5 ? 1 : -1;
let vyRandomizer = Math.random() >= 0.5 ? 1 : -1;

//setup ball's specs
const ball = {
  x: size,
  y: size / 2,
  vx: 5 * vxRandomizer,
  vy: 3 * vyRandomizer,
  radius: size / 50,
  color: 'yellow',
  draw: function () {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
};
ball.draw(); //draw a ball

//setup rackets
const racketLeft = {
  x: 0,
  y: size / 2 - racketHeight / 2,
  color: "blue",
};
const racketRight = {
  x: canvasTennis.width - racketWidth,
  y: size / 2 - racketHeight / 2,
  color: "red",
}
function drawRacket(racket) {
  ctx.save();
  ctx.fillStyle = racket.color;
  ctx.fillRect(racket.x, racket.y, racketWidth, racketHeight);
  ctx.restore();
}
drawRacket(racketLeft);
drawRacket(racketRight);

startBtn.addEventListener('click', startPlay); //start game mvmnt
stopBtn.addEventListener('click', stopPlay); //stop and re-draw canvas into initial state;

//keypress function
function moveRacket(e) {
  e = e || window.event;
  switch (e.keyCode) {
    case 87:
      racketLeft.y -= racketWidth * 1.5;
      break;
    case 83:
      racketLeft.y += racketWidth * 1.5;
      break;
    case 38:
      racketRight.y -= racketWidth * 1.5;
      break;
    case 40:
      racketRight.y += racketWidth * 1.5;
      break;
  }
}

//start game function
function startPlay() {
  window.addEventListener('keydown', moveRacket);//add listener on key press
  //add limits for rackets mvments
  if (racketLeft.y < 0) { racketLeft.y = 0; };
  if (racketRight.y < 0) { racketRight.y = 0; };
  if (racketLeft.y > canvasTennis.height - racketHeight) { racketLeft.y = canvasTennis.height - racketHeight; }
  if (racketRight.y > canvasTennis.height - racketHeight) { racketRight.y = canvasTennis.height - racketHeight; }

  //setup reflection from walls
  if (ball.y > canvasTennis.height - ball.radius || ball.y < 0 + ball.radius) { ball.vy = -ball.vy };

  //GOAL inspection
  let hitRacketLeft = (ball.y >= racketLeft.y && ball.y <= racketLeft.y + racketHeight);
  let hitRacketRight = (ball.y >= racketRight.y && ball.y <= racketRight.y + racketHeight);


  if (ball.x <= racketLeft.x + racketWidth) { //left racket inspection
    if (hitRacketLeft) {
      ball.vx = -ball.vx * 1.2;
      ball.vy = ball.vy * 1.2;
    } else if (ball.x < 0) {
      stopPlay();
      rightScore++;
      score.innerHTML = `${leftScore} : ${rightScore}`
      return;
    }
  }
  if (ball.x >= racketRight.x) { //right racket inspection
    if (hitRacketRight) {
      ball.vx = -ball.vx * 1.2;
      ball.vy = ball.vy * 1.2;
    } else if (ball.x > racketRight.x + racketWidth) {
      stopPlay();
      leftScore++;
      score.innerHTML = `${leftScore} : ${rightScore}`
      return;
    }
  }

  //re-draw canvas
  ctx.clearRect(0, 0, canvasTennis.width, canvasTennis.height);
  drawField();
  ball.draw();
  drawRacket(racketLeft);
  drawRacket(racketRight);

  ball.x += ball.vx;
  ball.y += ball.vy;

  raf = window.requestAnimationFrame(startPlay);
}

//stop game function
function stopPlay() {
  window.cancelAnimationFrame(raf);
  console.error('GAME STOPPED');
  ball.x = size;
  ball.y = size / 2;
  vxRandomizer = Math.random() >= 0.5 ? 1 : -1;
  vyRandomizer = Math.random() >= 0.5 ? 1 : -1;
  ball.vx = 5 * vxRandomizer;
  ball.vy = 2 * vyRandomizer;
  racketRight.y = size / 2 - racketHeight / 2;
  racketLeft.y = size / 2 - racketHeight / 2;

  ctx.clearRect(0, 0, canvasTennis.width, canvasTennis.height);
  drawField();
  drawRacket(racketLeft);
  drawRacket(racketRight);
  ball.draw();
}