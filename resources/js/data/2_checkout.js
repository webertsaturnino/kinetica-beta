$(function() {
    //console.log(window.name);
    if (!window.name)
        return false;

    var all_results = JSON.parse(window.name);
    if (typeof all_results != 'object')
        return false;


    all_resultsTabela = all_results;   
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
    preencheTabela01(all_results);
});

function preencheTabela01(all_results){
    //var all_results = jsonObject.all_results;


    //console.log(window.name);
    

    var linear_points = all_results.model_specific_results.linear_points;
    var nonlinear_points = all_results.model_specific_results.nonlinear_points;
    var a = all_results.model_specific_results.a;
    var b = all_results.model_specific_results.b;
    var c = all_results.model_specific_results.c;
    var d = all_results.model_specific_results.d;
    var s_lin = all_results.model_specific_results.s_lin;
    var s_nlin = all_results.model_specific_results.s_nlin;
    var s_conj = all_results.model_specific_results.s_conj;
    var r_lin = all_results.model_specific_results.r_lin;
    var r_nlin = all_results.model_specific_results.r_nlin;
    var r_conj = all_results.model_specific_results.r_conj;
    var qm = all_results.model_specific_results.qm;
    var tm = all_results.model_specific_results.tm;
    
   

    $("#tabela1").children("thead").children('tr:eq(0)').children('th:eq(8)').append("<br>" + all_results.system_common_results.matter_quantity_unit.system_value);
    $("#tabela1").children("thead").children('tr:eq(0)').children('th:eq(9)').append("<br>" + all_results.system_common_results.time_unit.system_value);

    //Tabela 1
    //Linha 0
    $("#tabela1").children("tbody").children('tr:eq(0)').children('td:eq(2)').html(linear_points.linear_power); // Linha 0 coluna 3
    $("#tabela1").children("tbody").children('tr:eq(0)').children('td:eq(3)').html("q(t) = " + a.linear_power.toFixed(2) + " + ("+b.linear_power.toFixed(2)+") t"); // Linha 0 coluna 4
    $("#tabela1").children("tbody").children('tr:eq(0)').children('td:eq(4)').html(s_lin.linear_power.toFixed(2)); // Linha 0 coluna 5
    $("#tabela1").children("tbody").children('tr:eq(0)').children('td:eq(5)').html(s_conj.linear_power.toFixed(2)); // Linha 0 coluna 6
    $("#tabela1").children("tbody").children('tr:eq(0)').children('td:eq(6)').html(r_lin.linear_power.toFixed(2)); // Linha 0 coluna 7
    $("#tabela1").children("tbody").children('tr:eq(0)').children('td:eq(7)').html(r_conj.linear_power.toFixed(2)); // Linha 0 coluna 8
    $("#tabela1").children("tbody").children('tr:eq(0)').children('td:eq(8)').html(qm.linear_power.toFixed(3));
    $("#tabela1").children("tbody").children('tr:eq(0)').children('td:eq(9)').html(tm.linear_power.toFixed(3));


    //Linha 1
    $("#tabela1").children("tbody").children('tr:eq(1)').children('td:eq(1)').html(nonlinear_points.linear_power); // Linha 0 coluna 3
    $("#tabela1").children("tbody").children('tr:eq(1)').children('td:eq(2)').html("q(t) = " + c.linear_power.toFixed(2) + " t<sup>"+d.linear_power.toFixed(2)+"</sup>"); // Linha 0 coluna 4
    $("#tabela1").children("tbody").children('tr:eq(1)').children('td:eq(3)').html(s_nlin.linear_power.toFixed(2)); // Linha 0 coluna 6
    $("#tabela1").children("tbody").children('tr:eq(1)').children('td:eq(4)').html(r_nlin.linear_power.toFixed(2)); // Linha 0 coluna 7

    //Linha 2
    $("#tabela1").children("tbody").children('tr:eq(2)').children('td:eq(2)').html(linear_points.linear_exponential); // Linha 0 coluna 3
    $("#tabela1").children("tbody").children('tr:eq(2)').children('td:eq(3)').html("q(t) = " + a.linear_exponential.toFixed(2) + " + ("+b.linear_exponential.toFixed(2)+") t"); // Linha 0 coluna 4
    $("#tabela1").children("tbody").children('tr:eq(2)').children('td:eq(4)').html(s_lin.linear_exponential.toFixed(2)); // Linha 0 coluna 5
    $("#tabela1").children("tbody").children('tr:eq(2)').children('td:eq(5)').html(s_conj.linear_exponential.toFixed(2)); // Linha 0 coluna 6
    $("#tabela1").children("tbody").children('tr:eq(2)').children('td:eq(6)').html(r_lin.linear_exponential.toFixed(2)); // Linha 0 coluna 7
    $("#tabela1").children("tbody").children('tr:eq(2)').children('td:eq(7)').html(r_conj.linear_exponential.toFixed(2)); // Linha 0 coluna 8
    $("#tabela1").children("tbody").children('tr:eq(2)').children('td:eq(8)').html(qm.linear_exponential.toFixed(3));
    $("#tabela1").children("tbody").children('tr:eq(2)').children('td:eq(9)').html(tm.linear_exponential.toFixed(3));

    //Linha 3
    $("#tabela1").children("tbody").children('tr:eq(3)').children('td:eq(1)').html(nonlinear_points.linear_exponential); // Linha 0 coluna 3
    $("#tabela1").children("tbody").children('tr:eq(3)').children('td:eq(2)').html("q(t) = " + c.linear_exponential.toFixed(2) + " e<sup>"+d.linear_exponential.toFixed(2)+"t</sup>"); // Linha 0 coluna 4
    $("#tabela1").children("tbody").children('tr:eq(3)').children('td:eq(3)').html(s_nlin.linear_exponential.toFixed(2)); // Linha 0 coluna 6
    $("#tabela1").children("tbody").children('tr:eq(3)').children('td:eq(4)').html(r_nlin.linear_exponential.toFixed(2)); // Linha 0 coluna 7



    //Linha 4
    $("#tabela1").children("tbody").children('tr:eq(4)').children('td:eq(2)').html(linear_points.linear_reciprocal_exponential); // Linha 0 coluna 3
    $("#tabela1").children("tbody").children('tr:eq(4)').children('td:eq(3)').html("q(t) = " + a.linear_reciprocal_exponential.toFixed(2) + " + ("+b.linear_reciprocal_exponential.toFixed(2)+") t"); // Linha 0 coluna 4
    $("#tabela1").children("tbody").children('tr:eq(4)').children('td:eq(4)').html(s_lin.linear_reciprocal_exponential.toFixed(2)); // Linha 0 coluna 5
    $("#tabela1").children("tbody").children('tr:eq(4)').children('td:eq(5)').html(s_conj.linear_reciprocal_exponential.toFixed(2)); // Linha 0 coluna 6
    $("#tabela1").children("tbody").children('tr:eq(4)').children('td:eq(6)').html(r_lin.linear_reciprocal_exponential.toFixed(2)); // Linha 0 coluna 7
    $("#tabela1").children("tbody").children('tr:eq(4)').children('td:eq(7)').html(r_conj.linear_reciprocal_exponential.toFixed(2)); // Linha 0 coluna 8
    $("#tabela1").children("tbody").children('tr:eq(4)').children('td:eq(8)').html(qm.linear_reciprocal_exponential.toFixed(3));
    $("#tabela1").children("tbody").children('tr:eq(4)').children('td:eq(9)').html(tm.linear_reciprocal_exponential.toFixed(3));

    //Linha 5
    $("#tabela1").children("tbody").children('tr:eq(5)').children('td:eq(1)').html(nonlinear_points.linear_reciprocal_exponential); // Linha 0 coluna 3
    $("#tabela1").children("tbody").children('tr:eq(5)').children('td:eq(2)').html("q(t) = " + c.linear_reciprocal_exponential.toFixed(2) + " e<sup>"+d.linear_reciprocal_exponential.toFixed(2)+"/t</sup>"); // Linha 0 coluna 4
    $("#tabela1").children("tbody").children('tr:eq(5)').children('td:eq(3)').html(s_nlin.linear_reciprocal_exponential.toFixed(2)); // Linha 0 coluna 6
    $("#tabela1").children("tbody").children('tr:eq(5)').children('td:eq(4)').html(r_nlin.linear_reciprocal_exponential.toFixed(2)); // Linha 0 coluna 7



}

$('.next-button').on('click', function() {
    //alert("OI");
    if (!window.name)
        return false;

    var all_results = JSON.parse(window.name);
    all_results = all_results.all_results;

    //console.log(all_results);
    

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
