///////////////////////// SHOW DATE

function changeDate() {
  let now = new Date();
  console.log(now);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[now.getDay()];
  console.log(day);
  let h = now.getHours();
  if (h < 10) {
    h = `0${h}`;
  }
  let m = now.getMinutes();
  if (m < 10) {
    m = `0${m}`;
  }
  let time = h + ":" + m;

  let dateTime = document.querySelector("#date-time");

  dateTime.innerHTML = `Last updated: ${day}  |   ${time}`;
}

changeDate();

///////////////////////// SEARCH
function formatHours(timestamp) {
  let now = new Date(timestamp);
  let h = now.getHours();
  if (h < 10) {
    h = `0${h}`;
  }
  let m = now.getMinutes();
  if (m < 10) {
    m = `0${m}`;
  }

  return `${h}:${m}`;
}

function showForecast(response) {
  // console.log(response.data);
  let forecast = null;
  document.querySelector("#forecast").innerHTML = null;

  for (let i = 0; i <= 5; i++) {
    forecast = response.data.list[i];

    document.querySelector("#forecast").innerHTML += `
 
    <td>${formatHours(forecast.dt * 1000)}</td>
    <td >${Math.round(forecast.main.temp_max)}°C | ${Math.round(forecast.main.temp_min)}°C</td>
    <td><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" id="icon2" class="float-right"/></td>
  
  `;
  }
}
function search(city) {
  let apiKey = "5a7957f3b705a03d6f7c072ce3f964e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  axios.get(`${apiUrl}q=${city}&units=metric&appid=${apiKey}`).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?`;
  axios.get(`${apiUrl}q=${city}&units=metric&appid=${apiKey}`).then(showForecast);
}

function showTemp(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  // console.log(temp);
  let cityName = response.data.name;
  celsiusTemp = response.data.main.temp;

  document.querySelector("#degrees").innerHTML = `${temp}`;
  document.querySelector("#city-name").innerHTML = `${cityName}`;
  document.querySelector("#rain-question").innerHTML = `Is it currently raining in ${cityName} ?`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#high").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#low").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#icon1").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon1").setAttribute("alt", response.data.weather[0].description);

  let weather = response.data.weather[0].main;

  if (weather === "Rain") {
    document.querySelector("#rain-response").innerHTML = `<strong>Yes</strong>, take a brolly! <i class="fas fa-umbrella"></i>`;
  } else {
    document.querySelector("#rain-response").innerHTML = `<strong>Not at the moment</strong>, but check the forecast.</i>`;
  }
}

function input(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

let form = document.querySelector("#form-search");
form.addEventListener("submit", input);

///////////////////////// OPEN WEATHER API LAT/LON Button

function showLocation(position) {
  let apiKey = "5a7957f3b705a03d6f7c072ce3f964e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);

  axios.get(`${apiUrl}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`).then(showTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("#location");
button.addEventListener("click", getCurrentPosition);

///////////////////////// CONVERT TEMP UNITS

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#degrees");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  tempElement.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#degrees");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

search("London, uk");

///////////////////////// IS IT RAINING?
