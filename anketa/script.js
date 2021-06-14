/*Each prompt inspection for correct input*/
let surname = prompt("Input your surname", "Your surname");
while (!isLetter(surname) || (surname === "Your surname")) {
  surname = prompt("Correct surname must consist of letters", "Your surname");
}

let nameBirth = prompt("Input your name", "Your name");
while (!isLetter(nameBirth) || (nameBirth === "Your name")) {
  nameBirth = prompt("Correct name must consist of letters", "Your name");
}

let nameF = prompt("Input your Father's name", "Your Father's name");
while (!isLetter(nameF) || (nameF === "Your Father's name")) {
  nameF = prompt("Correct Father's name must consist of letters", "Your Father's name");
}

let age = prompt("Input your age in yrs", "Your age");
while (!isNumber(age)) {
  age = prompt("Correct age must consist of numbers", "Your age");
}

let sexMale = confirm("You Male?");
let retired = age < 65 ? false : true;

function sexSelection(sexInput) {
  if (sexInput) return "male";
  return "female";
}

function isLetter(str) {
  if (str == null) return false;
  return str.length >= 1 && str.match(/[a-z]/ig);
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