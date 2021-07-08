"use strict";

class HashStorageFunc {

  addValue(key, value) {
    this[key] = value;
  }

  getValue(key) {
    return this[key];
  }

  deleteValue(key) {
    if (key in this) {
      return (delete this[key]);
    }
    return false;
  }

  getKeys() {
    let keysArr = [];
    for (let key in this) {
      keysArr.push(key);
    }
    return keysArr;
  }
}

//Create an object
const drinkStorage = new HashStorageFunc();

//Find each button
const addBtn = document.getElementById("addBtn");
const getBtn = document.getElementById("getBtn");
const deleteBtn = document.getElementById("deleteBtn");
const listBtn = document.getElementById("listBtn");

//Find html markup position
const app = document.querySelector(".app");

//Create listeners on each button
addBtn.addEventListener("click", addDrink);
getBtn.addEventListener("click", getDrink);
deleteBtn.addEventListener("click", deleteDrink);
listBtn.addEventListener("click", listDrink);

function addDrink() {
  const name = prompt('Input drink NAME', "Type HERE");
  const alcohol = confirm("Is it with alcohol?") ? "YES" : "NO";
  const reciepe = prompt("Input a receipe", "Type HERE");
  //Adding new drink
  drinkStorage.addValue(name, { "Is it with alcohol": alcohol, "How to mix it": reciepe });
  console.log(drinkStorage)
}

function getDrink() {
  const name = prompt('Input drink NAME', "Type HERE");

  if (!(name in drinkStorage)) {
    return alert("NO SUCH DRINK!");
  }
  //Get correct drink object
  let drinkProp = drinkStorage.getValue(name);
  alert(`Drink ${name}:
Is it with alcohol: ${drinkProp["Is it with alcohol"]}
How to mix it: ${drinkProp["How to mix it"]}`)
}

function deleteDrink() {
  const name = prompt('Input drink NAME', "Type HERE");
  if (drinkStorage.deleteValue(name)) alert("DELETED");
  else alert("NO SUCH DRINK!");
  console.log(drinkStorage);
}

function listDrink() {
  alert(`${drinkStorage.getKeys()}`);
}