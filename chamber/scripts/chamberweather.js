// Weather API key and URLs for Blanding, UT
const apiKey = '2cb1b2801a494a537b50d989ad051c0d';
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=37.625&lon=-109.478&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=37.625&lon=-109.478&units=imperial&appid=${apiKey}`;

// Weather DOM Elements
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#current-description');
const currentTemp = document.querySelector('#current-temp');
const highTemp = document.querySelector('#high-temp');
const lowTemp = document.querySelector('#low-temp');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const forecastContainer = document.querySelector('#forecast-container');

// Fetch and display current weather
async function fetchCurrentWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error('Error fetching current weather:', error);
    }
}

function displayCurrentWeather(data) {
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
    currentTemp.textContent = `${Math.round(data.main.temp)}°F`;
    highTemp.textContent = `${Math.round(data.main.temp_max)}°F`;
    lowTemp.textContent = `${Math.round(data.main.temp_min)}°F`;
    humidity.textContent = `${data.main.humidity}%`;

    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    sunrise.textContent = `${sunriseTime}`;
    sunset.textContent = `${sunsetTime}`;
}

// Fetch and display 3-day weather forecast
async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
    }
}

function displayForecast(data) {
    const forecastList = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    forecastContainer.innerHTML = ''; // Clear previous forecast content

    forecastList.slice(0, 3).forEach((forecast) => {
        const date = new Date(forecast.dt * 1000);
        const label = date.toLocaleDateString([], { weekday: 'long' }); // Display the weekday name
        const temp = Math.round(forecast.main.temp);
        const desc = forecast.weather[0].description;
        const iconSrc = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;

        const forecastCard = `
            <div class="forecast-card">
                <p><strong>${label}</strong></p>
                <img src="${iconSrc}" alt="${desc}">
                <p>${temp}°F, ${desc}</p>
            </div>
        `;
        forecastContainer.innerHTML += forecastCard;
    });
}

// Initialize weather data fetching
fetchCurrentWeather();
fetchForecast();