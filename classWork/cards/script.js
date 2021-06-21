const app = document.querySelector('.app');
let newItemHtml = "";
const phones = [
  {
    model: "samsung",
    imgUrl: "./assets/s21.jpeg",
    color: "red",
    descriptions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam consequuntur quis velit aut facere exercitationem vel reprehenderit ab quibusdam possimus. Enim soluta qui itaque saepe, maiores doloremque aperiam dolorem a?",
    price: 100,
    sale: false
  },
  {
    model: "apple",
    imgUrl: "./assets/iphone12pro.jpeg",
    color: "blue",
    descriptions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam consequuntur quis velit aut facere exercitationem vel reprehenderit ab quibusdam possimus. Enim soluta qui itaque saepe, maiores doloremque aperiam dolorem a?",
    price: 100,
    sale: true
  },
  {
    model: "xiaomi",
    imgUrl: "./assets/m11ultra.jpeg",
    color: "white",
    descriptions: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam consequuntur quis velit aut facere exercitationem vel reprehenderit ab quibusdam possimus. Enim soluta qui itaque saepe, maiores doloremque aperiam dolorem a?",
    price: 100,
    sale: false
  }
];

for (phone of phones) {

  newItemHtml += `<div class="card" style="width: 18rem;">
  <img src="${phone.imgUrl}" class="card-img-top" alt="${phone.model}">
  <div class="card-body">
    <h5 class="card-title">${phone.model}</h5>
    <p class="card-text">${phone.descriptions}</p>
    <p class="card-text">PRICE: ${phone.price}</p>
    <a href="#" class="btn btn-primary">BUY NOW</a>
    <a href="#" class="btn btn-primary" style = "${phone.sale ? "" : "display:none"};">ON SALE</a>
  </div>
</div> `;
}

app.innerHTML = newItemHtml;
