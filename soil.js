const ctx = document.getElementById("soilChart").getContext("2d");
const soilChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [], // Time labels will be added here
    datasets: [
      {
        label: "Soil Moisture (%)",
        data: [], // Soil moisture data will be added here
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: "realtime",
        realtime: {
          delay: 2000,
          onRefresh: function (chart) {
            const now = Date.now();
            chart.data.labels.push(now);
            chart.data.datasets.forEach(function (dataset) {
              dataset.data.push({
                x: now,
                y: getRandomSoilMoisture(), // Replace this with actual data fetching function
              });
            });
          },
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  },
});

function getRandomSoilMoisture() {
  return Math.floor(Math.random() * (50 - 20 + 1)) + 20;
}

document.addEventListener("DOMContentLoaded", () => {
  updateChartData("day");
});

function updateChartData(tabName) {
  let data;
  switch (tabName) {
    case "day":
      data = getDayData();
      break;
    case "week":
      data = getWeekData();
      break;
    case "month":
      data = getMonthData();
      break;
  }
  createChart(data);
}

function getDayData() {
  // Simulate data for one day
  const now = Date.now();
  const data = {
    labels: Array.from({ length: 24 }, (_, i) => new Date(now - i * 3600000)),
    datasets: [
      {
        label: "Soil Moisture (%)",
        data: Array.from({ length: 24 }, () => getRandomSoilMoisture()),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };
  return data;
}

function getWeekData() {
  // Simulate data for one week
  const now = Date.now();
  const data = {
    labels: Array.from({ length: 7 }, (_, i) => new Date(now - i * 86400000)),
    datasets: [
      {
        label: "Soil Moisture (%)",
        data: Array.from({ length: 7 }, () => getRandomSoilMoisture()),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };
  return data;
}

function getMonthData() {
  // Simulate data for one month
  const now = Date.now();
  const data = {
    labels: Array.from({ length: 30 }, (_, i) => new Date(now - i * 86400000)),
    datasets: [
      {
        label: "Soil Moisture (%)",
        data: Array.from({ length: 30 }, () => getRandomSoilMoisture()),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };
  return data;
}

document.addEventListener("DOMContentLoaded", () => {
  updateChartData("day");
});

function createChart(data) {
  if (chart) {
    chart.destroy();
  }
  chart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "minute",
          },
          title: {
            display: true,
            text: "Time",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Soil Moisture (%)",
          },
        },
      },
    },
  });
}
