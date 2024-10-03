// script.js
const apiKey = '9dfdfee3e1414343c1562de0784a9f67';  // Replace with your OpenWeatherMap API key

document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
    }
});

function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract weather details
            document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
            document.getElementById('feels-like').innerText = `Feels Like: ${data.main.feels_like} °C`;
            document.getElementById('description').innerText = `Weather: ${data.weather[0].description}`;
            document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
            document.getElementById('pressure').innerText = `Pressure: ${data.main.pressure} hPa`;
            document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed} m/s`;
            document.getElementById('visibility').innerText = `Visibility: ${data.visibility / 1000} km`;

            // Display sunrise and sunset times
            const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            document.getElementById('sunrise').innerText = `Sunrise: ${sunriseTime}`;
            document.getElementById('sunset').innerText = `Sunset: ${sunsetTime}`;

            // Display weather icon
            const iconCode = data.weather[0].icon;
            document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

            // Change background color based on weather
            changeBackground(data.weather[0].main);
        })
        .catch(error => {
            alert("City not found. Please enter a valid city name.");
        });
}

// Function to change background based on weather condition
function changeBackground(weather) {
    const weatherContainer = document.getElementById('weather-container');
    
    switch (weather.toLowerCase()) {
        case 'clear':
            weatherContainer.style.background = 'linear-gradient(to right, #f5af19, #f12711)';
            break;
        case 'clouds':
            weatherContainer.style.background = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
            break;
        case 'rain':
            weatherContainer.style.background = 'linear-gradient(to right, #00c6ff, #0072ff)';
            break;
        case 'snow':
            weatherContainer.style.background = 'linear-gradient(to right, #e6dada, #274046)';
            break;
        default:
            weatherContainer.style.background = 'linear-gradient(to right, #36d1dc, #5b86e5)';
    }
}
