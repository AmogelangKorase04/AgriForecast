document.addEventListener('DOMContentLoaded', () => {
    const temperatureElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('windSpeed');

    const weeklyForecast = {
        monday: document.getElementById('monday'),
        tuesday: document.getElementById('tuesday'),
        wednesday: document.getElementById('wednesday'),
        thursday: document.getElementById('thursday'),
        friday: document.getElementById('friday')
    };

    function getRandomAdjustment() {
        return (Math.random() - 0.5) * 2; // Adjust by -1 to +1
    }

    function updateValues() {
        // Update today's weather
        let currentTemperature = parseFloat(temperatureElement.textContent);
        let currentHumidity = parseFloat(humidityElement.textContent);
        let currentWindSpeed = parseFloat(windSpeedElement.textContent);

        currentTemperature += getRandomAdjustment();
        currentHumidity += getRandomAdjustment();
        currentWindSpeed += getRandomAdjustment();

        temperatureElement.textContent = `${currentTemperature.toFixed(1)}°C`;
        humidityElement.textContent = `${currentHumidity.toFixed(1)}%`;
        windSpeedElement.textContent = `${currentWindSpeed.toFixed(1)} km/h`;

        // Update weekly forecast
        for (let day in weeklyForecast) {
            let forecast = weeklyForecast[day].textContent;
            let temperature = parseFloat(forecast.match(/(\d+(\.\d+)?)°C/)[1]);
            temperature += getRandomAdjustment();
            weeklyForecast[day].textContent = forecast.replace(/(\d+(\.\d+)?)°C/, `${temperature.toFixed(1)}°C`);
        }
    }

    // Update values every 10 seconds
    setInterval(updateValues, 2000);
});
