let countrysH = {};

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
}

function infoGet() {
  const countryName = prompt('Input country NAME', 'TYPE HERE');
  alert(getCountryInfo(countryName));
}

function infoDel() {
  const countryName = prompt('Input country NAME', 'TYPE HERE');
  deleteCountry(countryName);
}

addCountry('Германия', 'Берлин');
addCountry('Венгрия', 'Будапешт');
addCountry('Франция', 'Париж');

console.log("список стран:" + listCountrys());