"use strict";

function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

function mood(colorsCount) {
  const colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
  let colorController = {};

  console.log('цветов: ' + colorsCount);

  for (let i = 1; i <= colorsCount; i++) {
    let n = randomDiap(1, 7);
    let colorName = colors[n];
    if (colorName in colorController) {
      i--;
      continue;
    }
    colorController[colorName] = 1;
    console.log(colorName);
  }
}

mood(3);