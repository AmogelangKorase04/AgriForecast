
const farmData = {
    'Tomatoes': [
        { name: 'Kirstenbosch Gardens', temperature: '15-25°C', rainfall: '900-1200mm', soil: 'Sandy', location: [-33.9876, 18.4382], rating: 5 },
        { name: 'Durbanville Wine Estates', temperature: '16-26°C', rainfall: '800-1000mm', soil: 'Loamy', location: [-33.8663, 18.6144], rating: 4 }
    ],
    'Lettuce': [
        { name: 'Pretoria Botanical Gardens', temperature: '18-28°C', rainfall: '600-800mm', soil: 'Loamy', location: [-25.7461, 28.2292], rating: 4 },
        { name: 'Cape Winelands', temperature: '20-30°C', rainfall: '700-900mm', soil: 'Loamy', location: [-33.6167, 19.0167], rating: 4 }
    ],
    'Carrots': [
        { name: 'Joostenberg Vlakte', temperature: '10-20°C', rainfall: '800-1000mm', soil: 'Sandy', location: [-33.7443, 18.7311], rating: 5 },
        { name: 'Burgundy Estate', temperature: '12-22°C', rainfall: '700-900mm', soil: 'Loamy', location: [-33.8866, 18.5630], rating: 3 }
    ]
};

const availableLandData = {
    'Cape Town': [
        { name: 'Blouberg Farm', size: '10 hectares', price: 'R4,000,000', location: [-33.8111, 18.5074], temperature: '15-22°C', rainfall: '600-800mm', soil: 'Sandy' },
        { name: 'Hout Bay Farm', size: '8 hectares', price: 'R3,500,000', location: [-34.0398, 18.3594], temperature: '15-22°C', rainfall: '600-800mm', soil: 'Loamy' }
    ],
    'Durban': [
        { name: 'Umhlanga Rocks Farm', size: '12 hectares', price: 'R5,000,000', location: [-29.7328, 31.0833], temperature: '18-25°C', rainfall: '800-1000mm', soil: 'Loamy' },
        { name: 'Pinetown Farm', size: '9 hectares', price: 'R4,200,000', location: [-29.8333, 30.9333], temperature: '18-25°C', rainfall: '800-1000mm', soil: 'Sandy' }
    ],
    'Johannesburg': [
        { name: 'Sandton Farm', size: '7 hectares', price: 'R3,800,000', location: [-26.1066, 28.0442], temperature: '15-20°C', rainfall: '700-900mm', soil: 'Loamy' }
    ],
    'Pretoria': [
        { name: 'Hatfield Farm', size: '9 hectares', price: 'R4,200,000', location: [-25.7461, 28.2292], temperature: '18-23°C', rainfall: '600-800mm', soil: 'Clay' },
        { name: 'Menlo Park Farm', size: '11 hectares', price: 'R5,200,000', location: [-25.7595, 28.2390], temperature: '18-23°C', rainfall: '600-800mm', soil: 'Sandy' }
    ],
    'Port Elizabeth': [
        { name: 'Summerstrand Farm', size: '8 hectares', price: 'R3,200,000', location: [-33.9898, 25.6374], temperature: '16-22°C', rainfall: '700-900mm', soil: 'Sandy' },
        { name: 'Humewood Farm', size: '6 hectares', price: 'R2,800,000', location: [-33.9805, 25.6103], temperature: '16-22°C', rainfall: '700-900mm', soil: 'Loamy' }
    ]
};

let map;

function initializeMap() {
    map = L.map('map').setView([0, 0], 6);
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

function findBestFarm() {
    const plant = document.getElementById('plant').value;
    const location = document.getElementById('location').value;
    const recommendations = document.getElementById('recommendationList');
    recommendations.innerHTML = '';

    if (!map) {
        initializeMap();
    } else {
        clearMarkers();
    }

    const farms = farmData[plant] || [];
    farms.forEach(farm => {
        L.marker(farm.location).addTo(map)
            .bindPopup(`<b>${farm.name}</b><br>Temperature: ${farm.temperature}<br>Rainfall: ${farm.rainfall}`);
    });

    const landData = availableLandData[location] || [];
    landData.forEach(land => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h4>${land.name}</h4>
            <p><strong>Size:</strong> ${land.size}</p>
            <p><strong>Price:</strong> ${land.price}</p>
        `;
        li.onclick = function() {
            showModal(land);
        };
        recommendations.appendChild(li);

        L.marker(land.location).addTo(map)
            .bindPopup(`<b>${land.name}</b><br>Size: ${land.size}<br>Price: ${land.price}`);
    });

    const locationMap = {
        'Cape Town': [-33.9189, 18.4233],
        'Durban': [-29.8587, 31.0218],
        'Johannesburg': [-26.2041, 28.0473],
        'Pretoria': [-25.7461, 28.2292],
        'Port Elizabeth': [-33.0139, 25.6540]
    };
    if (locationMap[location]) {
        map.setView(locationMap[location], 10); 
    }
}

function showModal(land) {
    const modal = document.getElementById('farmModal');
    document.getElementById('modalFarmName').innerText = land.name;
    document.getElementById('modalTemperature').innerText = land.temperature || 'N/A';
    document.getElementById('modalRainfall').innerText = land.rainfall || 'N/A';
    document.getElementById('modalSoilType').innerText = land.soil || 'N/A';
    document.getElementById('modalRating').setAttribute('data-score', land.rating || 0);

    localStorage.setItem('selectedFarm', JSON.stringify(land));

    const visitSiteBtn = document.getElementById('visitSiteBtn');
    visitSiteBtn.onclick = function() {
        //window.open('https://example.com', '_blank'); // Update with real site URL
        const selectedFarm = JSON.parse(localStorage.getItem('selectedFarm'));
        if (selectedFarm) {
            window.location.href = 'home.html';
            // You can add your logic to navigate to the farm site or another page
        }
    };

    modal.style.display = 'block';
}

const span = document.getElementsByClassName('close')[0];
span.onclick = function() {
    document.getElementById('farmModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === document.getElementById('farmModal')) {
        document.getElementById('farmModal').style.display = 'none';
    }
}

initializeMap(); 