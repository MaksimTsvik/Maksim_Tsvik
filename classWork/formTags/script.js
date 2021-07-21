
// function createDiv() {
//   const textData = document.querySelector('.form-control').value;
//   const content = document.createTextNode(textData);
//   const newDiv = document.createElement('div');
//   newDiv.appendChild(content);
//   document.body.appendChild(newDiv);
// }

// function strongTextF() {
//   const divs = document.querySelectorAll('div');
//   for (div of divs) {
//     div.style.fontWeight = "bold";
//   }
// }

// function emphasiseTextF() {
//   const divs = document.querySelectorAll('div');
//   for (div of divs) {
//     div.style.fontStyle = "italic";
//   }
// }

// function createP() {
//   const textData = document.querySelector('.form-control').value;
//   const content = document.createTextNode(textData);
//   const newDiv = document.createElement('p');
//   newDiv.appendChild(content);
//   document.body.appendChild(newDiv);
// }

// document.getElementById('addBtn').addEventListener('click', createDiv);
// document.getElementById('strongButton').addEventListener('click', strongTextF);
// document.getElementById('emButton').addEventListener('click', emphasiseTextF);
// document.getElementById('pTag').addEventListener('click', createP);

function createTag() {
  const textData = document.querySelector('.form-control').value;
  const content = document.createTextNode(textData);
  const newDiv = document.createElement(`${this.dataset.tag}`);
  newDiv.appendChild(content);
  document.body.appendChild(newDiv);
}

document.getElementById('addBtn').addEventListener('click', createTag);
document.getElementById('strongButton').addEventListener('click', createTag);
document.getElementById('emButton').addEventListener('click', createTag);
document.getElementById('pTag').addEventListener('click', createTag);