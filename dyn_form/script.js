function builder(arr) {
  const main = document.querySelector('main'); //find parent element for new form
  const newForm = document.createElement('form'); //new form
  newForm.action = "https://fe.it-academy.by/TestForm.php"; //add action attribute
  newForm.method = "POST";
  newForm.target = "_blank";

  for (let item of arr) {
    let newLabel = document.createElement('label');// create label from array item
    let newLabelName = document.createTextNode(item.label)
    newLabel.for = item.name; //setup label bond with input
    newLabel.append(newLabelName);
    newForm.append(newLabel); //add label into form

    let newInput = document.createElement('input');//create new input
    switch (item.kind) {
      case ('longtext'):
        newInput.type = 'text';
        newInput.style.width = '400px'
        break;
      case ('number'):
        newInput.type = 'number';
        newInput.style.width = '100px'
        break;
      case ('shorttext'):
        if (item.name == 'email') {
          newInput.type = 'email';
          newInput.style.width = '300px'
        } else {
          newInput.type = 'text';
          newInput.style.width = '200px'
        }
        break;
      case ('combo'):
        newInput = document.createElement('select');
        for (let i = 1; i = item.variants.length; i++) {
          let newOption = document.createElement('option'); //create new option selection
          let newOptionText = document.createTextNode(item.variants[i].text) //create new option text data
          newOption.value = item.variants[i].value;
          newOption.append(newOptionText);
          newInput.append(newOption); //add new option into selection
        }

        break;
      case ('radio'):
        textArr[index] = '&amp;';
        break;
      case ('check'):
        textArr[index] = '&amp;';
        break;
      case ('memo'):
        textArr[index] = '&amp;';
        break;
      case ('submit'):
        textArr[index] = '&amp;';
        break;
    }
    newInput.name = item.name;
    newInput.id = item.name;
    newForm.append(newInput); //add input into form


  }

  main.append(newForm); //add form in markup
}

var formDef1 =
  [
    { label: 'Название сайта:', kind: 'longtext', name: 'sitename' },
    { label: 'URL сайта:', kind: 'longtext', name: 'siteurl' },
    { label: 'Посетителей в сутки:', kind: 'number', name: 'visitors' },
    { label: 'E-mail для связи:', kind: 'shorttext', name: 'email' },
    {
      label: 'Рубрика каталога:', kind: 'combo', name: 'division',
      variants: [{ text: 'здоровье', value: 1 }, { text: 'домашний уют', value: 2 }, { text: 'бытовая техника', value: 3 }]
    },
    {
      label: 'Размещение:', kind: 'radio', name: 'payment',
      variants: [{ text: 'бесплатное', value: 1 }, { text: 'платное', value: 2 }, { text: 'VIP', value: 3 }]
    },
    { label: 'Разрешить отзывы:', kind: 'check', name: 'votes' },
    { label: 'Описание сайта:', kind: 'memo', name: 'description' },
    { label: 'Опубликовать:', kind: 'submit' },
  ];

var formDef2 =
  [
    { label: 'Фамилия:', kind: 'longtext', name: 'lastname' },
    { label: 'Имя:', kind: 'longtext', name: 'firstname' },
    { label: 'Отчество:', kind: 'longtext', name: 'secondname' },
    { label: 'Возраст:', kind: 'number', name: 'age' },
    { label: 'Зарегистрироваться:', kind: 'submit' },
  ];

builder(formDef1);
// document.getElementById('build').addEventListener('click', builder);