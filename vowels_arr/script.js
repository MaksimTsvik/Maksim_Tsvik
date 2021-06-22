const string = prompt("Input a string", "Type here");

function vowelsCalcForEach(str) {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U', 'а', 'А', 'е', 'Е', 'ё', 'Ё', 'и', 'И', 'о', 'О', 'у', 'У', 'ы', 'Ы', 'э', 'Э', 'ю', 'Ю', 'я', 'Я',];
  const strArr = str.split('');
  let counter = 0;
  strArr.forEach(element => vowels.includes(element) ? counter++ : null);
  return counter;
}

function vowelsCalcFilter(str) {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U', 'а', 'А', 'е', 'Е', 'ё', 'Ё', 'и', 'И', 'о', 'О', 'у', 'У', 'ы', 'Ы', 'э', 'Э', 'ю', 'Ю', 'я', 'Я',];
  const strArr = str.split('');
  return strArr.filter(element => vowels.includes(element)).length;
}

function vowelsCalcReduce(str) {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U', 'а', 'А', 'е', 'Е', 'ё', 'Ё', 'и', 'И', 'о', 'О', 'у', 'У', 'ы', 'Ы', 'э', 'Э', 'ю', 'Ю', 'я', 'Я',];
  const strArr = str.split('');
  return strArr.reduce((counter, element) => vowels.includes(element) ? ++counter : counter, 0);
}

alert(`Vowels in string via forEach: ${vowelsCalcForEach(string)}
Vowels in string via filter: ${vowelsCalcFilter(string)}
Vowels in string via reduce: ${vowelsCalcReduce(string)}`);