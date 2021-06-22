const string = prompt("Input a string", "Type here");

function vowelsCalc(str) {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U', 'а', 'А', 'е', 'Е', 'ё', 'Ё', 'и', 'И', 'о', 'О', 'у', 'У', 'ы', 'Ы', 'э', 'Э', 'ю', 'Ю', 'я', 'Я',];
  const strArr = str.split('');
  let counter = 0;
  for (letter of strArr) {
    if (vowels.includes(letter)) ++counter;
  }
  return counter;
}

alert(`Vowels in string: ${vowelsCalc(string)}`);