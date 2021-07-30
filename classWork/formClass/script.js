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
      newItemHtml += `<div class="card" style="width: 18rem;" data-idCont="${phone.id}">
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

window.addEventListener("click", function (e) {
  let index = e.target.dataset.id;
  if (index) {
    phones = phones.filter(item => item.id != index);
    mobilePhone.render();
  }
});

document.querySelector('.app').addEventListener('mousedown', dragging);// select container with cards

function dragging() {
  var balls = document.querySelectorAll('.card');
  console.log(balls)
  balls.forEach(ball => {
    ball.onmousedown = function (e) {

      let coords = getCoords(ball);
      let shiftX = e.pageX - coords.left;
      let shiftY = e.pageY - coords.top;

      ball.style.position = 'absolute';
      document.body.appendChild(ball);
      moveAt(e);

      ball.style.zIndex = 1000; // над другими элементами

      function moveAt(e) {
        ball.style.left = e.pageX - shiftX + 'px';
        ball.style.top = e.pageY - shiftY + 'px';
      }

      document.onmousemove = function (e) {
        moveAt(e);
      };

      ball.onmouseup = function () {
        document.onmousemove = null;
        ball.onmouseup = null;
        ball.style.position = 'relative';
      };

    }

    ball.ondragstart = function () {
      return false;
    };

    function getCoords(elem) {   // кроме IE8-
      let box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }
  })
}


