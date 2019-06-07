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

    var x = [], y=[],
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
        x.push(times[i]);
        y.push((+quantities[i]).toFixed(2));

    }

    $('#table').jexcel({
        data: data,
        colHeaders: colHeaders,
        colWidths: [100, 130, 110, 130, 100],
        oninsertrow: function(e) {
            $('#samples').val(e.jexcel('getData').length);
        }
    });


    //NOVO GRAFICO
    var dados = {
        x: x,
        y: y,
        mode: 'line',
        name: 'Linear + Reciprocal Exponential ',
        line: {
            color: 'rgb(0, 0, 219)',
            width: 3
            }
        };


    var layout = {
        title: 'Q(t)-Preview',
        xaxis: {
            title: 'Time ('+all_results.system_common_results.time_unit.system_value+')',
            showgrid: false,
            zeroline: false
        },
        yaxis: {
            title: 'Quantity('+all_results.system_common_results.matter_quantity_unit.system_value +')',
            showline: false
        },
        //width: 1000,
        //height: 1000
    };
        
   
    Plotly.newPlot('chartsTest2', [dados], layout, {showSendToCloud: true});

});


$('.next-button').on('click', function() {
    //alert("OI");
    if (!window.name)
        return false;

    var all_results = JSON.parse(window.name);
    all_results = all_results.all_results;

    console.log(all_results);
    

    //alert("OI");
    window.name = JSON.stringify(all_results);
    window.location = "3_results.html";
});

$('.back-button').on('click', function() {
    //alert("OI");
    if (!window.name)
        return false;

    var all_results = JSON.parse(window.name);
    all_results = all_results.all_results;

    console.log(all_results);
    

    //alert("OI");
    window.name = JSON.stringify(all_results);
    window.location = "1_data.html";
});
