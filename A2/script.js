let string = prompt("Input a string");

while (string.startsWith(" ")) {
  string = string.slice(1);
}
while (string.endsWith(" ")) {
  string = string.slice(0, -1);
}

alert(`%${string}%`);