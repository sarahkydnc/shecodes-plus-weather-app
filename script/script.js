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

  let icon = document.querySelector("#icon");
  let currentIcon = response.data.weather[0].icon;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${currentIcon}@2x.png`
  );
  icon.setAttribute("alt", currentIcon);

  let condition = document.querySelector(".current-condition");
  condition.innerHTML = response.data.weather[0].description;

  let temperature = document.querySelector(".current-temperature");
  celsiusTemperature = Math.round(response.data.main.temp);
  temperature.innerHTML = `${celsiusTemperature}°C`;

  let tempLow = document.querySelector(".temperature-low");
  celsiusTempLow = Math.round(response.data.main.temp_min);
  tempLow.innerHTML = `Low: ${celsiusTempLow}°`;

  let tempHigh = document.querySelector(".temperature-high");
  celsiusTempHigh = Math.round(response.data.main.temp_max);
  tempHigh.innerHTML = `High: ${celsiusTempHigh}°`;

  let feelsLike = document.querySelector(".current-feel");
  celsiusFeelsLike = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `Feels like ${celsiusFeelsLike}°`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windSpeed = document.querySelector("#wind-speed");
  metricWindSpeed = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `Wind speed: ${metricWindSpeed} km/h`;

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = `Pressure: ${response.data.main.pressure} mb`;

  getForecast(response.data.coord);
}

// Formatting forecast days of the week
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

// Return 5-day weather forecast
function displayForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecastDaily = response.data.daily;

  forecastDaily.forEach(function(forecastDay, index) {
    if (index < 6) {
      forecastHTML = forecastHTML +
      `
        <div class="col-2">
          <div class="forecast-day">${formatDay(forecastDay.dt)}</div> 
            <img 
              src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
              alt="" 
              width="48"
            />
          <div class="forecast-temprange">
            <span class="forecast-tempmax">${Math.round(forecastDay.temp.max)}°</span>
            <span class="forecast-tempmin">${Math.round(forecastDay.temp.min)}°</span>
          </div>
        </div>
      `;
    }
  })
  
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

// Forecast's coordinates retrieval and processing
function getForecast(coordinates) {
  let apiKey = `7847c8cdbdd3f4d4e829321a937f5c42`;
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
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
