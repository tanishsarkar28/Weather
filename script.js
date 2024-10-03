// script.js
const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key

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
            document.getElementById('temperature').innerText = `Temp: ${data.main.temp}°C`;
            document.getElementById('feels-like').innerText = `Feels Like: ${data.main.feels_like}°C`;
            document.getElementById('description').innerText = `${data.weather[0].description.toUpperCase()}`;
            document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
            document.getElementById('pressure').innerText = `Pressure: ${data.main.pressure} hPa`;
            document.getElementById('wind').innerText = `Wind: ${data.wind.speed} m/s`;
            document.getElementById('visibility').innerText = `Visibility: ${(data.visibility / 1000).toFixed(1)} km`;

            // Sunrise and Sunset
            const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            document.getElementById('sunrise').innerText = `Sunrise: ${sunriseTime}`;
            document.getElementById('sunset').innerText = `Sunset: ${sunsetTime}`;

            // Display weather icon
            const iconCode = data.weather[0].icon;
            document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

            // Change background dynamically based on weather condition
            changeBackground(data.weather[0].main);
        })
        .catch(error => {
            alert("City not found. Please enter a valid city name.");
        });
}

function changeBackground(weather) {
    const weatherContainer = document.getElementById('weather-container');
    
    switch (weather.toLowerCase()) {
        case 'clear':
            weatherContainer.style.background = 'linear-gradient(135deg, #ff9a9e, #fad0c4)';
            break;
        case 'clouds':
            weatherContainer.style.background = 'linear-gradient(135deg, #c9d6ff, #e2e2e2)';
            break;
        case 'rain':
            weatherContainer.style.background = 'linear-gradient(135deg, #4e54c8, #8f94fb)';
            break;
        case 'snow':
            weatherContainer.style.background = 'linear-gradient(135deg, #e6dada, #274046)';
            break;
        default:
            weatherContainer.style.background = 'linear-gradient(135deg, #36d1dc, #5b86e5)';
    }
}

// Theme Toggle
document.getElementById('light-mode').addEventListener('click', () => {
    document.body.style.background = 'linear-gradient(135deg, #f9d423, #ff4e50)';
});

document.getElementById('dark-mode').addEventListener('click', () => {
    document.body.style.background = 'linear-gradient(135deg, #434343, #000000)';
});
const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme') || 'light';

// Load theme based on user preference
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleSwitch.checked = true;
} else {
    document.body.classList.add('light-mode');
}

// Toggle between light and dark mode
toggleSwitch.addEventListener('change', function() {
    if (toggleSwitch.checked) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    }
});

