// function fieldInspection() {
//   let self = this;

//   switch (self.type) {

//     case ("url"):
//     case ("date"):
//     case ("email"):
//       if ((!self.checkValidity() || !self.value) && self.nextElementSibling) { break }
//       else if (!self.checkValidity() || !self.value) {
//         addWarning(self)
//       }
//       else while (self.nextElementSibling) {
//         removeWarning(self)
//       }
//       break;

//     case ("text"):
//       if ((!self.value || self.value.length > 20) && self.nextElementSibling) { break }
//       else if (!self.value || self.value.length > 20) {
//         addWarning(self)
//       }
//       else while (self.nextElementSibling) {
//         removeWarning(self)
//       }
//       break;

//     case ("number"):
//       if ((!self.value) && self.nextElementSibling) { break }
//       else if (!self.value) {
//         addWarning(self)
//       }
//       else while (self.nextElementSibling) {
//         removeWarning(self)
//       }
//       break;

//     case ("checkbox"):
//       if (!self.checked && self.nextElementSibling) { break }
//       else if (!self.checked) {
//         addWarning(self)
//       }
//       else while (self.nextElementSibling) {
//         removeWarning(self)
//       }
//       break;
//   }
// }

const formTag = document.forms.testForm; // get the form

const devellopers = formTag.elements.author // get devs field
const siteName = formTag.elements.title // get site name field
const siteUrl = formTag.elements.siteUrl // get url field
const startdate = formTag.elements.startdate // get startdate field
const persons = formTag.elements.persons // get persons field
const email = formTag.elements.email // get email field
const rubric = formTag.elements.rubric // get rubric select
const public = formTag.elements.public // get public input
const comments = formTag.elements.comments // get comments checkbox
const article = formTag.elements.article // get textarea field

devellopers.addEventListener('focusout', devInsp);
siteName.addEventListener('focusout', siteNameInsp);
siteUrl.addEventListener('focusout', siteUrlInsp);
startdate.addEventListener('focusout', startdateInsp);
persons.addEventListener('focusout', personsInsp);
email.addEventListener('focusout', emailInsp);
// rubric not used on focusout
// public not used on focusout
comments.addEventListener('focusout', commentsInsp);
article.addEventListener('focusout', articleInsp);

function devInsp() {
  if ((!devellopers.value || devellopers.value.length > 20) && devellopers.nextElementSibling) { return false }
  else if (!devellopers.value || devellopers.value.length > 20) {
    addWarning(devellopers);
    console.log("false");
    return false;
  }
  else {
    removeWarning(devellopers);
    return true
  }
}
function siteNameInsp() {
  if ((!siteName.value || siteName.value.length > 20) && siteName.nextElementSibling) { return false }
  else if (!siteName.value || siteName.value.length > 20) {
    addWarning(siteName);
    console.log("false");
    return false;
  }
  else {
    removeWarning(siteName);
    return true;
  }
}
function siteUrlInsp() {
  if ((!siteUrl.checkValidity() || !siteUrl.value) && siteUrl.nextElementSibling) { return false }
  else if (!siteUrl.checkValidity() || !siteUrl.value) {
    addWarning(siteUrl);
    return false
  }
  else {
    removeWarning(siteUrl);
    return true
  }
}
function startdateInsp() {
  if ((!startdate.checkValidity() || !startdate.value) && startdate.nextElementSibling) { return false }
  else if (!startdate.checkValidity() || !startdate.value) {
    addWarning(startdate);
    return false;
  }
  else {
    removeWarning(startdate);
    return true;
  }
}
function personsInsp() {
  if ((!persons.value) && persons.nextElementSibling) { return false }
  else if (!persons.value) {
    addWarning(persons);
    return false;
  }
  else {
    removeWarning(persons);
    return true;
  }
}
function emailInsp() {
  if ((!email.checkValidity() || !email.value) && email.nextElementSibling) { return false }
  else if (!email.checkValidity() || !email.value) {
    addWarning(email);
    return false
  }
  else {
    removeWarning(email);
    return true
  }
}
function commentsInsp() {
  if (!comments.checked && comments.nextElementSibling) { return false }
  else if (!comments.checked) {
    addWarning(comments);
    return false;
  }
  else {
    removeWarning(comments);
    return true;
  }
}
function articleInsp() {
  if ((!article.value || article.value.length < 20) && article.nextElementSibling) { return false }
  else if (!article.value || article.value.length < 20) {
    addWarning(article);
    return false;
  }
  else {
    removeWarning(article);
    return true;
  }
}


function addWarning(self) {
  let newElem = document.createElement('span');
  let newElemText = document.createTextNode(' INCORRECT INPUT VALUE')
  newElem.append(newElemText);
  newElem.style.color = 'red';
  self.after(newElem);
}
function removeWarning(self) {
  if (self.nextElementSibling) {
    self.nextElementSibling.remove();
  }
}

formTag.addEventListener('submit', validation);

function validation(e) {
  e = e || window.event;
  // inspection for each field validation

  devInsp();
  siteNameInsp();
  siteUrlInsp();
  startdateInsp();
  personsInsp();
  emailInsp();
  commentsInsp();
  articleInsp();

  try {
    if (!devInsp()) {
      devellopers.focus();
      e.preventDefault();
      return;
    }
    if (!siteNameInsp()) {
      siteName.focus();
      e.preventDefault()
      return
    }
    if (!siteUrlInsp()) {
      siteUrl.focus();
      e.preventDefault();
      return;
    }
    if (!startdateInsp()) {
      startdate.focus();
      e.preventDefault();
      return;
    }
    if (!personsInsp()) {
      persons.focus();
      e.preventDefault()
      return
    }
    if (!emailInsp()) {
      email.focus();
      e.preventDefault();
      return;
    }
    if (!commentsInsp()) {
      comments.focus();
      e.preventDefault();
      return;
    }
    if (!articleInsp()) {
      article.focus();
      e.preventDefault();
      return;
    }
    if (rubric.value == 3) {
      alert('Please select another catalog rubric')
      rubric.scrollIntoView();
      e.preventDefault();
      return;
    }
  }
  catch (ex) {
    alert('Some error in form appears, plese recheck');
    e.preventDefault();
  }
}