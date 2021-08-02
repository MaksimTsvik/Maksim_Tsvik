const app = document.querySelector(".app");
let phones = [];
let id = 0;

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
      <img src="${phone.imgUrl}" class="card-img-top" alt="${phone.brand}">
      <div class="card-body">
        <h5 class="card-title">${phone.model}</h5>
        <p class="card-text">PRICE: ${phone.price}</p>
        <a href="#" class="btn btn-primary">BUY NOW</a>
        <a href="#" class="btn btn-primary" style = "${phone.sale ? "" : "display:none"};">ON SALE</a>
        <hr>
        <button type="button" class="btn btn-secondary btn-lg" data-id="${phone.id}">DELETE</button>
      </div>
    </div> `;
    }
    app.innerHTML = newItemHtml;
  }

}

let mobilePhone = new MobilePhone();


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

const basket = document.querySelector(".basket"); //find basket - place where to add drop listener
const totalPrice = document.querySelector(".total_price"); //
const itemsCount = document.querySelector('.basket_nmb')
let itemId = null;
let priceCount = 0;
let itemsCounter = 0;

document.addEventListener("dragstart", function (ev) {
  itemId = ev.target.dataset.id;
});

document.addEventListener("dragover", function (ev) {
  ev.preventDefault();
});

basket.addEventListener("drop", function (ev) {
  itemsCounter++;
  itemsCount.innerHTML = itemsCounter;

  for (let phone of phones) {
    if (phone.id == itemId) {
      priceCount += +phone.price;
    }
  }

  totalPrice.innerHTML = priceCount + " $";
});
