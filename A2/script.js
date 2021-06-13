let string = prompt("Input a string");

while (string.startsWith(" ")) {
  string = string.slice(1);
}
console.log(string);
while (string.endsWith(" ")) {
  string = string.slice(0, -1);
}
console.log(string);
alert(`%${string}%`);