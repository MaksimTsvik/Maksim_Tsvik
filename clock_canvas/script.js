const size = 500; //setup main clock size in px 
const radius = size / 2 - size / 10; //setup radius where all numbers located
const numberSize = size / 10; //setup size of a numbers of clock in px
let angleStep = 30; //setup step between numbers in degrees

//get clock container
const clock = document.querySelector('.clock')
clock.style.height = size + 'px'; //update clocks container size
clock.style.width = size + 'px'; //update clocks container size

//get canvas element to setup it's dimensions
const canvasClock = document.querySelector('.clock-canvas');
canvasClock.height = size;
canvasClock.width = size;

//canvas re-draw function
function draw() {
  const ctx = canvasClock.getContext('2d'); //get canvas img
  ctx.save();
  ctx.clearRect(0, 0, size, size);

  // create clock circle
  ctx.fillStyle = 'rgba(104, 141, 198, 1)';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, 360, false)
  ctx.fill();

  //setup x and y coordinates of clock's center
  const clockCircleX = size / 2;
  const clockCircleY = size / 2;

  // add time scale at clock
  for (let i = 1; i < 13; i++) {
    ctx.save();

    //turn angle calc
    let angle = parseFloat(angleStep) / 180 * Math.PI;
    //calculation of a new div's coordinates
    let numberCenterX = clockCircleX + radius * Math.sin(angle);
    let numberCenterY = clockCircleY - radius * Math.cos(angle);
    //Draw numbers
    ctx.fillStyle = 'rgba(252, 143, 100, 1)';
    ctx.beginPath();
    ctx.arc(numberCenterX, numberCenterY, numberSize / 2, 0, 360, false)
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.font = `normal ${numberSize / 1.5}px Times New Roman`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(i, numberCenterX, numberCenterY);

    ctx.restore();

    angleStep = angleStep + 30;
  }

  //Draw arrows based on time
  const now = new Date();
  const sec = now.getSeconds();
  const min = now.getMinutes();
  let hr = now.getHours();
  hr = hr >= 12 ? hr - 12 : hr;
  secAngle = sec * Math.PI / 30;
  minAngle = (Math.PI / 30) * min + (Math.PI / 1800) * sec;
  hrAngle = hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec;

  //create an arrows
  drawArrow(ctx, "red", clockCircleY - 2 * numberSize, 6, secAngle);
  drawArrow(ctx, "black", clockCircleY - 3 * numberSize, 8, minAngle);
  drawArrow(ctx, "black", clockCircleY - 3.5 * numberSize, 10, hrAngle);

  //create a text time representation
  ctx.save();
  ctx.fillStyle = 'black';
  ctx.font = `normal ${numberSize}px Times New Roman`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(formatDateTime(now), clockCircleX, clockCircleY - numberSize * 2);
  ctx.restore();

  ctx.restore();

  requestAnimationFrame(draw);
}

function drawArrow(context, color, length, width, angle) {
  context.save();
  context.lineWidth = width;
  context.translate(size / 2, size / 2);
  context.rotate(angle);
  context.strokeStyle = color;
  context.globalAlpha = 0.7;
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(0, -length);
  context.stroke();
  context.closePath();
  context.restore();
}

requestAnimationFrame(draw);

// date formatter function (чч:мм:сс)
function formatDateTime(dt) {
  let hours = dt.getHours();
  let minutes = dt.getMinutes();
  let seconds = dt.getSeconds();
  return str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
}

// add 0 to val in dependance of Len
function str0l(val, len) {
  let strVal = val.toString();
  while (strVal.length < len)
    strVal = '0' + strVal;
  return strVal;
}