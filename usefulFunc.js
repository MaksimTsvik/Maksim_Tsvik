//---------------
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

//---------------
// Хэш (объект) как счётчик
var animals = ['собака', 'кошка', 'тушкан', 'собака', 'собака', 'тушкан'];

var count = {}; // ключ - животное, значение - сколько раз оно встретилось
for (var i = 0; i < animals.length; i++) {
  var animal = animals[i];
  if (!(animal in count))
    count[animal] = 0;
  count[animal]++;
}

//---------------
// округление до произвольного модуля
function roundMod(n, m) {
  return Math.round(n / m) * m;
}

//---------------
// получение целого случайного числа в заданном диапазоне
function randomDiap(n, m) {
  return Math.floor(Math.random() * (m - n + 1)) + n;
}

//---------------
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

//---------------
// дополняет строку Val слева нулями до длины Len
function str0l(val, len) {
  var strVal = val.toString();
  while (strVal.length < len)
    strVal = '0' + strVal;
  return strVal;
}

var currTime = new Date();
console.log(formatDateTime(currTime));

//---------------
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

//---------------
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

//---------------
// Полезная функция получения координат элемента
// получение координат элемента относительно верхнего левого угла страницы
function getElementPos(elem) {
  var bbox = elem.getBoundingClientRect();
  return {
    left: bbox.left + window.pageXOffset,
    top: bbox.top + window.pageYOffset
  };
}

//---------------
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

//---------------
// получение целевого элемента события
// EO - объект события
function getEventElement(EO) {
  if (window.event && window.event.srcElement)
    return window.event.srcElement;

  if (EO.target)
    return EO.target;

  return null;
}
//---------------
// остановка распространения события
// EO - объект события
function stopPropagation(EO) {
  if (EO.stopPropagation)
    EO.stopPropagation();
  else
    EO.cancelBubble = true;
}

//---------------
// отмена обработки события по умолчанию
// EO - объект события
function preventDefault(EO) {
  if (EO.preventDefault)
    EO.preventDefault();
  else
    EO.returnValue = false;
}

//---------------
// получение нажатой кнопки мыши
// EO - объект события
function getMouseWhich(EO) {
  if (EO.which) return EO.which;
  if (EO.button & 1) return 1;
  if (EO.button & 4) return 2;
  if (EO.button & 2) return 3;
  return 0;
}

//---------------
// получение нажатого на клавиатуре символа
// EO - объект события
function getKeyboardChar(EO) {
  if (EO.which == null) {  // IE
    if (EO.keyCode < 32) return null; // управляющая клавиша
    return String.fromCharCode(EO.keyCode); // печатный символ
  }
  if (EO.which != 0 && EO.charCode != 0) {  // остальные браузеры
    if (EO.which < 32) return null; // управляющая клавиша
    return String.fromCharCode(EO.which); // печатный символ
  }
  return null; // управляющая клавиша
}

//---------------
//Фильтрация серии событий — дебоунсинг, срабатывание в конце серии
// функция позволяет установить обработчик func, который не срабатывает слишком часто -
// если immediate=false - func будет вызван в конце серии событий,
// если immediate=true - func будет вызван в начале серии событий
// серия событий - последовательность событий, интервалы между которыми
// не превыщают interval миллисекунд
function debounceSerie(func, interval, immediate) {
  var timer;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timer = null;
      if (!immediate)
        func.apply(context, args);
    };
    var callNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(later, interval);
    if (callNow)
      func.apply(context, args);
  };
};

//---------------
//Наращивание координат по таймеру
var pos1;
var pos2;
var timer1;
var timer2;
var startTime;

function start() {
  pos1 = 0;
  pos2 = 0;
  startTime = new Date();
  timer1 = setInterval(tick1, 100);
  timer2 = setInterval(tick2, 1000);
}

function tick1() {
  pos1++;
  document.getElementById('Frog1').style.left = pos1 + "px";
  if (pos1 >= 300) {
    clearInterval(timer1);
    console.log('красная лягушка: ' + (new Date() - startTime));
  }
}

function tick2() {
  pos2 += 10;
  document.getElementById('Frog2').style.left = pos2 + "px";
  if (pos2 >= 300) {
    clearInterval(timer2);
    console.log('зелёная лягушка: ' + (new Date() - startTime));
  }
}

//---------------
// Пересчёт координат по таймеру
var pos1, pos2;
var timer1, timer2;
var startTime;

function start() {
  pos1 = 0;
  pos2 = 0;
  startTime = new Date();
  timer1 = setInterval(tick1, 100);
  timer2 = setInterval(tick2, 1000);
}

function tick1() {
  // скорость - 10 пикселей в секунду
  var pos1 = Math.round(((new Date) - startTime) / 1000 * 10);
  document.getElementById('Frog1').style.left = pos1 + "px";
  if (pos1 >= 300) {
    clearInterval(timer1);
    console.log('красная лягушка: ' + (new Date() - startTime));
  }
}

function tick2() {
  // скорость - 10 пикселей в секунду
  var pos2 = Math.round(((new Date) - startTime) / 1000 * 10);
  document.getElementById('Frog2').style.left = pos2 + "px";
  if (pos2 >= 300) {
    clearInterval(timer2);
    console.log('зелёная лягушка: ' + (new Date() - startTime));
  }
}

//---------------
// Применение таймера в интерфейсах — решение с таймером
var translateDelayTimer = 0; // таймера нет

function startTimer() { // (ре)старт таймера
  stopTimer();
  translateDelayTimer = setTimeout(translatePhrase, 500);
}

function stopTimer() { // стоп таймера
  if (translateDelayTimer) {
    clearTimeout(translateDelayTimer);
    translateDelayTimer = 0;
  }
}

function keyPressed() {
  startTimer();
}

function translatePhrase() {
  stopTimer(); // важно чтоб очистить translateDelayTimer
  // запускаем длительную операцию по обработке фразы
  var phrase = document.getElementById('IPhrase').value;
  console.log('перевожу фразу: ' + phrase);
}

//---------------
//Проверка на поддержку свойств и методов
function getSelectedText() {
  var sel = '';
  if (document.selection)
    sel = document.selection.createRange().text;
  else if (window.getSelection)
    sel = window.getSelection().toString();
  else if (document.getSelection)
    sel = document.getSelection();
  return sel;
}

//---------------
// Проверка на поддержку CSS-технологий
console.log(CSS.supports('display', 'flex'));

//---------------
//Равномерное движение с requestAnimationFrame кроссбраузерно
var RAF =
  // находим, какой метод доступен
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  // ни один не доступен
  // будем работать просто по таймеру
  function (callback) { window.setTimeout(callback, 1000 / 60); }
  ;
function start() {
  // синхрон с внутренней анимацией браузера
  // обычно 60 раз в сек
  RAF(tick);
}

// возвращает размер открытого документа
function getDocumentSize() {
  var totalHeight=(document.body.scrollHeight > document.body.offsetHeight)?document.body.scrollHeight:document.body.offsetHeight;
  var totalWidth=(document.body.scrollWidth > document.body.offsetWidth)?document.body.scrollWidth:document.body.offsetWidth;
  return {width:totalWidth, height:totalHeight};
}

// возвращает размер клиентской области окна
function getWindowClientSize() {
  var uaB=navigator.userAgent.toLowerCase();
  var isOperaB = (uaB.indexOf('opera')  > -1);
  var isIEB=(!isOperaB && uaB.indexOf('msie') > -1);

  var clientWidth=((document.compatMode||isIEB)&&!isOperaB)?
    (document.compatMode=='CSS1Compat')?
    document.documentElement.clientWidth:
    document.body.clientWidth:
    (document.parentWindow||document.defaultView).innerWidth;

  var clientHeight=((document.compatMode||isIEB)&&!isOperaB)?
    (document.compatMode=='CSS1Compat')?
    document.documentElement.clientHeight:
    document.body.clientHeight:
    (document.parentWindow||document.defaultView).innerHeight;

  return {width:clientWidth, height:clientHeight};
}

// возвращает, насколько проскроллировано окно браузера
function getWindowScrollPos() {
  if ( 'pageXOffset' in window )
    return { scrollx: window.pageXOffset, scrolly: window.pageYOffset };
  if ( document.documentElement && ('scrollLeft' in document.documentElement) )
    return { scrollx: document.documentElement.scrollLeft, scrolly: document.documentElement.scrollTop };
  if ( document.body && ('scrollLeft' in document.body) )
    return { scrollx: document.body.scrollLeft, scrolly: document.body.scrollTop };
  return { scrollx: 0, scrolly: 0 };
}

// скроллирует окно к указанному элементу
function scrollToElem(elem,scrollMode) {
  // scrollMode:
  // 0 - сделать видимым с минимальным скроллингом
  // 1 - верх объекта - к верху экрана
  // 2 - объект на середину экрана
  // 3 - низ объекта - к низу экрана
  // 4 - верх объекта - почти к верху экрана

  var elemPos=getElementPos(elem);
  switch ( scrollMode ) {
    case 0:
      var scrollPos=getWindowScrollPos();
      if ( scrollPos.scrolly>elemPos.top )
        window.scrollTo(0,elemPos.top);
      else {
        var clientSize=getWindowClientSize();
        if ( elemPos.top+elem.offsetHeight>scrollPos.scrolly+clientSize.height )
          window.scrollTo(0,elemPos.top+elem.offsetHeight-clientSize.height);
      }
      break;
    case 1:
      window.scrollTo(0,elemPos.top);
      break;
    case 2:
      var clientSize=getWindowClientSize();
      window.scrollTo(0,elemPos.top+elem.offsetHeight/2-clientSize.height/2);
      break;
    case 3:
      var clientSize=getWindowClientSize();
      window.scrollTo(0,elemPos.top+elem.offsetHeight-clientSize.height);
      break;
    case 4:
      var clientSize=getWindowClientSize();
      window.scrollTo(0,elemPos.top-clientSize.height/5);
      break;
  }
}