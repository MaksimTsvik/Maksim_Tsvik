// Хэш (объект) как память (как запомнить что что-то уже случалось)
var values = [55, 77, 55, 66, 77];
var used = {}; // ключ хэша - число, которое уже встречалось
for (var i = 0; i < values.length; i++) {
  var value = values[i]; // очередное значение
  if (value in used) // встречалось ли оно?
    continue; // если да - всё, берём следующее
  used[value] = true; // если нет - запоминаем, что это значение уже встречалось
  console.log(value); // выводим его в консоль
}

// Хэш (объект) как счётчик
var animals = ['собака', 'кошка', 'тушкан', 'собака', 'собака', 'тушкан'];

var count = {}; // ключ - животное, значение - сколько раз оно встретилось
for (var i = 0; i < animals.length; i++) {
  var animal = animals[i];
  if (!(animal in count))
    count[animal] = 0;
  count[animal]++;
}

// округление до произвольного модуля
function roundMod(n, m) {
  return Math.round(n / m) * m;
}

// получение целого случайного числа в заданном диапазоне
function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

// Русскоязычное форматирование даты и времени (функция)
// форматирует переданную дату-время в формате дд.мм.гггг чч:мм:сс
function formatDateTime(dt) {
  var year = dt.getFullYear();
  var month = dt.getMonth() + 1;
  var day = dt.getDate();
  var hours = dt.getHours();
  var minutes = dt.getMinutes();
  var seconds = dt.getSeconds();
  return str0l(day, 2) + '.' + str0l(month, 2) + '.' + year + ' ' + str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
}

// дополняет строку Val слева нулями до длины Len
function str0l(val, len) {
  var strVal = val.toString();
  while (strVal.length < len)
    strVal = '0' + strVal;
  return strVal;
}

var currTime = new Date();
console.log(formatDateTime(currTime));

// Русскоязычное форматирование даты и времени (метод)
// форматирует переданную дату-время в формате дд.мм.гггг чч:мм:сс
function formatDateTime() {
  var year = this.getFullYear();
  var month = this.getMonth() + 1;
  var day = this.getDate();
  var hours = this.getHours();
  var minutes = this.getMinutes();
  var seconds = this.getSeconds();
  return str0l(day, 2) + '.' + str0l(month, 2) + '.' + year + ' ' + str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
}

// дополняет строку Val слева нулями до длины Len
function str0l(val, len) {
  var strVal = val.toString();
  while (strVal.length < len)
    strVal = '0' + strVal;
  return strVal;
}

var currTime1 = new Date();

Date.prototype.formatRus = formatDateTime; // описываем новый метод для класса Date

var currTime2 = new Date();

console.log(currTime1.formatRus()); // метод можно вызывать даже для объектов, созданных до описания метода!
console.log(currTime2.formatRus());


// Полезная функция получения координат элемента
// получение координат элемента относительно верхнего левого угла страницы
function getElementPos(elem) {
  var bbox = elem.getBoundingClientRect();
  return {
    left: bbox.left + window.pageXOffset,
    top: bbox.top + window.pageYOffset
  };
}

// то же, кроссбраузерный вариант (в т.ч. для IE8-)
function getElementPos(elem) {
  var bbox = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = bbox.top + scrollTop - clientTop;
  var left = bbox.left + scrollLeft - clientLeft;

  return {
    left: left,
    top: top
  };
}