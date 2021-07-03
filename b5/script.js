"use strict"

function buildWrapper(tag) {
  return function (text, objProp) {
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

    let properties = "";
    for (let key in objProp) {
      properties += `${key}="${objProp[key]}" `
    }

    return (`<${tag} ${properties.trim()}>${adjText}</${tag}>`)
  }
}

const wrapH1 = buildWrapper("H1");
const wrapP = buildWrapper("P");
console.log(wrapP("Однажды в студёную зимнюю пору"));
console.log(wrapP("Однажды в студёную зимнюю пору", { lang: "ru" }));
console.log(wrapP("Однажды в <студёную> зимнюю пору"));
console.log(wrapH1("СТИХИ", { align: "center", title: "M&M's" }));