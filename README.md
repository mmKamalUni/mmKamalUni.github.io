# Weather Dashboard
Project Overview
The Weather Dashboard is an advanced web application that provides users with real-time weather updates and forecasts for any location. It integrates the OpenWeather API to display current weather conditions, a 5-day forecast, and detailed metrics. Additionally, the dashboard includes a chatbot powered by the Gemini API for user interaction, offering an engaging user experience.

Features
Real-time Weather Data: Fetches current weather information using the OpenWeather API.
5-Day Forecast: Provides a forecast for the next five days, including key metrics such as temperature, humidity, and wind speed.
Dynamic Data Visualization: Uses Chart.js to display weather data in a visual and easy-to-understand format.
Chatbot Integration: Users can interact with a chatbot for a conversational experience while using the dashboard.
AJAX Requests: Efficient asynchronous API calls to ensure the page updates without needing a refresh.
Error Handling: Robust error handling for network issues or API failures, ensuring a smooth user experience.
Responsive UI: The dashboard is fully responsive, ensuring compatibility across various devices and screen sizes.
Technologies Used
HTML5 for the structure and layout of the web pages.
CSS3 for styling and creating a responsive design.
JavaScript for DOM manipulation and application logic.
AJAX (Fetch API) for asynchronous communication with external APIs.
OpenWeather API for fetching weather data.
Chart.js for visualizing weather data.
Gemini API for chatbot integration.
Error Handling with try...catch blocks to handle API and network errors.
How It Works
Search Functionality:

Users can enter the name of any city in the search bar to fetch current weather and forecast information.
The weather data is retrieved using the OpenWeather API and is displayed dynamically on the page.
Weather Widgets:

The current weather section displays information such as temperature, humidity, wind speed, and a brief description of weather conditions.
The forecast section shows a detailed 5-day weather forecast, including key data for each day in a tabular format.
Chatbot Interaction:

Users can interact with a chatbot via a text input field. The chatbot is integrated using the Gemini API, providing a conversational element to the app.
Dynamic Charts:

Weather data is visually represented using Chart.js, offering easy-to-read charts for temperature trends, humidity, and more.
Error Handling:

The application gracefully handles API errors, including network issues or invalid responses, by notifying the user and maintaining the page’s functionality.
Installation
To run the Weather Dashboard locally:

Clone the repository:
git clone https://github.com/mmKamalUni/mmKamalUni.github.io

Navigate to the project directory:
cd mmKamalUni.github.io

Open the index.html file in your browser to run the application:
open index.html

Usage
Enter the city name in the search bar to get real-time weather updates.
View the current weather conditions and the 5-day forecast for the searched location.
Interact with the chatbot for more dynamic engagement while exploring the dashboard.
Analyze the weather trends using the charts displayed on the page.
Future Enhancements
User Authentication: Allow users to save favorite cities and set preferences.
Additional Metrics: Include more detailed weather data such as air quality, sunrise/sunset times, etc.
Historical Data: Provide historical weather data for past months.
