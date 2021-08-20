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

    angleStep = angleStep + 30;
  }

}


draw();


// 

// //create an arrows
// const secArrow = document.createElementNS("http://www.w3.org/2000/svg", 'line');
// const minArrow = document.createElementNS("http://www.w3.org/2000/svg", 'line');
// const hourArrow = document.createElementNS("http://www.w3.org/2000/svg", 'line');

// secArrow.setAttribute('x1', clockCircleX);
// secArrow.setAttribute('y1', clockCircleY);
// secArrow.setAttribute('x2', clockCircleX);
// secArrow.setAttribute('y2', `${clockCircleY - radius + numberSize}`);
// secArrow.setAttribute('stroke', 'red');
// secArrow.setAttribute('stroke-width', '6');
// secArrow.style.cssText = "transition: all 0.1s cubic-bezier(0.37, 3.18, 0.45, 1.15); opacity: 70%; transform-origin: 50% 50%";

// minArrow.setAttribute('x1', clockCircleX);
// minArrow.setAttribute('y1', clockCircleY);
// minArrow.setAttribute('x2', clockCircleX);
// minArrow.setAttribute('y2', `${clockCircleY - (radius - 1.5 * numberSize)}`);
// minArrow.setAttribute('stroke', 'black');
// minArrow.setAttribute('stroke-width', '8');
// minArrow.style.cssText = "transition: all 0.1s cubic-bezier(0.37, 3.18, 0.45, 1.15); opacity: 70%; transform-origin: 50% 50%";

// hourArrow.setAttribute('x1', clockCircleX);
// hourArrow.setAttribute('y1', clockCircleY);
// hourArrow.setAttribute('x2', clockCircleX);
// hourArrow.setAttribute('y2', `${clockCircleY - (radius - 2.5 * numberSize)}`);
// hourArrow.setAttribute('stroke', 'black');
// hourArrow.setAttribute('stroke-width', '10');
// hourArrow.style.cssText = "transition: all 0.1s cubic-bezier(0.37, 3.18, 0.45, 1.15); opacity: 70%; transform-origin: 50% 50%";

// svgClock.append(secArrow);
// svgClock.append(minArrow);
// svgClock.append(hourArrow);

// //create a text time representation
// const digitalClock = document.createElementNS("http://www.w3.org/2000/svg", 'text');

// digitalClock.setAttribute('text-anchor', 'middle');
// digitalClock.setAttribute('x', `${clockCircleX}`);
// digitalClock.setAttribute('y', `${clockCircleY - numberSize * 1.5}`);
// digitalClock.style.fontSize = numberSize + 'px';

// svgClock.append(digitalClock);

// //setup a timer to obtain actual date
// const timer = setInterval(setDate, 1000);
// //use timer function to move arrows and update time
// function setDate() {
//   const date = new Date();
//   const seconds = date.getSeconds();
//   const minutes = date.getMinutes();
//   const hours = date.getHours();
//   //calculate arrows turn angle
//   const secTransform = seconds * 6;
//   const minutesTransform = minutes * 6;
//   const hoursTransform = hours * 30;
//   //move an arrows
//   secArrow.style.transform = `rotate(${secTransform}deg)`;
//   minArrow.style.transform = `rotate(${minutesTransform}deg)`;
//   hourArrow.style.transform = `rotate(${hoursTransform}deg)`;
//   //remove threshold at 12(24)/0 point
//   if (seconds == 0) {
//     secArrow.style.transition = 'none';
//   } else {
//     secArrow.style.transition = 'all 0.1s cubic-bezier(0.37, 3.18, 0.45, 1.15)';
//   }
//   if (minutes == 0) {
//     minArrow.style.transition = 'none';
//   } else {
//     minArrow.style.transition = 'all 0.1s cubic-bezier(0.37, 3.18, 0.45, 1.15)';
//   }
//   if (hours == 12 || hours == 24) {
//     hourArrow.style.transition = 'none';
//   } else {
//     hourArrow.style.transition = 'all 0.1s cubic-bezier(0.37, 3.18, 0.45, 1.15)';
//   }
//   //update digital clock data
//   digitalClock.innerHTML = `${formatDateTime(date)}`;
// }

// // date formatter function (чч:мм:сс)
// function formatDateTime(dt) {
//   let hours = dt.getHours();
//   let minutes = dt.getMinutes();
//   let seconds = dt.getSeconds();
//   return str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
// }

// // add 0 to val in dependance of Len
// function str0l(val, len) {
//   let strVal = val.toString();
//   while (strVal.length < len)
//     strVal = '0' + strVal;
//   return strVal;
// }

// setDate();

