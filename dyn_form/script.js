function builder(arr) {
  const main = document.querySelector('main'); //find parent element for new form
  const newForm = document.createElement('form'); //new form
  newForm.action = "https://fe.it-academy.by/TestForm.php"; //add action attribute
  newForm.method = "POST";
  newForm.target = "_blank";
  newForm.style.border = '2px solid red'; //add some styling to the form
  newForm.style.margin = '15px';
  newForm.style.padding = '5px';

  for (let item of arr) {
    let newDiv = document.createElement('div');//create div-wrapper for block structure
    newDiv.style.marginBottom = '5px'; //add some spacing

    let newLabel = document.createElement('label');// create label from array item
    let newLabelName = document.createTextNode(item.label)
    newLabel.for = item.name; //setup label bond with input
    newLabel.append(newLabelName);
    newLabel.style.width = '180px';

    newDiv.append(newLabel); //add label into div-wrapper

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
        if (item.name == 'email') { //inspection for an email
          newInput.type = 'email';
          newInput.style.width = '300px'
        } else {
          newInput.type = 'text';
          newInput.style.width = '200px'
        }
        break;
      case ('combo'): //same as select
        newInput = document.createElement('select'); //change into select type
        for (let i = 0; i < item.variants.length; i++) {
          let newOption = document.createElement('option'); //create new option selection
          let newOptionText = document.createTextNode(item.variants[i].text) //create new option text data
          newOption.value = item.variants[i].value;
          newOption.append(newOptionText);
          newInput.append(newOption); //add new option into selection
        }
        break;
      case ('radio'): //several radio buttons
        newInput = document.createElement('span'); //change into line
        for (let i = 0; i < item.variants.length; i++) {
          let newSubInput = document.createElement('input'); //create new sub-input
          newSubInput.type = 'radio';
          newSubInput.value = item.variants[i].value;
          newSubInput.name = item.name;
          newInput.append(newSubInput); //add new sub-input

          let newSpan = document.createElement('span'); //create new sub-input description
          let newSpanText = document.createTextNode(item.variants[i].text) //create new sub-input text data
          newSpan.style.margin = '5px';
          newSpan.append(newSpanText); //add text data in span
          newInput.append(newSpan); //add span after radio button
        }
        break;
      case ('check'): //one checkbox
        newInput.type = 'checkbox';
        break;
      case ('memo'): //textarea
        newInput = document.createElement('textarea'); //change into textarea
        newInput.rows = '4';
        newInput.cols = '80';
        break;
      case ('submit'): //submit button
        newInput.type = 'submit';
        break;
    }
    newInput.name = item.name ? item.name : 'button'; //if element has no name - this is a button
    newInput.id = item.name ? item.name : 'button';

    newDiv.append(newInput);//add input into same div-wrapper as label
    newForm.append(newDiv); //add div-wrapper into form
  }
  main.append(newForm); //add form in markup
}

var formDef1 =
  [
    { label: '???????????????? ??????????:', kind: 'longtext', name: 'sitename' },
    { label: 'URL ??????????:', kind: 'longtext', name: 'siteurl' },
    { label: '?????????????????????? ?? ??????????:', kind: 'number', name: 'visitors' },
    { label: 'E-mail ?????? ??????????:', kind: 'shorttext', name: 'email' },
    {
      label: '?????????????? ????????????????:', kind: 'combo', name: 'division',
      variants: [{ text: '????????????????', value: 1 }, { text: '???????????????? ??????', value: 2 }, { text: '?????????????? ??????????????', value: 3 }]
    },
    {
      label: '????????????????????:', kind: 'radio', name: 'payment',
      variants: [{ text: '????????????????????', value: 1 }, { text: '??????????????', value: 2 }, { text: 'VIP', value: 3 }]
    },
    { label: '?????????????????? ????????????:', kind: 'check', name: 'votes' },
    { label: '???????????????? ??????????:', kind: 'memo', name: 'description' },
    { label: '????????????????????????:', kind: 'submit' },
  ];

var formDef2 =
  [
    { label: '??????????????:', kind: 'longtext', name: 'lastname' },
    { label: '??????:', kind: 'longtext', name: 'firstname' },
    { label: '????????????????:', kind: 'longtext', name: 'secondname' },
    { label: '??????????????:', kind: 'number', name: 'age' },
    { label: '????????????????????????????????????:', kind: 'submit' },
  ];


function toBuild() {
  builder(formDef1);
  builder(formDef2);
}

document.getElementById('build').addEventListener('click', toBuild);