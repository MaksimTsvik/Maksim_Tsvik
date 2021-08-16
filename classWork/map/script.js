const area = document.querySelector('.area');

const field = [
  [1, 0, 0, 0, 0, 0],
  [0, 2, 1, 0, 1, 0],
  [1, 0, 0, 0, 2, 0],
  [1, 1, 2, 0, 1, 0],
  [1, 0, 0, 0, 2, 0],
  [1, 0, 2, 0, 1, 0],
];

for (let i = 0; i < field.length; i++) {
  for (let j = 0; j < field[i].length; j++) {
    if (field[i][j] === 0) {
      drawGrass();
    } else if (field[i][j] === 1) {
      drawAsphalt();
    } else if (field[i][j] === 2) {
      drawWall();
    }
  }
}

function drawGrass() {
  const element = document.createElement('div');
  element.classList.add('grass');
  area.append(element);
}
function drawAsphalt() {
  const element = document.createElement('div');
  element.classList.add('asphalt');
  area.append(element);
}
function drawWall() {
  const element = document.createElement('div');
  element.classList.add('wall');
  area.append(element);
}