// Select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// API URL with coordinates for Trier, Germany
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=2cb1b2801a494a537b50d989ad051c0d';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data); // For testing purposes
            displayResults(data); // Call the function to display results
        } else {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

function displayResults(data) {
    // Display the current temperature
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;

    // Build the weather icon URL
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    // Get the weather description
    const desc = data.weather[0].description;

    // Update the image and alt attributes
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);

    // Update the figure caption
    captionDesc.textContent = desc;
}

// Call the API fetch function
apiFetch();
