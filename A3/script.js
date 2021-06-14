const string = prompt("Input a string");

function isPalindrome(str) {
  const replacer = /\W/g;
  str = str.replace(replacer, "").toLowerCase();
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) return false;
  }
  return true
}

isPalindrome(string) ? alert("HOORAY!\n It is a PALINDROME") :
  alert("OH NOOOO!\n It is not a PALINDROME");