// Sample data for weather, soil, and pests

function getSeason(month) {
    if (month >= 2 && month <= 4) return 'Autumn';    // March, April, May
    if (month >= 5 && month <= 7) return 'Winter';    // June, July, August
    if (month >= 8 && month <= 10) return 'Spring';      // September, October, November
    return 'Summer';                                  // December, January, February
}

function updateSeasonalPlants(result) {
    const plantList = document.getElementById('plantList');
    let seasonalPlants = result;
    let currentMonth = new Date().getMonth();
    let season = getSeason(currentMonth);
    console.log(result)

    document.getElementById('currentSeason').innerText = `Current Season: ${season}`;

    plantList.innerHTML = '';
    seasonalPlants
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

function seasonal() {
    let currentMonth = new Date().getMonth();
    let season = getSeason(currentMonth);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"season":season});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://79il189m60.execute-api.us-east-1.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(result => updateSeasonalPlants(JSON.parse(result).body))
    .catch(error => console.log('error', error));
}





function ctxs(result) {
    console.log("ftsv", result);

    let weatherData = {
        labels: result["months"],
        datasets: [{
            label: 'Temperature (°C)',
            data: result["weather"],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };
    
    let soilData = {
        labels: result["months"],
        datasets: [{
            label: 'Moisture (%)',
            data: result["soil"],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };
    
    let pestData = {
        labels: result["months"],
        datasets: [{
            label: 'Pest/meter^2',
            data: result["pest"],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        }]
    };

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

    seasonal();
};


window.onload = function() {
    let currentMonth = new Date().getMonth();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"month":currentMonth});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://n8n7fdpun7.execute-api.us-east-1.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(result => ctxs(JSON.parse(result).body))
    .catch(error => console.log('error', error));
}





