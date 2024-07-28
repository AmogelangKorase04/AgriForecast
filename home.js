// Sample data for weather, soil, and pests
const weatherData = {
    labels: ["July", "August", "September", "October", "November"],
    datasets: [{
        label: 'Temperature (°C)',
        data: [22, 21, 25, 28, 24],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }]
};

const soilData = {
    labels: ["July", "August", "September", "October", "November"],
    datasets: [{
        label: 'Moisture (%)',
        data: [60, 55, 70, 65, 60],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

const pestData = {
    labels: ["July", "August", "September", "October", "November"],
    datasets: [{
        label: 'Pest Count',
        data: [10, 5, 12, 7, 8],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1
    }]
};



const seasonalPlants = [
    { plant: 'Tomatoes', suitableSeason: 'Spring', successRate: 85 },
    { plant: 'Lettuce', suitableSeason: 'Spring', successRate: 90 },
    { plant: 'Carrots', suitableSeason: 'Autumn', successRate: 80 },
    { plant: 'Peas', suitableSeason: 'Spring', successRate: 75 },
    { plant: 'Pumpkins', suitableSeason: 'Autumn', successRate: 70 },
    { plant: 'Cucumbers', suitableSeason: 'Summer', successRate: 80 },
    { plant: 'Corn', suitableSeason: 'Summer', successRate: 85 }
];

function getSeason(month) {
    if (month >= 3 && month <= 5) return 'Autumn';    // March, April, May
    if (month >= 6 && month <= 8) return 'Winter';    // June, July, August
    if (month >= 9 && month <= 11) return 'Spring';      // September, October, November
    return 'Summer';                                  // December, January, February
}

function updateSeasonalPlants() {
    const plantList = document.getElementById('plantList');
    const currentMonth = new Date().getMonth(); // Get current month (0-indexed)
    const season = getSeason(currentMonth);

    document.getElementById('currentSeason').innerText = `Current Season: ${season}`;

    plantList.innerHTML = '';
    seasonalPlants
        .filter(plant => plant.suitableSeason === season)
        .forEach(plant => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="plant-name">${plant.plant}</span>
                <div class="success-bar-container">
                    <div class="success-bar">
                        <div class="progress" style="width: ${plant.successRate}%"></div>
                    </div>
                    <span class="success-rate">${plant.successRate}%</span>
                </div>
            `;
            plantList.appendChild(li);
        });
}

window.onload = function() {
    const weatherCtx = document.getElementById('weatherChart').getContext('2d');
    const soilCtx = document.getElementById('soilChart').getContext('2d');
    const pestCtx = document.getElementById('pestChart').getContext('2d');

    new Chart(weatherCtx, {
        type: 'line',
        data: weatherData,
    });

    new Chart(soilCtx, {
        type: 'line',
        data: soilData,
    });

    new Chart(pestCtx, {
        type: 'line',
        data: pestData,
    });

    updateSeasonalPlants();
};




