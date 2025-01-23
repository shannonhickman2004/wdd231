// Weather API key and coordinates for Blanding, UT
const apiKey = '2cb1b2801a494a537b50d989ad051c0d';
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=37.625&lon=-109.478&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=37.625&lon=-109.478&units=imperial&appid=${apiKey}`;

// Select weather DOM elements
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecastContainer = document.querySelector('#forecast');

// Fetch and display current weather
async function fetchCurrentWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

function displayCurrentWeather(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}

// Fetch and display 3-day forecast
async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

function displayForecast(data) {
    const forecastList = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    forecastContainer.innerHTML = '';

    forecastList.slice(0, 3).forEach(forecast => {
        const date = forecast.dt_txt.split(' ')[0];
        const temp = forecast.main.temp;
        const desc = forecast.weather[0].description;
        const iconSrc = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;

        const forecastCard = `
            <div class="forecast-card">
                <p><strong>Date:</strong> ${date}</p>
                <img src="${iconSrc}" alt="${desc}">
                <p><strong>Temp:</strong> ${temp}&deg;F</p>
                <p><strong>Conditions:</strong> ${desc}</p>
            </div>
        `;
        forecastContainer.innerHTML += forecastCard;
    });
}

// Initialize weather data
fetchCurrentWeather();
fetchForecast();
