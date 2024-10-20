const apiKey = 'dc0a90e3a9d9b11d02bb7d53e0df1b0d';
let currentPage = 1;
const rowsPerPage = 10 ;

function showDashboard() {
    document.getElementById('dashboard').style.display = 'flex';
    document.getElementById('tables').style.display = 'none';
}

function showTables() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('tables').style.display = 'flex';
}

async function getWeather() {
    const city = document.getElementById('city-input').value;
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const weatherData = await weatherResponse.json();
    displayWeather(weatherData);

    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    const forecastData = await forecastResponse.json();
    displayForecast(forecastData);
    displayDetailedForecast(forecastData);
}

function displayWeather(data) {
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('weather-description').innerText = `Weather: ${data.weather[0].description}`;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    const weatherWidget = document.getElementById('weather-widget');
    switch (data.weather[0].main.toLowerCase()) {
        case 'clear':
            weatherWidget.style.backgroundColor = '#f39c12';
            break;
        case 'clouds':
            weatherWidget.style.backgroundColor = '#95a5a6';
            break;
        case 'rain':
            weatherWidget.style.backgroundColor = '#3498db';
            break;
        case 'snow':
            weatherWidget.style.backgroundColor = '#ecf0f1';
            break;
        default:
            weatherWidget.style.backgroundColor = '#bdc3c7';
    }
}

function displayForecast(data) {
    const forecastTable = document.getElementById('forecast-table');
    forecastTable.innerHTML = '';
    const temperatures = [];
    const weatherConditions = {};

    data.list.forEach((item, index) => {
        if (index % 8 === 0) {
            const row = document.createElement('tr');
            const dateCell = document.createElement('td');
            const tempCell = document.createElement('td');
            const weatherCell = document.createElement('td');

            dateCell.innerText = new Date(item.dt_txt).toLocaleDateString();
            tempCell.innerText = `${item.main.temp} °C`;
            weatherCell.innerText = item.weather[0].description;

            row.appendChild(dateCell);
            row.appendChild(tempCell);
            row.appendChild(weatherCell);
            forecastTable.appendChild(row);

            temperatures.push(item.main.temp);
            weatherConditions[item.weather[0].description] = (weatherConditions[item.weather[0].description] || 0) + 1;
        }
    });

    createCharts(temperatures, weatherConditions);
}

function displayDetailedForecast(data) {
    const detailedForecastTable = document.getElementById('detailed-forecast-table');
    detailedForecastTable.innerHTML = '';
    const forecastData = data.list;

    forecastData.forEach((item, index) => {
        const row = document.createElement('tr');
        const dateCell = document.createElement('td');
        const timeCell = document.createElement('td');
        const tempCell = document.createElement('td');
        const weatherCell = document.createElement('td');

        dateCell.innerText = new Date(item.dt_txt).toLocaleDateString();
        timeCell.innerText = new Date(item.dt_txt).toLocaleTimeString();
        tempCell.innerText = `${item.main.temp} °C`;
        weatherCell.innerText = item.weather[0].description;

        row.appendChild(dateCell);
        row.appendChild(timeCell);
        row.appendChild(tempCell);
        row.appendChild(weatherCell);
        detailedForecastTable.appendChild(row);
    });

    paginateTable();
}

function paginateTable() {
    const table = document.getElementById('detailed-forecast-table');
    const rows = table.getElementsByTagName('tr');
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    for (let i = 0; i < rows.length; i++) {
        rows[i].style.display = 'none';
    }

    for (let i = (currentPage - 1) * rowsPerPage; i < currentPage * rowsPerPage && i < rows.length; i++) {
        rows[i].style.display = '';
    }
}

function nextPage() {
    const table = document.getElementById('detailed-forecast-table');
    const rows = table.getElementsByTagName('tr');
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        paginateTable();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        paginateTable();
    }
}

function createCharts(temperatures, weatherConditions) {
    const barCtx = document.getElementById('barChart').getContext('2d');
    const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
    const lineCtx = document.getElementById('lineChart').getContext('2d');

    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                delay: 1000
            }
        }
    });

    new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(weatherConditions),
            datasets: [{
                label: 'Weather Conditions',
                data: Object.values(weatherConditions),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                delay: 1000
            }
        }
    });

    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                drop: true
            }
        }
    });
}









// Handle chat functionality
document.getElementById('chat-submit').addEventListener('click', async function () {
    const input = document.getElementById('chat-input-tables').value;
    const chatBar = document.getElementById('chatbox-tables');

    // Display user's message
    chatBar.innerHTML += `<div>User : ${input}</div>`;
    document.getElementById('chat-input-tables').value = ''; // Clear input

    // Check if the user's input contains the word "weather"
    if (input.toLowerCase().includes('weather')) {
        try {
            const response = await fetchGeminiResponse(input);
            console.log('API Response:', response); // Log the entire response for debugging

            // Check if the response has the expected structure
            if (response && response.candidates && response.candidates.length > 0 &&
                response.candidates[0].content && response.candidates[0].content.parts &&
                response.candidates[0].content.parts.length > 0) {
                const geminiResponseText = response.candidates[0].content.parts[0].text;


                const cityName = extractCityName(geminiResponseText);
                if (cityName) {
                    const weatherData = await fetchWeatherData(cityName);

                    if (weatherData) {
                        chatBar.innerHTML += `<div>Weather in ${cityName}: ${weatherData.weather[0].description} with a temperature of ${weatherData.main.temp}°C.</div>`;
                    } else {
                        chatBar.innerHTML += `<div>Error: Could not retrieve weather data for ${cityName}.</div>`;
                    }
                }
            } else {
                chatBar.innerHTML += `<div>Error: Invalid response structure from API.</div>`;
            }
        } catch (error) {
            chatBar.innerHTML += `<div>Error: ${error.message}</div>`;
        }
    } else {
        chatBar.innerHTML += `<div>Gemini: I am currently able to answer weather-related queries.</div>`;
    }
    chatBar.scrollTop = chatBar.scrollHeight;
});

// Function to fetch response from the Gemini API
async function fetchGeminiResponse(input) {
    const apiKey = 'AIzaSyDGV1-49XXaJuP0Cn06s149ZmjCxBPzRLM';
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: input
                        }
                    ]
                }
            ]
        })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch response from the Gemini API');
    }

    return await response.json();
}

// Function to fetch weather data from OpenWeather API
async function fetchWeatherData(city) {
    const apiKey = 'dc0a90e3a9d9b11d02bb7d53e0df1b0d';
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    return await response.json();
}

// Function to extract the city name from the response
function extractCityName(responseText) {

    const cityMatch = responseText.match(/in\s+([a-zA-Z\s]+)/);
    return cityMatch ? cityMatch[1].trim() : null;
}