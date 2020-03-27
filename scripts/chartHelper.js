('use strict');

function drawOffenseCountChart(
  crimeData,
  labelHeading,
  graphTitle,
  max,
  min,
  labels
) {
  //make sure the 404 image is hidden before painitng the chart
  let $notFoundSpan = $('.' + 'offenseCountChart' + 'NotFound');
  if (!$notFoundSpan.hasClass('hide')) {
    $notFoundSpan.addClass('hide');
  }

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

function noDataFound(canvasId) {
  // let errorSpan = document.createElement('span');
  // //add a 404 data not found message to it
  // let errorPararaph = document.createElement('p');
  // errorPararaph.setAttribute('class', 'title is-2');
  // errorPararaph.textContent = '404 Data Not Found! Please try another query.';
  // //font-awesome image
  // let errorIcon = document.createElement('i');
  // errorIcon.setAttribute('class', 'fas fa-exclamation-triangle')
  // //<i class="fas fa-exclamation-triangle"></i>
  //add to canvas
  $('.' + canvasId + 'NotFound').removeClass('hide');
}
