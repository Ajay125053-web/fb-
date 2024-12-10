// Replace 'YOUR_API_KEY' with your actual OpenWeather API key
const apiKey = 'YOUR_API_KEY';

const getWeatherButton = document.getElementById('get-weather-btn');
const cityInput = document.getElementById('city');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

// Event listener for button click
getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        showError("Please enter a city name.");
    }
});

// Function to fetch weather data from OpenWeather API
async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            // Display the weather information
            cityName.textContent = `${data.name}, ${data.sys.country}`;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            description.textContent = `Weather: ${data.weather[0].description}`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

            // Show the weather info and hide the error message
            weatherInfo.style.display = 'block';
            errorMessage.style.display = 'none';
        } else {
            // If city is not found or other error in response
            showError("City not found. Please try again.");
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError("Error fetching weather data. Please try again later.");
    }
}

// Function to show error message
function showError(message) {
    weatherInfo.style.display = 'none';
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}
