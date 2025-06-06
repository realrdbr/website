const apiKey = '198e4006e4763e408faf44edd0509a26';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherContainer = document.getElementById('weather-container');
const cityNameElement = document.getElementById('city-name');
const weatherDescriptionElement = document.getElementById('weather-description');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');

getWeatherBtn.addEventListener('click', function () {
  let city = cityInput.value.trim();

  if (city !== '') {
    // lowercase the city name
    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    
    getWeather(city);
  } else {
    alert('Please enter a city name');
  }
});

function getWeather(city) {
  const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;  // units=metric for celcius (I live in Europe, not America)

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      alert('Error: ' + error.message);
    });
}

function displayWeather(data) {
  cityNameElement.innerText = `${data.name}, ${data.sys.country}`;
  weatherDescriptionElement.innerText = data.weather[0].description;
  temperatureElement.innerText = `Temperature: ${data.main.temp}°C`;
  humidityElement.innerText = `Humidity: ${data.main.humidity}%`;
  windSpeedElement.innerText = `Wind Speed: ${data.wind.speed} m/s`;

  weatherContainer.style.display = 'block'; // Show the forecast
}
