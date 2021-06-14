const year = prompt("Input a year", "Type here");

function ageCalculation(number) {
  return Math.ceil(number / 100);
}

alert(`It is ${ageCalculation(year)} century`);