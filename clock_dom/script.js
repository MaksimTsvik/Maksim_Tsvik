const size = 500; //setup main clock size in px 
const radius = size / 2 - size / 10; //setup radius where all numbers located
const numberSize = size / 10; //setup size of a numbers of clock in px
let angleStep = 30; //setup step between numbers in degrees

//get clock container
const clock = document.querySelector('.clock')
clock.style.height = size + 10 + 'px'; //update clocks container size
clock.style.position = 'relative'; //setup relative container for clock

// create clock circle
const clockCircle = document.createElement('div');
clockCircle.style.cssText = `
width: ${size}px;
height: ${size}px;
border-radius: 50%;
background: rgba(104, 141, 198, 1);
position: absolute;
top: 50%;
left: 50%; 
transform: translate(-50%, -50%);
`;
clock.append(clockCircle);

//find x and y coordinates of clock's center
const clockCircleX = clockCircle.offsetLeft;
const clockCircleY = clockCircle.offsetTop;

//add time scale at clock
for (let i = 1; i < 13; i++) {
  //create a new div with time scale
  let number = document.createElement('div');
  let timeNumber = document.createTextNode(i);
  number.append(timeNumber);
  number.style.position = 'absolute';
  number.style.width = numberSize + 'px';
  number.style.height = numberSize + 'px';
  number.style.backgroundColor = 'rgba(252, 143, 100, 1)';
  number.style.borderRadius = '50%';
  number.style.textAlign = 'center';
  number.style.lineHeight = numberSize + 'px';
  number.style.fontSize = numberSize / 1.5 + 'px';
  //turn angle calc
  let angle = parseFloat(angleStep) / 180 * Math.PI;
  //calculation of a new div's coordinates
  let numberCenterX = clockCircleX + radius * Math.sin(angle) - (parseFloat(number.style.width) / 2);
  let numberCenterY = clockCircleY - radius * Math.cos(angle) - (parseFloat(number.style.height) / 2);
  //add new coordinates
  number.style.left = numberCenterX + 'px';
  number.style.top = numberCenterY + 'px';
  //add new number and increase angleStep
  clock.append(number);
  angleStep = angleStep + 30;
}

//create an arrows
const secArrow = document.createElement('div');
const minArrow = document.createElement('div');
const hourArrow = document.createElement('div');
//setup each arrow styling
secArrow.style.cssText = `position: absolute; z-index:1; width: ${radius - numberSize}px; height: 6px; background-color: red; left: ${clockCircleX}px;top: ${clockCircleY - 3}px; transform-origin: 0%; transform: rotate(-90deg); transition: all 0.1s cubic-bezier(0.37, 3.18, 0.45, 1.15); opacity: 70%`;
minArrow.style.cssText = `position: absolute; z-index:1; width: ${radius - 1.5 * numberSize}px; height: 8px; background-color: black; left: ${clockCircleX}px;top: ${clockCircleY - 4}px; transform-origin: 0%; transform: rotate(-90deg); transition: all 0.1s cubic-bezier(0.37, 3.18, 0.45, 1.15); opacity: 70%`;
hourArrow.style.cssText = `position: absolute; z-index:1; width: ${radius - 2.5 * numberSize}px; height: 10px; background-color: black; left: ${clockCircleX}px;top: ${clockCircleY - 5}px; transform-origin: 0%; transform: rotate(-90deg); transition: all 0.1s cubic-bezier(0.37, 3.18, 0.45, 1.15); opacity: 70%`;
//add arrows into the clock
clock.append(secArrow);
clock.append(minArrow);
clock.append(hourArrow);

//create a text time representation
const digitalClock = document.createElement('div');
clock.append(digitalClock);
digitalClock.style.cssText = `position: absolute; text-align:center; 
  width: ${clockCircle.offsetWidth / 2}px; 
  height: ${numberSize}px;
  left: ${clockCircleX}px;
  top: ${clockCircleY}px;
  line-height: ${numberSize}px;
  transform: translate(-50%, -${2 * numberSize}px);
  font-size: ${numberSize}px`;

//setup a timer to obtain actual date
const timer = setInterval(setDate, 1000);
//use timer function to move arrows and update time
function setDate() {
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  //calculate arrows turn angle
  const secTransform = seconds * 6 - 90;
  const minutesTransform = minutes * 6 - 90;
  const hoursTransform = hours * 30 - 90;
  //move an arrows
  secArrow.style.transform = `rotate(${secTransform}deg)`;
  minArrow.style.transform = `rotate(${minutesTransform}deg)`;
  hourArrow.style.transform = `rotate(${hoursTransform}deg)`;
  //remove threshold at 12(24)/0 point
  if (seconds == 0) {
    secArrow.style.transition = 'none';
  } else {
    secArrow.style.transition = 'all 0.1s cubic-bezier(0.37, 3.18, 0.45, 1.15)';
  }
  if (minutes == 0) {
    minArrow.style.transition = 'none';
  } else {
    minArrow.style.transition = 'all 0.1s cubic-bezier(0.37, 3.18, 0.45, 1.15)';
  }
  if (hours == 12 || hours == 24) {
    hourArrow.style.transition = 'none';
  } else {
    hourArrow.style.transition = 'all 0.1s cubic-bezier(0.37, 3.18, 0.45, 1.15)';
  }
  //update digital clock data
  digitalClock.innerHTML = `${formatDateTime(date)}`;
}

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