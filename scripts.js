document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchBtn").addEventListener("click", getWeather);
});

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const resultDiv = document.getElementById('weather-result');

    if (city === "") {
        resultDiv.innerHTML = `<p>⚠️ Please enter a city name!</p>`;
        resultDiv.style.display = "block";
        return;
    }

    const apiKey = 'f8d94660882da985aa6a519fb985b5fc'; // Your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        console.log("Fetching data from:", url);
        const response = await fetch(url);
        const data = await response.json();

        console.log("API Response:", data);

        if (data.cod === 200) {
            resultDiv.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <h3>🌡 ${data.main.temp}°C</h3>
                <p>Feels like: ${data.main.feels_like}°C</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>🌍 Weather: ${data.weather[0].description}</p>
            `;
            resultDiv.style.display = "block";
            resultDiv.classList.add('fade-in');
        } else {
            resultDiv.innerHTML = `<p>⚠️ City not found!</p>`;
            resultDiv.style.display = "block";
        }
    } catch (error) {
        console.error("Fetch error:", error);
        resultDiv.innerHTML = `<p>🚨 Error fetching data! Check console (F12).</p>`;
        resultDiv.style.display = "block";
    }
}
