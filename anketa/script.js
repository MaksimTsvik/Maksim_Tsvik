var surname = prompt("Input your surname", "Your surname");
var nameB = prompt("Input your name", "Your name");
var nameF = prompt("Input your  Father's name", "Your Father's name");
var age = prompt("Input your age in yrs", "Your age");
var sexMale = confirm("You Male?");

var retired = age < 65 ? false : true;

alert(`Your SNF: ${surname} ${nameB} ${nameF} \n
Your age in yrs: ${age} \n
Your age in days: ${age * 365} \n
In 5 yrs your age is: ${+age + 5} \n
Your sex is: ${sexSelection(sexMale)} \n
Are you retired? ${retired}
`)

function sexSelection(sexInput) {
  if (sexInput) return "male";
  return "female";
}