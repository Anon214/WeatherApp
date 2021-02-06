const api = {
  key: "33ec87d1af3e5db1353e3c7d5f44d8a1",
  base: "https://api.openweathermap.org/data/2.5/",
};
//initialize objects
const searchbox = document.querySelector(".inputBox");
const city = document.querySelector(".city");
const date = document.querySelector(".date");
const bigTemp = document.querySelector(".temp span");
const desc = document.querySelector(".description");
const hiLow = document.querySelector(".hi-low");

searchbox.addEventListener("keypress", query);

//implementing date
var today = new Date();
var day = today.getDate();
var month = today.getMonth();
var year = today.getFullYear();

let monthNames = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

date.innerText = monthNames[month] + " " + day + ", " + year;

//searching for api after enter
function query(event) {
  if (event.keyCode == "13") {
    if (/^\d+$/.test(searchbox.value) == true) {
      zipFunc();
    } else if (searchbox.value.includes(",")) {
      abreviationCombo();
    } else {
      fetch(
        `${api.base}weather?q=${searchbox.value}&units=imperial&appid=${api.key}`
      )
        .then((weather) => weather.json())
        .then(execInput)
        .catch((e) => alert("Warning: " + e));
    }
  }
}
//ZIP FUNCITON
function zipFunc() {
  fetch(
    `${api.base}weather?zip=${searchbox.value}&units=imperial&appid=${api.key}`
  )
    .then((weather) => weather.json())
    .then(execInput)
    .catch((e) => alert("Warning: " + e));
}

//ABREVIATION FUNCTION
function abreviationCombo() {
  let x = searchbox.value.split(",");
  fetch(`${api.base}find?q=${x[0]}&units=imperial&appid=${api.key}`)
    .then((weather) => weather.json())
    .then(execSearch)
    .catch((e) => console.log(e));
}

//SEARCHER
function execInput(weather) {
  city.innerText = weather.name + ", " + weather.sys.country;
  bigTemp.innerText = Math.round(weather.main.temp);
  desc.innerText = weather.weather[0].main;
  hiLow.innerText =
    Math.round(weather.main.temp_min) +
    "°F / " +
    Math.round(weather.main.temp_max) +
    "°F";
}

//ABREVIATION SEARCH
function execSearch(weather) {
  let y = searchbox.value.split(",");
  let listArray = [];
  let set = new Set(listArray);
  var val = 0;

  for (var i = 0; i < weather.list.length; i++) {
    if (y[0].trim() != weather.list[i].name) {
    } else {
      if (y[1].trim() == weather.list[i].sys.country) {
        val = i;
        break;
      }
    }
  }

  execInput(weather.list[val]);
}
