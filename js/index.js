let search = document.getElementById("search");
let searchBtn = document.getElementById("searchBtn");
let today = document.querySelector(".today");
let tomorrow = document.querySelector(".tomorrow");
let afterTomorrow = document.querySelector(".after-tomorrow");
// arrays of month and days========================================
const months = [
  "January",
  "February",
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
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// search value=========================

search.addEventListener("input", function () {
  weather(search.value);
});
searchBtn.addEventListener("click", function () {
  weather(search.value);
});
// facth api weather============================================================

async function weather(key) {
  let Wapi = `https://api.weatherapi.com/v1/forecast.json?key=e8b94f89f3b642d4922105749230308&q=${key}&days=3`;
  let response = await fetch(Wapi);
  let data = await response.json();
  let location = data.location.name;
  let goubleDateArray = data.forecast.forecastday;
  display(location, goubleDateArray);
  return data;
}
// display data for api for 3day  =================================================================

function display(location, gda) {
  let date0 = new Date(gda[0].date);
  let date1 = new Date(gda[1].date);
  let date2 = new Date(gda[2].date);

  // add data to today weather
  let todayBox = `
  <div class="leyer">
  <div class="date d-flex align-items-center justify-content-between p-2 bg-light-subtle shadow-sm">
  <span>${days[date0.getDay()]}</span>
  <span>${date0.getDate()} ${months[date0.getMonth()]}</span>
  </div>
  <div class="today-body mt-4 py-4 p-3">
  <p class="">${location}</p>
  <div class="degree-Image d-flex align-items-center">
  <h2 class="h1 my-3">${gda[0].day.maxtemp_c}<sup>o</sup>C</h2>
  <div class="degreeImg ps-2">
  <img src="${gda[0].day.condition.icon}" alt="">
  </div>
  </div>
  <p class="condition text-primary mb-4">${gda[0].day.condition.text}</p>
  <ul class="d-flex align-items-center list-unstyled ">
  <li class="pe-2 "> <img src="imgs/icon-umberella.png" alt=""><span class="ps-2 ">20%</span>
  </li>
  <li class="pe-2"> <img src="imgs/icon-wind.png" alt=""><span class="ps-2 ">18km/h</span></li>
  <li class="pe-2"> <img src="imgs/icon-compass.png" alt=""><span class="ps-2 ">East</span></li>
  </ul>
  </div>
  </div>
  `;
  today.innerHTML = todayBox;
  // add data to tomorrow weather=====================================================

  let tomorrowBox = `
    <div class="leyer">
      <div class="date  d-flex align-items-center justify-content-between p-2 shadow-sm">
        <span>${days[date1.getDay()]}</span>
        <span>${date1.getDate()} ${months[date1.getMonth()]}</span>
      </div>
      <div class="tomorrow-body mt-4 py-4 p-3">
        <div class="degree-Image d-flex flex-column text-center align-items-center justify-content-center">
          <div class="degreeImg ps-2">
            <img class="w-100" src="${gda[1].day.condition.icon}" alt="">
          </div>
          <h2 class="h2 my-2">${gda[1].day.maxtemp_c}<sup>o</sup>C</h2>
          <p class="h5 mb-3">${gda[1].day.mintemp_c}<sup>o</sup>C</p>
          <p class="condition text-primary">${gda[1].day.condition.text}</p>
        </div>
      </div>
    </div>
  `;
  tomorrow.innerHTML = tomorrowBox;
  // add data to after Tomorrow weather=================================================

  let afterTomorrowBox = `
    <div class="leyer">
      <div class="date  d-flex align-items-center justify-content-between p-2 shadow-sm">
        <span>${days[date2.getDay()]}</span>
        <span>${date2.getDate()} ${months[date2.getMonth()]}</span>
      </div>
      <div class="tomorrow-body mt-4 py-4 p-3">
        <div class="degree-Image d-flex flex-column text-center align-items-center justify-content-center">
          <div class="degreeImg ps-2">
            <img class="w-100" src="${gda[2].day.condition.icon}" alt="">
          </div>
          <h2 class="h2 my-2">${gda[2].day.maxtemp_c}<sup>o</sup>C</h2>
          <p class="h5 mb-3">${gda[2].day.mintemp_c}<sup>o</sup>C</p>
          <p class="condition text-primary">${gda[2].day.condition.text}</p>
        </div>
      </div>
    </div>
  `;
  afterTomorrow.innerHTML = afterTomorrowBox;
}

// chech if browser does  support geolocation api
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, erorr);
} else {
  alert("your browser does not support geolocation api");
}
// if browser support geolocation api
async function success(pos) {
  let longit = pos.coords.longitude;
  let latit = pos.coords.latitude;
  let geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latit}&longitude=${longit}&localityLanguage=en`;
  await getLocation(geoApiUrl);
}
// if browser block location=========================
function erorr() {
  alert(`we couldn't  get your current location`);
  weather("cairo");
}
// facth api geolocation============================================================

async function getLocation(url) {
  let response = await fetch(url);
  let data = await response.json();
  await weather(data.city);
}
