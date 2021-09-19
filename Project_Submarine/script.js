
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
});
window.onhashchange = switchToStateFromURLHash;

// текущее состояние приложения
// это Model из MVC

let SPAState = {};
function switchToStateFromURLHash() {
  let URLHash = window.location.hash;

  // убираем из закладки УРЛа решётку
  // (по-хорошему надо ещё убирать восклицательный знак, если есть)
  let stateStr = URLHash.substr(1);

  if (stateStr != "") { // если закладка непустая, читаем из неё состояние и отображаем
    let parts = stateStr.split("_")
    SPAState = { pagename: parts[0] }; // первая часть закладки - номер страницы
  }
  else
    SPAState = { pagename: 'Main' }; // иначе показываем главную страницу
  console.log('Новое состояние приложения:');
  console.log(SPAState);
  // обновляем вариабельную часть страницы под текущее состояние
  // это реализация View из MVC - отображение состояния модели в HTML-код
  let pageHTML = "";
  switch (SPAState.pagename) {
    case 'Main':
      pageHTML += `<input type="button" class="start" value="START" onclick="switchToGamePage()">`;
      break;
    case 'Game':
      pageHTML += `
        <canvas id="submarine" width="320" height="480">
        Sorry! Update your browser first!
        </canvas>
        <input type="button" class="back" value="BACK" onclick="switchToMainPage()">
        `
      break;
  }
  document.querySelector('.wrapper').innerHTML = pageHTML;

}

// устанавливает в закладке УРЛа новое состояние приложения
// и затем устанавливает+отображает это состояние
function switchToState(newState) {
  // устанавливаем закладку УРЛа
  // нужно для правильной работы кнопок навигации браузера
  // (т.к. записывается новый элемент истории просмотренных страниц)
  // и для возможности передачи УРЛа другим лицам
  const stateStr = newState.pagename;
  location.hash = stateStr;
  // АВТОМАТИЧЕСКИ вызовется switchToStateFromURLHash()
  // т.к. закладка УРЛа изменилась (ЕСЛИ она действительно изменилась)
}

function switchToMainPage() {
  switchToState({ pagename: 'Main' });
}

function switchToGamePage() {
  switchToState({ pagename: 'Game' });
}

// переключаемся в состояние, которое сейчас прописано в закладке УРЛ
switchToStateFromURLHash();