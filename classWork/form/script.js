const app = document.querySelector(".app");
let phones = [];
let id = 0;

function pushItem() {
  const imgUrl = document.getElementById("iUrl");
  const brand = document.getElementById("bName");
  const model = document.getElementById("pModel");
  const price = document.getElementById("pPrice");
  const sale = document.getElementById("onSale");

  phones.push({ "imgUrl": imgUrl.value, "brand": brand.value, "model": model.value, "price": price.value, "sale": sale.checked, "id": id })

  id++;
}

function clearScr() {
  app.innerHTML = "";
}

function render() {
  let newItemHtml = "";
  for (phone of phones) {
    newItemHtml += `<div class="card" style="width: 18rem;">
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

document.getElementById("addBtn").addEventListener("click", pushItem);
document.getElementById("clearScrBtn").addEventListener("click", clearScr);
document.getElementById("renderBtn").addEventListener("click", render);

window.addEventListener("click", function (e) {
  let index = e.target.dataset.id;
  if (index !== undefined) {
    phones = phones.filter(item => item.id != index);
    render();
  }
});

