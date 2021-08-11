//get clock container
const clock = document.querySelector('.clock')
//get clock board
const clockCircle = document.querySelector('.clock_circle');

const radius = 200; //setup radius where all numbers located
let angleStep = 30; //setup step between numbers in degrees
const numberSize = 40; //setup size of a numbers of clock in px

//find x and y coordinates of clock's center
const clockCircleX = clockCircle.offsetLeft;
const clockCircleY = clockCircle.offsetTop;

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
secArrow.style.cssText = `position: absolute; width: ${radius - numberSize}; height: 6px; background-color: red; left: ${clockCircleX};top: ${clockCircleY - 3}; transform-origin: 0%; transform: rotate(-90deg); transition: all 0.1s cubic-bezier(0.37, 3.18, 0.45, 1.15);`;
minArrow.style.cssText = `position: absolute; width: ${radius - 1.5 * numberSize}; height: 8px; background-color: black; left: ${clockCircleX};top: ${clockCircleY - 4}; transform-origin: 0%; transform: rotate(-90deg); transition: all 0.1s cubic-bezier(0.37, 3.18, 0.45, 1.15);`;
hourArrow.style.cssText = `position: absolute; width: ${radius - 2.5 * numberSize}; height: 10px; background-color: black; left: ${clockCircleX};top: ${clockCircleY - 5}; transform-origin: 0%; transform: rotate(-90deg); transition: all 0.1s cubic-bezier(0.37, 3.18, 0.45, 1.15);`;
//add arrows into the clock
clock.append(secArrow);
clock.append(minArrow);
clock.append(hourArrow);

//setup a timer to obtain actual date
const timer = setInterval(setDate, 1000);

function setDate() {
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const secTransform = seconds * 6 - 90;
  const minutesTransform = minutes * 6 - 90;
  const hoursTransform = hours * 30 - 90;
  secArrow.style.transform = `rotate(${secTransform}deg)`;
  minArrow.style.transform = `rotate(${minutesTransform}deg)`;
  hourArrow.style.transform = `rotate(${hoursTransform}deg)`;

  

}