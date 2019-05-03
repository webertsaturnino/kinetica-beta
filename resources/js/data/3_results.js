$(function() {


    var chartData = [],chartData2 = [],chartData3 = [];
   
        
//     for (var i = 0, len = times.length; i < len; i++) {
        for (var i = 0; i < 8; i++) {
            chartData.push({
                //x: times[i],
                //y: (+quantities[i]).toFixed(2)
                x: i+1,
                y: i+1
            });
        }

        for (var i = 0; i < 8; i++) {
            chartData2.push({
                //x: times[i],
                //y: (+quantities[i]).toFixed(2)
                x: i+1,
                y: i+3
            });
        }

        for (var i = 0; i < 8; i++) {
            chartData3.push({
                //x: times[i],
                //y: (+quantities[i]).toFixed(2)
                x: i+1,
                y: i+5
            });
        }
    

    var config = {
        type: 'line',
        data: {
            labels: 'TESTE',
            datasets: [{
                label: 'TESTE 1',
                data: chartData,
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgb(54, 162, 235)",
                fill: false,
                showLine: true
            },
            {
                label: 'TESTE 2',
                data: chartData2,
                borderColor: "rgb(85, 62, 035)",
                backgroundColor: "rgb(54, 162, 235)",
                fill: false,
                showLine: true
            },{
                label: 'TESTE 3',
                data: chartData3,
                borderColor: "rgb(254, 222, 035)",
                backgroundColor: "rgb(54, 162, 235)",
                fill: false,
                showLine: true
            
            }
        ]
        },
        options: {
            responsive: true,
            title: {
                display: false
            },
            tooltips: {
                mode: 'index'
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    },
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 10,
                    }
                }]
                
            }
        }
    };

    var mychart = new Chart.Scatter($("#charts"), config);
});