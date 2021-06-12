/*Each prompt inspection for correct input*/
var surname = prompt("Input your surname", "Your surname");
while (!isLetter(surname) || (surname === "Your surname")) {
  surname = prompt("Input your surname", "Your surname");
}

var nameBirth = prompt("Input your name", "Your name");
while (!isLetter(nameBirth) || (nameBirth === "Your name")) {
  nameBirth = prompt("Input your name", "Your name");
}

var nameF = prompt("Input your Father's name", "Your Father's name");
while (!isLetter(nameF) || (nameF === "Your Father's name")) {
  nameF = prompt("Input your Father's name", "Your Father's name");
}

var age = prompt("Input your age in yrs", "Your age");
while (!isNumber(age)) {
  age = prompt("Input your age in yrs", "Your age");
}

var sexMale = confirm("You Male?");
var retired = age < 65 ? false : true;

function sexSelection(sexInput) {
  if (sexInput) return "male";
  return "female";
}

function isLetter(str) {
  if (str == null) return false;
  return str.length >= 1 && str.match(/\w/ig);
}

function isNumber(str) {
  if (isNaN(str) || str == null) return false;
  return str.length >= 1 && str != 0;
}

alert(`Your SNF: ${surname} ${nameBirth} ${nameF};
Your age in yrs: ${age};
Your age in days: ${age * 365};
In 5 yrs your age is: ${+age + 5};
Your sex is: ${sexSelection(sexMale)};
Are you retired? ${retired}.
`)