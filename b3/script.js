const string = prompt("Input a mathematical expression", "2*(-3+1)");

function calculate(str) {

  return +str;
}

// alert((new Function("return " + string)())); -IT WORKS!

alert(calculate(string));