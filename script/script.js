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
    `media/icons/${currentIcon}.svg`
  );
  icon.setAttribute("alt", currentIcon);

  let condition = document.querySelector(".current-condition");
  condition.innerHTML = response.data.weather[0].description;

  let temperature = document.querySelector(".current-temperature");
  roundedTemperature = Math.round(response.data.main.temp);
  temperature.innerHTML = `${roundedTemperature}°C`;

  let tempLow = document.querySelector(".temperature-low");
  roundedTempLow = Math.round(response.data.main.temp_min);
  tempLow.innerHTML = `Low: ${roundedTempLow}°`;

  let tempHigh = document.querySelector(".temperature-high");
  roundedTempHigh = Math.round(response.data.main.temp_max);
  tempHigh.innerHTML = `High: ${roundedTempHigh}°`;

  let feelsLike = document.querySelector(".current-feel");
  roundedFeelsLike = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `Feels like ${roundedFeelsLike}°`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windSpeed = document.querySelector("#wind-speed");
  roundedWindSpeed = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `Wind speed: ${roundedWindSpeed} km/h`;

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = `Pressure: ${response.data.main.pressure} mb`;

  getForecast(response.data.coord);
  getMusic(response.data.main.temp);
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
              src="media/icons/${forecastDay.weather[0].icon}.svg" 
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

// Spotify music recommendation, based on current weather
function displayMusic(response) {
  let spotify = document.querySelector(".spotify");
  let musicHTML = `<div class="row">`;
  let currentTemp = Math.round(response.data.main.temp);

  if (currentTemp < 11) {
    musicHTML = musicHTML +
    `
      <p class="music-greeting">
        Weather's getting a lil chilly?
      <br />
      <span style="color: #0466c8; font-size: 20px; font-weight: bold">
        Here's some cozy tunes to get you going. 😌🎧
      </span>
      </p>
      <iframe
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DXa8axQnFlj0R?utm_source=generator"
        width="100%"
        height="80"
        frameborder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
      </iframe>
  `;
  } else {
    if (currentTemp > 30) {
    musicHTML = musicHTML +
    `
      <p class="music-greeting">
        Sun's out fun's out!
      <br />
      <span style="color: #0466c8; font-size: 20px; font-weight: bold">
        Groove along to these vibey beats. 😎🎧
      </span>
      </p>
      <iframe
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DX1gRalH1mWrP?utm_source=generator&theme=0"
        width="100%"
        height="80"
        frameBorder="0" 
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
      </iframe>
    `;
    } else {
      musicHTML = musicHTML +
      `
        <p class="music-greeting">
          Weather seems fine alright!
        <br />
        <span style="color: #0466c8; font-size: 20px; font-weight: bold">
          Enjoy you day with these tasty tracks. 🙂🎧
        </span>
        </p>
        <iframe 
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DX9XIFQuFvzM4?utm_source=generator&theme=0" 
          width="100%" 
          height="80" 
          frameBorder="0" 
          allowfullscreen="" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
        </iframe>
      `;

    }
  }
  musicHTML = musicHTML + `</div>`;
  spotify.innerHTML = musicHTML;
}

// Music player's local temperature retrieval
function getMusic(temperature) {
  let weatherAPIKey = "7847c8cdbdd3f4d4e829321a937f5c42";
  let cityAPIEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let cityAPIUrl = `${cityAPIEndpoint}?q=${temperature}&appid=${weatherAPIKey}&units=metric`;

  axios.get(`${cityAPIUrl}`).then(displayMusic);
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
