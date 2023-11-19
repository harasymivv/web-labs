document.addEventListener("DOMContentLoaded", function () {

  checkAndHandleCookies();
  applySavedStyle();
  displayStoredList();
  
    // Iterate over sections
    for (let i = 1; i <= 4; i++) {
      let clickableText = document.getElementById(`clickableText${i}`);
      clickableText.addEventListener('click', () => toggleMenu(i));
    }

});

function hideTriangleForm() {
  let triangleForm = document.querySelector('.triangle_form');
  if (triangleForm) {
    triangleForm.style.display = 'none';
  }
}

function showTriangleForm() {
  let triangleForm = document.querySelector('.triangle_form');
  if (triangleForm) {
    triangleForm.style.display = ''; 
  }
}

function checkAndHandleCookies() {
  let hasCookies = getFromCookies("isTriangle");
  

  if (hasCookies !== null) {
    hideTriangleForm();

    let confirmDelete = confirm("На сторінці збережені дані в cookies. Бажаєте їх видалити?");

    if (confirmDelete) {

      document.cookie = "isTriangle=; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      location.reload();
      showTriangleForm();
    } else {

      alert("Для відображення форми потрібно перезавантажити сторінку і видалити cookies.");
    }
  }
}


function swapHeaderFooter() {
  let header = document.querySelector('header');
  let footer = document.querySelector('footer');

  let headerText = header.querySelector('h1').innerText;
  let footerText = footer.querySelector('h1').innerText;

  header.querySelector('h1').innerText = footerText;
  footer.querySelector('h1').innerText = headerText;
}

function calcRhombus(){
  const inpDiagonal1 = document.querySelector('.inp_first_diagonal');
  const inpDiagonal2 = document.querySelector('.inp_second_diagonal');

  let diagonal1 = Number(inpDiagonal1.value);
  let diagonal2 = Number(inpDiagonal2.value);

  let answ = (diagonal1 * diagonal2) / 2

  document.querySelector('.rhombus_answ').innerHTML = `Area of rhombus = ${answ}`;

}

function isTriangle() {

  const inpSide1 = document.querySelector('.inp_first_side');
  const inpSide2 = document.querySelector('.inp_second_side');
  const inpSide3 = document.querySelector('.inp_third_side');

  let side1 = Number(inpSide1.value);
  let side2 = Number(inpSide2.value);
  let side3 = Number(inpSide3.value);

  if (side1 + side2 > side3 && side1 + side3 > side2 && side2 + side3 > side1) {
    return true;
  } else {
    return false;
  }

}

function saveToCookies(event) {

  event.preventDefault();

  const inpSide1 = document.querySelector('.inp_first_side');
  const inpSide2 = document.querySelector('.inp_second_side');
  const inpSide3 = document.querySelector('.inp_third_side');

  if (isTriangle()){
    alert('This is a triangle')
    document.cookie = "isTriangle=This is a triangle; expires=Fri, 31 Dec 9999 23:59:59 GMT;";
  }
  else{
    alert('This isn\'t a trianglee')
    document.cookie = "isTriangle=This isn\'t a triangle; expires=Fri, 31 Dec 9999 23:59:59 GMT;";
  }
  
  inpSide1.value = '';
  inpSide2.value = '';
  inpSide3.value = '';
}


function getFromCookies(name) {
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

function applyStyle() {
  var radioButtons = document.getElementsByName('styleOption');
  var selectedStyle;

  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      selectedStyle = radioButtons[i].value;
      break;
    }
  }


  var block2 = document.getElementById('block2');
  block2.style.fontStyle = (selectedStyle === 'italic') ? 'italic' : 'normal';

  saveToLocalStorage('textStyle', selectedStyle);
}

function applySavedStyle() {

  var savedStyle = getFromLocalStorage('textStyle');


  if (savedStyle) {
    var block2 = document.getElementById('block2');
    block2.style.fontStyle = (savedStyle === 'italic') ? 'italic' : 'normal';
  }
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}



function toggleMenu(sectionNumber) {
  var menu = document.getElementById(`myMenu${sectionNumber}`);
  menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';

}

function generateNumberedList(sectionNumber) {
  var listBlock = document.getElementById(`listBlock${sectionNumber}`);
  listBlock.innerHTML = '';

  var numRows = document.getElementById(`numRows${sectionNumber}`).value;
  saveToLocalStorage(`numRows${sectionNumber}`, numRows); // Save the value to localStorage

  var ol = document.createElement('ol');
  for (var i = 1; i <= numRows; i++) {
    var li = document.createElement('li');
    li.textContent = 'Item ' + i;
    li.className = (i % 2 === 0) ? 'even' : 'odd';
    ol.appendChild(li);
  }
  listBlock.appendChild(ol);
}

function saveListToLocalStorage(sectionNumber) {
  var listItems = [];
  var list = document.getElementById(`listBlock${sectionNumber}`).querySelector('ol');
  if (list) {
    list.querySelectorAll('li').forEach(function (item) {
      listItems.push({
        content: item.textContent,
        className: item.className
      });
    });
    localStorage.setItem(`numberedList${sectionNumber}`, JSON.stringify(listItems));
    alert('List saved to LocalStorage');
  } else {
    alert('Generate the numbered list first!');
  }
}

function displayStoredList() {

  for (let sectionNumber = 1; sectionNumber <= 4; sectionNumber++) {
  var storedList = localStorage.getItem(`numberedList${sectionNumber}`);
  if (storedList) {
    storedList = JSON.parse(storedList);
    var listBlock = document.getElementById(`listBlock${sectionNumber}`);
    var ol = document.createElement('ol');
    storedList.forEach(function (item) {
      var li = document.createElement('li');
      li.textContent = item.content;
      li.className = item.className;
      ol.appendChild(li);
    });
    listBlock.appendChild(ol);
  }
}
}