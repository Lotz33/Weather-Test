///////////////////////// SHOW DATE

function changeDate() {
  let now = new Date();
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let day = days[now.getDay()];
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

  dateTime.innerHTML = `${day}  |   ${time}`;
}

changeDate();

///////////////////////// SEARCH

function search(city) {
  let apiKey = "5a7957f3b705a03d6f7c072ce3f964e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  axios.get(`${apiUrl}q=${city}&units=metric&appid=${apiKey}`).then(showTemp);
}

function showTemp(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  // console.log(temp);
  let cityName = response.data.name;
  document.querySelector("#degrees").innerHTML = `${temp}`;
  document.querySelector("#city-name").innerHTML = `${cityName}`;
  document.querySelector("#rain-question").innerHTML = `Is it currently raining in ${cityName} ?`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
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

search("London, uk");

///////////////////////// CONVERT TEMP UNITS

// function convertToFahrenheit(event) {
//   event.preventDefault();
//   let tempElement = document.querySelector("#temperature");
//   let temp = tempElement.innerHTML;
//   tempElement.innerHTML = Math.round((temp * 9) / 5 + 32);
// }

// function convertToCelsius(event) {
//   event.preventDefault();
//   let tempElement = document.querySelector("#temperature");
//   tempElement.innerHTML = 18;
// }

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", convertToFahrenheit);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", convertToCelsius);
