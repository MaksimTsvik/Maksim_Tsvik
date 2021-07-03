"use strict"

function buildWrapper(tag) {
  return function (text) {
    const textArr = text.split('');
    textArr.forEach(function (letter, index) {
      switch (letter) {
        case ('<'):
          textArr[index] = '&lt;';
          break;
        case ('>'):
          textArr[index] = '&gt;';
          break;
        case ("'"):
          textArr[index] = '&apos;';
          break;
        case ('"'):
          textArr[index] = '&quot;';
          break;
        case ('&'):
          textArr[index] = '&amp;';
          break;
      }
    })
    const adjText = textArr.join('');
    return (`<${tag}>${adjText}</${tag}>`)
  }
}

const wrapH1 = buildWrapper("H1");
const wrapP = buildWrapper("P");
console.log(wrapH1("СТИХИ"));
console.log(wrapP("Однажды в студёную зимнюю пору"));
console.log(wrapP("Вкусные M&M's"));