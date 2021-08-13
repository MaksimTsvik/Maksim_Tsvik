//get a box element and area elem
const box = document.querySelector('.box');
const area = document.querySelector('.area');
//set up initial coord
let x = 0;
let y = 0;
// get sizing of an elements
let areaWidth = area.clientWidth;
let areaHeight = area.clientHeight;
let boxWidth = box.offsetWidth;
let boxHeight = box.offsetHeight;
let direction = 'null';

//add listener on key pressed left e =37 top e = 38 ight e = 39 bottom e = 40
window.addEventListener('keydown', moveArrow);

function moveArrow(e) {
  e = e || window.event;
  switch (e.keyCode) {
    case 37:
      direction = "left";
      break;
    case 38:
      direction = "top";
      break;
    case 39:
      direction = "right";
      break;
    case 40:
      direction = "bottom";
      break;
  }
}

//start moving into direction
function startMove() {
  //limit by area size
  if (x > areaWidth - boxWidth) {
    direction = 'null';
    x = areaWidth - boxWidth;
    box.style.left = x + "px";
  }
  if (x < 0) {
    direction = 'null';
    x = 0;
    box.style.left = x + "px";
  }
  if (y > areaHeight - boxHeight) {
    direction = 'null';
    y = areaHeight - boxHeight;
    box.style.top = y + "px";
  }
  if (y < 0) {
    direction = 'null';
    y = 0;
    box.style.top = y + "px";
  }

  // selection of mvmnt
  switch (direction) {
    case "left":
      x--;
      box.style.left = x + "px";
      break;
    case "top":
      y--;
      box.style.top = y + "px";
      break;
    case "right":
      x++;
      box.style.left = x + "px";
      break;
    case "bottom":
      y++;
      box.style.top = y + "px";
      break;
    default:
      break;
  }

}

//add timer for continious move
let timer = setInterval(startMove, 5);