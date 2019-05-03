$(function() {
    //console.log(window.name);
    if (!window.name)
        return false;

    var all_results = JSON.parse(window.name);
    if (typeof all_results != 'object')
        return false;

    all_results = all_results.all_results;

    $("#system_initial_volume").val(all_results.system_common_results.system_initial_volume.system_value);
    $("#system_final_volume").val(all_results.system_common_results.system_final_volume.system_value);
    $("#root_tissue_measure").val(all_results.system_common_results.root_tissue_measure.system_value);
    $(".addon-volume").html(all_results.system_common_results.volume_unit.system_value);
    $(".addon-root_tissue").html(all_results.system_common_results.root_tissue_measure_unit.system_value);

    var colHeaders = [
        'Sampling<br>time<br>(' + all_results.system_common_results.time_unit.system_value + ')',
        'Instant<br>concentration<br>(' + translation['en'][all_results.system_common_results.concentration_unit.system_value] + ')',
        'Sampled<br>volume<br>(' + all_results.system_common_results.volume_unit.system_value + ')',
        'Quantity<br>(' + all_results.system_common_results.matter_quantity_unit.system_value + ')',
        'Volumes<br>(' + all_results.system_common_results.volume_unit.system_value + ')'
    ];

    var chartData = [],
        data = [],
        times = JSON.parse(all_results.system_common_results.times.system_value.replace(/'/g, '\"')),
        concentrations = JSON.parse(all_results.system_common_results.concentrations.system_value.replace(/'/g, '\"')),
        volumes = JSON.parse(all_results.system_common_results.volumes.system_value.replace(/'/g, '\"')),
        sampled_volumes = JSON.parse(all_results.system_common_results.sampled_volumes.system_value.replace(/'/g, '\"')),
        quantities = JSON.parse(all_results.system_common_results.quantities.system_value.replace(/'/g, '\"'));
   
        
    for (var i = 0, len = times.length; i < len; i++) {
        data.push([
            times[i],
            concentrations[i],
            sampled_volumes[i],
            (+quantities[i]).toFixed(2),
            volumes[i]
        ]);

        chartData.push({
            x: times[i],
            y: (+quantities[i]).toFixed(2)
        });
    }

    $('#table').jexcel({
        data: data,
        colHeaders: colHeaders,
        colWidths: [100, 130, 110, 130, 100],
        oninsertrow: function(e) {
            $('#samples').val(e.jexcel('getData').length);
        }
    });

    var config = {
        //type: 'line',
        data: {
            labels: times,
            datasets: [{
                label: '',
                data: chartData,
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgb(54, 162, 235)",
                //fill: false,
            }]
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

    var mychart = new Chart.Scatter($("#chart"), config);
});