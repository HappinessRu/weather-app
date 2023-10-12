let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
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
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let getCity = document.querySelector("#city-input");
  document.querySelector("#city-name").innerHTML = `${getCity.value}`;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${getCity.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

document.querySelector("button").addEventListener("click", search);
document.querySelector("#city-form").addEventListener("submit", search);

function showTemperature() {
  document.querySelector("#temp").innerHTML = "21";
}
document
  .querySelector("#celsius-link")
  .addEventListener("click", showTemperature);

function fahrenheitTemp() {
  document.querySelector("#temp").innerHTML = "70";
}
document
  .querySelector("#fahrenheit-link")
  .addEventListener("click", fahrenheitTemp);

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temp").innerHTML = `${temperature}`;
  let humidity = Math.round(response.data.main.humidity);
  document.querySelector("#humid").innerHTML = `Humidity:${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `${wind}`;
}

function showPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let current = document.querySelector("#current-position");
current.addEventListener("click", getCurrentPosition);
