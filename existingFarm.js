
const farmData = {
    'Cape Town': [
        { name: 'Constantia Farm', size: '8 hectares', price: 'R3,500,000', location: [-33.9740, 18.4394], product: 'Wine Grapes', plantingTime: 'August', harvestingTime: 'March', temperature: '15-22°C', rainfall: '600-800mm', soil: 'Loamy', rating: 4 }
    ],
    'Durban': [
        { name: 'Umhlanga Rocks Farm', size: '12 hectares', price: 'R5,000,000', location: [-29.7328, 31.0833], product: 'Sugar Cane', plantingTime: 'September', harvestingTime: 'June', temperature: '18-25°C', rainfall: '800-1000mm', soil: 'Loamy', rating: 5 }
    ],
    'Johannesburg': [
        { name: 'Sandton Farm', size: '7 hectares', price: 'R3,800,000', location: [-26.1066, 28.0442], product: 'Vegetables', plantingTime: 'October', harvestingTime: 'April', temperature: '15-20°C', rainfall: '700-900mm', soil: 'Loamy', rating: 4 }
    ],
    'Pretoria': [
        { name: 'Hatfield Farm', size: '9 hectares', price: 'R4,200,000', location: [-25.7461, 28.2292], product: 'Oranges', plantingTime: 'July', harvestingTime: 'December', temperature: '18-23°C', rainfall: '600-800mm', soil: 'Clay', rating: 5 }
    ],
    'Port Elizabeth': [
        { name: 'Summerstrand Farm', size: '8 hectares', price: 'R3,200,000', location: [-33.9898, 25.6374], product: 'Corn', plantingTime: 'November', harvestingTime: 'April', temperature: '16-22°C', rainfall: '700-900mm', soil: 'Sandy', rating: 4 }
    ]
};

let map;
 
function initializeMap() {
    map = L.map('map').setView([-30, 25], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
}

function clearMarkers() {
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
}

function showAllFarms() {
    clearMarkers();
    const recommendationList = document.getElementById('recommendationList');
    recommendationList.innerHTML = '';

    for (const [city, farms] of Object.entries(farmData)) {
        farms.forEach(farm => {
            // Add marker to map
            L.marker(farm.location)
                .addTo(map)
                .bindPopup(`<b>${farm.name}</b><br>${farm.product}`)
                .on('click', () => openModal(farm));

            // Add farm to recommendations list
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h4>${farm.name}</h4>
                <p><strong>Product:</strong> ${farm.product}</p>
                <p><strong>Planting Time:</strong> ${farm.plantingTime}</p>
                <p><strong>Harvesting Time:</strong> ${farm.harvestingTime}</p>
                <p><strong>Temperature:</strong> ${farm.temperature}</p>
                <p><strong>Rainfall:</strong> ${farm.rainfall}</p>
                <p><strong>Soil Type:</strong> ${farm.soil}</p>
                <p class="rating" data-score="${farm.rating}"></p>
            `;
            listItem.addEventListener('click', () => openModal(farm));
            recommendationList.appendChild(listItem);
        });
    }
}

function openModal(farm) {
    document.getElementById('modalFarmName').textContent = farm.name;
    document.getElementById('modalProduct').textContent = farm.product;
    document.getElementById('modalPlantingTime').textContent = farm.plantingTime;
    document.getElementById('modalHarvestingTime').textContent = farm.harvestingTime;
    document.getElementById('modalTemperature').textContent = farm.temperature;
    document.getElementById('modalRainfall').textContent = farm.rainfall;
    document.getElementById('modalSoilType').textContent = farm.soil;
    document.getElementById('modalRating').setAttribute('data-score', farm.rating);

    localStorage.setItem('selectedFarm', JSON.stringify(farm));

    document.getElementById('farmModal').style.display = 'block';
    setTimeout(() => {
        document.getElementById('farmModal').style.opacity = 1;
    }, 10); // Small delay to trigger the CSS transition
}

function closeModal() {
    document.getElementById('farmModal').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('farmModal').style.display = 'none';
    }, 300); // Match the duration of the fade-out transition
}
