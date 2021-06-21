const string = prompt("Input a string", "Type here");
const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U', 'а', 'А', 'е', 'Е', 'ё', 'Ё', 'и', 'И', 'о', 'О', 'у', 'У', 'ы', 'Ы', 'э', 'Э', 'ю', 'Ю', 'я', 'Я',];

function vowelsCalc(str) {
  const strArr = str.split('');
  let counter = 0;
  strArr.forEach(element => vowels.includes(element) ? counter++ : null);
  return counter;
}

alert(`Vowels in string: ${vowelsCalc(string)}`);