const string = prompt("Input a string", "Type here");

function strReverse(str) {
  return str.split("").reverse().join("");
}

alert(`Reversed string: ${strReverse(string)}`);