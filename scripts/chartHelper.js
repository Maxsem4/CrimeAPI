('use strict');

function drawOffenseCountChart(
  crimeData,
  labelHeading,
  graphTitle,
  max,
  min,
  labels
) {
  new Chart(document.getElementById('offenseCountChart'), {
    type: 'line',
    data: {
      labels: labels, //getLabelsForChart(),
      datasets: [
        {
          data: crimeData,
          label: labelHeading, // 'Monthly Crime rate',
          borderColor: '#3e95cd',
          fill: false
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true,
              max: max,
              min: min
            }
          }
        ]
      },
      responsive: false,
      maintainAspectRatio: true,
      title: {
        display: true,
        text: graphTitle //'Crime Numbers for Alabama'
      }
    }
  });
}
