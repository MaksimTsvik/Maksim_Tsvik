let string = prompt("Input a string");
const replacer = /\W/g;
string = string.replace(replacer, "").toLowerCase();

function isPalindrome(str) {

  if (str.length <= 1) return true;

  if (str[0] !== str[str.length - 1]) return false;

  str = str.slice(1, -1);

  return isPalindrome(str);
}

isPalindrome(string) ? alert("HOORAY!\n It is a PALINDROME") :
  alert("OH NOOOO!\n It is not a PALINDROME");