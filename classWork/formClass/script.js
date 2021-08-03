const app = document.querySelector(".app");
let phones = [{ "imgUrl": "https://content2.onliner.by/catalog/device/header@2/751e57c3ea68eb504fed4f16066f77e7.jpeg", "brand": 'Samsung', "model": 'S21', "price": '2100', "sale": true, "id": '0' },
{ "imgUrl": "https://content2.onliner.by/catalog/device/header@2/e2189f90f9088975c553ec33431fc186.jpeg", "brand": 'Apple', "model": "11 64GB", "price": '1670', "sale": true, "id": '1' },
{ "imgUrl": "https://content2.onliner.by/catalog/device/header@2/7d15facb87374d6519bc391445db281c.jpeg", "brand": 'Xiaomi', "model": "Redmi Note 10S", "price": '639', "sale": false, "id": '2' },
];
let id = 3;

class MobilePhone {

  pushItem() {
    const imgUrl = document.getElementById("iUrl");
    const brand = document.getElementById("bName");
    const model = document.getElementById("pModel");
    const price = document.getElementById("pPrice");
    const sale = document.getElementById("onSale");

    phones.push({ "imgUrl": imgUrl.value, "brand": brand.value, "model": model.value, "price": price.value, "sale": sale.checked, "id": id })

    id++;
  }

  clearScr() {
    app.innerHTML = "";
  }

  render() {
    let newItemHtml = "";
    for (let phone of phones) {
      newItemHtml += `<div class="card" style="width: 18rem;" data-id="${phone.id}" draggable="true">
      <img src="${phone.imgUrl}" class="card-img-top" alt="${phone.brand}" draggable="false">
      <div class="card-body">
        <h5 class="card-title">${phone.model}</h5>
        <p class="card-text">PRICE: ${phone.price}</p>
        <a href="#" class="btn btn-primary" draggable="false">BUY NOW</a>
        <a href="#" class="btn btn-primary" draggable="false" style = "${phone.sale ? "" : "display:none"};">ON SALE</a>
        <hr>
        <button type="button" class="btn btn-secondary btn-lg" data-id="${phone.id}">DELETE</button>
      </div>
    </div> `;
    }
    app.innerHTML = newItemHtml;
  }

}

let mobilePhone = new MobilePhone();
mobilePhone.render();

document.getElementById("addBtn").addEventListener("click", mobilePhone.pushItem);
document.getElementById("clearScrBtn").addEventListener("click", mobilePhone.clearScr);
document.getElementById("renderBtn").addEventListener("click", mobilePhone.render);

window.addEventListener("click", function (e) {  //delete an item via DELETE button
  let index = e.target.dataset.id;
  if (index) {
    phones = phones.filter(item => item.id != index);
    mobilePhone.render();
  }
});

const basket = document.querySelector(".basket"); //find basket (shopping cart) - place where to add drop listener
const totalPrice = document.querySelector(".total_price"); //
const itemsCount = document.querySelector('.basket_nmb')

const trash = document.querySelector('.trash');
const trashCount = document.querySelector('.trash_nmb');

let itemId = null;
let priceCount = 0;
let itemsCounter = 0;
let trashCounter = 0;

document.addEventListener("dragstart", function (ev) {
  itemId = ev.target.dataset.id;
});

document.addEventListener("dragover", function (ev) {
  ev.preventDefault();
});

basket.addEventListener("drop", function (ev) {
  for (let phone of phones) {
    if (phone.id == itemId) {
      itemsCounter++;
      itemsCount.innerHTML = itemsCounter;
      priceCount += +phone.price;
      totalPrice.innerHTML = priceCount + " $";

      const itemBlock = document.createElement("div");
      const title = document.createElement("p");
      title.innerHTML = phone.brand + " " + phone.model + " - " + phone.price + "$";
      itemBlock.appendChild(title);
      this.appendChild(itemBlock);
    }
  }
});

trash.addEventListener("drop", function (ev) {
  for (let phone of phones) {
    if (phone.id == itemId) {
      trashCounter++;
      trashCount.innerHTML = trashCounter;

      phones = phones.filter(item => item.id != phone.id);
      mobilePhone.render();
    }
  }
});