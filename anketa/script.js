var surname = prompt("Input your surname", "Your surname");
var nameB = prompt("Input your name", "Your name");
var nameF = prompt("Input your  Father's name", "Your Father's name");
var age = prompt("Input your age in yrs", "Your age");
var sexMale = confirm("You Male?");
var retired = age < 65 ? false : true;

function sexSelection(sexInput) {
  if (sexInput) return "male";
  return "female";
}

alert(`Your SNF: ${surname} ${nameB} ${nameF};
Your age in yrs: ${age};
Your age in days: ${age * 365};
In 5 yrs your age is: ${+age + 5};
Your sex is: ${sexSelection(sexMale)};
Are you retired? ${retired}.
`)