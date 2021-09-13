let countrysH = {};
const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
let updatePassword = 12345;
const stringName = 'TSVFD';
let data;

function addCountry(countryName, capitalName) {
  countrysH[countryName] = capitalName;
}

function deleteCountry(countryName) {
  delete countrysH[countryName];
}

function getCountryInfo(countryName) {
  if (countryName in countrysH)
    return 'страна: ' + countryName + ' столица: ' + countrysH[countryName];
  else
    return 'нет информации о стране ' + countryName + '!';
}

function listCountrys() {
  let res = "";
  for (var CN in countrysH)
    res += '\n' + getCountryInfo(CN);
  return res;
}

function input() {
  const countryName = prompt('Input country NAME', 'TYPE HERE');
  const capitalName = prompt('Input capita NAME', 'TYPE HERE');
  addCountry(countryName, capitalName);

  data = JSON.stringify(countrysH);

  console.log(data);
  console.log(stringName);
  updatePassword = Math.random();

  // $.ajax({
  //   url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
  //   data: { f: 'INSERT', n: stringName, v: data },
  //   success: insertionOk, error: errorHandler
  // });
  $.ajax({
    url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
    data: { f: 'LOCKGET', n: stringName, p: updatePassword },
    success: lockGetReady, error: errorHandler
  }
  );


  function lockGetReady(callresult) {
    if (callresult.error != undefined)
      alert(callresult.error);
    else {
      // нам всё равно, что было прочитано -
      // всё равно перезаписываем

      $.ajax({
        url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
        data: { f: 'UPDATE', n: stringName, v: data, p: updatePassword },
        success: updateReady, error: errorHandler
      }
      );
    }
  }
  function updateReady(d) {
  }

}

function infoGet() {
  const countryName = prompt('Input country NAME', 'TYPE HERE');
  alert(getCountryInfo(countryName));

  $.ajax({
    url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
    data: { f: 'READ', n: stringName },
    success: readOk, error: errorHandler
  });
}

function infoDel() {
  const countryName = prompt('Input country NAME', 'TYPE HERE');
  deleteCountry(countryName);
}

addCountry('Германия', 'Берлин');
addCountry('Венгрия', 'Будапешт');
addCountry('Франция', 'Париж');

// console.log("список стран:" + listCountrys());


function insertionOk() {
  console.log(data);
}

function readOk(d) {
  console.log('READ:');
  console.warn(JSON.parse(d.result));
}

function errorHandler(jqXHR, statusStr, errorStr) {
  alert(statusStr + ' ' + errorStr);
}
