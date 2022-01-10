// Current Date and Time
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
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
let month = months[now.getMonth()];

let date = now.getDate();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let year = now.getFullYear();

let timeDate = document.querySelector(".current-date");
timeDate.innerHTML = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}`;

// Location searchbar
function formSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#find-input").value;
  searchCity(city);
}

let findCityForm = document.querySelector("#find-city-form");
findCityForm.addEventListener("submit", formSubmit);

// Current Weather Stats
function showWeather(response) {
  console.log(response.data);
  // Display Live Information
  let city = document.querySelector(".current-city");
  city.innerHTML = response.data.name;

  let condition = document.querySelector(".current-condition");
  condition.innerHTML = response.data.weather[0].description;

  let roundedTemperature = Math.round(response.data.main.temp) + `°`;
  let temperature = document.querySelector(".current-temperature");
  temperature.innerHTML = roundedTemperature;

  let roundedTempLow = Math.round(response.data.main.temp_min) + `°`;
  let tempLow = document.querySelector(".temperature-low");
  tempLow.innerHTML = `Low: ${roundedTempLow}`;

  let roundedTempHigh = Math.round(response.data.main.temp_max) + `°`;
  let tempHigh = document.querySelector(".temperature-high");
  tempHigh.innerHTML = `High: ${roundedTempHigh}`;

  let roundedFeelsLike = Math.round(response.data.main.feels_like) + `°`;
  let feelsLike = document.querySelector(".current-feel");
  feelsLike.innerHTML = `Feels like ${roundedFeelsLike}`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let roundedWindSpeed = Math.round(response.data.wind.speed) + ` km/h`;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `Wind speed: ${roundedWindSpeed}`;

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = `Pressure: ${response.data.main.pressure} mb`;

  // Metric-Imperial Conversion of Weather Stats
  let metric = document.querySelector("#unit-celsius");
  let imperial = document.querySelector("#unit-fahrenheit");

  function convertImperial(event) {
    event.preventDefault();
    temperature.innerHTML =
      Math.round(response.data.main.temp * 1.8 + 32) + `°`;
    tempLow.innerHTML =
      `Low: ` + Math.round(response.data.main.temp_min * 1.8 + 32) + `°`;
    tempHigh.innerHTML =
      `High: ` + Math.round(response.data.main.temp_max * 1.8 + 32) + `°`;
    feelsLike.innerHTML =
      `Feels like ` +
      Math.round(response.data.main.feels_like * 1.8 + 32) +
      `°`;
    windSpeed.innerHTML =
      `Wind speed: ` + Math.round(response.data.wind.speed / 1.609) + ` mph`;
  }
  imperial.addEventListener("click", convertImperial);

  function convertMetric(event) {
    event.preventDefault();
    temperature.innerHTML = roundedTemperature;
    tempLow.innerHTML = `Low: ${roundedTempLow}`;
    tempHigh.innerHTML = `High: ${roundedTempHigh}`;
    feelsLike.innerHTML = `Feels like ${roundedFeelsLike}`;
    windSpeed.innerHTML = `Wind speed: ${roundedWindSpeed}`;
  }
  metric.addEventListener("click", convertMetric);
}

// Find local weather via city declaration
function searchCity(city) {
  let weatherAPIKey = "7847c8cdbdd3f4d4e829321a937f5c42";
  let cityAPIEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let cityAPIUrl = `${cityAPIEndpoint}?q=${city}&appid=${weatherAPIKey}&units=metric`;

  axios.get(`${cityAPIUrl}`).then(showWeather);
}

// Find local weather via location tracking
function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let weatherAPIKey = "7847c8cdbdd3f4d4e829321a937f5c42";
  let locAPIEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let locAPIUrl = `${locAPIEndpoint}?lat=${latitude}&lon=${longitude}&appid=${weatherAPIKey}&units=metric`;

  axios.get(locAPIUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

// Current location declaration, upon page load
function loadLocation() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}
window.onload = loadLocation();
