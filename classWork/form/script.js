const app = document.querySelector('.app');
let newItemHtml = "";
let phones = [];

let imgUrl = document.getElementById('iUrl');
let brand = document.getElementById('bName');
let model = document.getElementById('pModel');
let price = document.getElementById('pPrice');
let sale = document.getElementById('onSale');

function pushItem(imgUrl, brand, model, price, sale) {
  phones.push({ imgUrl: imgUrl.value, brand: brand.value, model: model.value, price: price.value, sale: sale.checked })
  console.log(phones);
}

function clearing() {
  newItemHtml = "";
}

function rendering() {
  clearing();
  for (phone of phones) {
    newItemHtml += `<div class="card" style="width: 18rem;">
    <img src="${phone.imgUrl}" class="card-img-top" alt="${phone.brand}">
    <div class="card-body">
      <h5 class="card-title">${phone.model}</h5>
      <p class="card-text">PRICE: ${phone.price}</p>
      <a href="#" class="btn btn-primary">BUY NOW</a>
      <a href="#" class="btn btn-primary" style = "${phone.sale ? "" : "display:none"};">ON SALE</a>
    </div>
  </div> `;
  }
  app.innerHTML = newItemHtml;
}