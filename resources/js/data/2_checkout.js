$(function() {
    //console.log(window.name);
    if (!window.name)
        return false;

    var all_results = JSON.parse(window.name);
    if (typeof all_results != 'object')
        return false;
    
    //console.log(all_results)

    all_resultsTabela = all_results;   
    all_results = all_results.all_results;

    $("#system_initial_volume").val(all_results.system_common_results.system_initial_volume.system_value);
    $("#system_final_volume").val(all_results.system_common_results.system_final_volume.system_value);
    $("#root_tissue_measure").val(all_results.system_common_results.root_tissue_measure.system_value);
    $(".addon-volume").html(all_results.system_common_results.volume_unit.system_value);
    $(".addon-root_tissue").html(all_results.system_common_results.root_tissue_measure_unit.system_value);

    var colHeaders = [
        'Sampling<br/>time<br/>(' + all_results.system_common_results.time_unit.system_value + ')',
        'Instant<br>concentration<br>(' + translation['en'][all_results.system_common_results.concentration_unit.system_value] + ')',
        'Sampled<br>volume<br>(' + all_results.system_common_results.volume_unit.system_value + ')',
        'Quantity<br>(' + all_results.system_common_results.matter_quantity_unit.system_value + ')',
        'Volumes<br>(' + all_results.system_common_results.volume_unit.system_value + ')'
    ];

    var x = [], y_0=[], y_1=[], y_2=[], y_3=[],
        data = [],
        times = JSON.parse(all_results.system_common_results.times.system_value),
        concentrations = JSON.parse(all_results.system_common_results.concentrations.system_value.replace(/'/g, '\"')),
        volumes = JSON.parse(all_results.system_common_results.volumes.system_value.replace(/'/g, '\"')),
        sampled_volumes = JSON.parse(all_results.system_common_results.sampled_volumes.system_value.replace(/'/g, '\"')),
        quantities = JSON.parse(all_results.system_common_results.quantities.system_value.replace(/'/g, '\"'));
        y1 = (all_results.model_specific_results.estimated_quantities.linear_power);
        y2 = (all_results.model_specific_results.estimated_quantities.linear_exponential);
        y3 = (all_results.model_specific_results.estimated_quantities.linear_reciprocal_exponential);
       
    data.push( colHeaders);
    for (var i = 0, len = times.length; i < len; i++) {
        data.push([
            times[i].toFixed(2),
            concentrations[i].toFixed(2),
            sampled_volumes[i].toFixed(2),
            (+quantities[i]).toFixed(2),
            volumes[i].toFixed(2)
        ]);
        x.push(times[i]);
        y_0.push((+quantities[i]).toFixed(2));
        y_1.push((y1[i]).toFixed(2));
        y_2.push((y2[i]).toFixed(2));
        y_3.push((y3[i]).toFixed(2));

    }

    $('#table').jexcel({
        data: data,
        editable: false,
        colHeaders: colHeaders,
        colWidths: [100, 105, 100, 100, 100],
        oninsertrow: function(e) {
            $('#samples').val(e.jexcel('getData').length);
        }
    });
    $('.jexcel_label').hide();
    $("table[class='jexcel bossanova-ui'] tbody tr").eq(0).css({
        color: '#495057',
        backgroundColor: '#e9ecef'
    });

    //NOVO GRAFICO
    var dados = {
        x: x,
        y: y_0,
        mode: 'markers',
        name: 'Observed',
        line: {
            color: 'rgb(100, 100, 100)',
            width: 3
            }
        };
    //Linear + Power
    var dados1 = {
        x: x,
        y: y_1,
        mode: 'line',
        name: 'Linear + Power ',
        line: {
            color: 'rgb(76, 153, 0)',
            width: 3
            }
        };
    //Linear + Exponentinal
    var dados2 = {
        x: x,
        y: y_2,
        mode: 'line',
        name: 'Linear + Exponential ',
        line: {
            color: 'rgb(51, 153, 255)',
            width: 3
            }
        };

        //linear_reciprocal_exponential
    var dados3 = {
        x: x,
        y: y_3,
        mode: 'line',
        name: 'Linear + Reciprocal-Exp. ',
        line: {
            color: 'rgb(220, 0, 100)',
            width: 3
            }
        };

    var layout = {
        title: 'Q(t)',
        xaxis: {
            title: 'Time ('+all_results.system_common_results.time_unit.system_value+')',
            showgrid: false,
            zeroline: false
        },
        yaxis: {
            title: 'Quantity('+all_results.system_common_results.matter_quantity_unit.system_value +')',
            showline: false
        },
        width: 700,
        height: 500,
        showlegend: true,
            legend: {
              x: 0.6,
              y: 0.9
            }
    };
        
   
    Plotly.newPlot('chartsTest2', [dados,dados1,dados2,dados3], layout, {showSendToCloud: true});
    preencheTabela00(colHeaders, data);
    preencheTabela01(all_results);
    preencherTabela02(all_results);
    graficos(all_results);
    grafico_linear_power_model(all_results);
    grafico_linear_reciprocal_model(all_results);
    grafico_linear_exponential_model(all_results);
    grafico_direct_adjust_model(all_results);
});

function preencheTabela00(colHeaders, data){

    $("#kinetica_depletion_data_table").children("thead").children('tr:eq(0)').children('th:eq(0)').html(colHeaders[0]);
    $("#kinetica_depletion_data_table").children("thead").children('tr:eq(0)').children('th:eq(1)').html(colHeaders[1]);
    $("#kinetica_depletion_data_table").children("thead").children('tr:eq(0)').children('th:eq(2)').html(colHeaders[2]);
    $("#kinetica_depletion_data_table").children("thead").children('tr:eq(0)').children('th:eq(3)').html(colHeaders[3]);
    $("#kinetica_depletion_data_table").children("thead").children('tr:eq(0)').children('th:eq(4)').html(colHeaders[4]);
    for(var i = 1; i < data.length; i++){
        console.log(data[i]);
        var newRow = $("<tr>");
        var cols = "";
        for(var j = 0; j < 5; j++){
            cols += '<td>'+data[i][j]+'</td>';
        }
        newRow.append(cols);
        $("#kinetica_depletion_data_table").children("tbody").append(newRow);
    }

}
function preencheTabela01(all_results){
    //var all_results = jsonObject.all_results;
     
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
    var rmse_lin_nlin = all_results.model_specific_results.rmse_lin_nlin;
    var f_stat_lin_nlin = all_results.model_specific_results.f_stat_lin_nlin;
    var p_f_lin_nlin = all_results.model_specific_results.p_f_lin_nlin;


    $(newFunction()).children("thead").children('tr:eq(0)').children('th:eq(7)').append("<br>" + all_results.system_common_results.matter_quantity_unit.system_value);
    $("#kinetica_model_analysis_tablea_model_analysis_table").children("thead").children('tr:eq(0)').children('th:eq(8)').append("<br>" + all_results.system_common_results.time_unit.system_value);

    //Tabela 1
    //Linha 0
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(0)').children('td:eq(2)').html(linear_points.linear_power); 
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(0)').children('td:eq(3)').html("q(t) = " + a.linear_power.toFixed(2) + " + ("+b.linear_power.toFixed(2)+") t");
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(0)').children('td:eq(4)').html(s_conj.linear_power.toFixed(2)); 
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(0)').children('td:eq(5)').html(r_lin.linear_power.toFixed(2)); 
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(0)').children('td:eq(6)').html(r_conj.linear_power.toFixed(2));
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(0)').children('td:eq(7)').html(qm.linear_power.toFixed(3));
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(0)').children('td:eq(8)').html(tm.linear_power.toFixed(3));
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(0)').children('td:eq(9)').html(rmse_lin_nlin.linear_power.toFixed(3));
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(0)').children('td:eq(10)').html(f_stat_lin_nlin.linear_power.toFixed(3));
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(0)').children('td:eq(11)').html(p_f_lin_nlin.linear_power.toFixed(3));

    

    //Linha 1
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(1)').children('td:eq(1)').html(nonlinear_points.linear_power); // Linha 0 coluna 3
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(1)').children('td:eq(2)').html("q(t) = " + c.linear_power.toFixed(2) + " t<sup>"+d.linear_power.toFixed(2)+"</sup>"); // Linha 0 coluna 4
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(1)').children('td:eq(3)').html(r_nlin.linear_power.toFixed(2)); // Linha 0 coluna 7

    //Linha 2
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(2)').children('td:eq(2)').html(linear_points.linear_exponential); // Linha 0 coluna 3
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(2)').children('td:eq(3)').html("q(t) = " + a.linear_exponential.toFixed(2) + " + ("+b.linear_exponential.toFixed(2)+") t"); // Linha 0 coluna 4
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(2)').children('td:eq(4)').html(s_conj.linear_exponential.toFixed(2)); // Linha 0 coluna 6
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(2)').children('td:eq(5)').html(r_lin.linear_exponential.toFixed(2)); // Linha 0 coluna 7
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(2)').children('td:eq(6)').html(r_conj.linear_exponential.toFixed(2)); // Linha 0 coluna 8
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(2)').children('td:eq(7)').html(qm.linear_exponential.toFixed(3));
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(2)').children('td:eq(8)').html(tm.linear_exponential.toFixed(3));
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(2)').children('td:eq(9)').html(rmse_lin_nlin.linear_exponential.toFixed(3));
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(2)').children('td:eq(10)').html(f_stat_lin_nlin.linear_exponential.toFixed(3));
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(2)').children('td:eq(11)').html(p_f_lin_nlin.linear_exponential.toFixed(3));

    //Linha 3
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(3)').children('td:eq(1)').html(nonlinear_points.linear_exponential); // Linha 0 coluna 3
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(3)').children('td:eq(2)').html("q(t) = " + c.linear_exponential.toFixed(2) + " e<sup>"+d.linear_exponential.toFixed(2)+"t</sup>"); // Linha 0 coluna 4
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(3)').children('td:eq(3)').html(r_nlin.linear_exponential.toFixed(2)); // Linha 0 coluna 7



    //Linha 4
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(4)').children('td:eq(2)').html(linear_points.linear_reciprocal_exponential); // Linha 0 coluna 3
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(4)').children('td:eq(3)').html("q(t) = " + a.linear_reciprocal_exponential.toFixed(2) + " + ("+b.linear_reciprocal_exponential.toFixed(2)+") t"); // Linha 0 coluna 4
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(4)').children('td:eq(4)').html(s_conj.linear_reciprocal_exponential.toFixed(2)); // Linha 0 coluna 6
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(4)').children('td:eq(5)').html(r_lin.linear_reciprocal_exponential.toFixed(2)); // Linha 0 coluna 7
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(4)').children('td:eq(6)').html(r_conj.linear_reciprocal_exponential.toFixed(2)); // Linha 0 coluna 8
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(4)').children('td:eq(7)').html(qm.linear_reciprocal_exponential.toFixed(3));
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(4)').children('td:eq(8)').html(tm.linear_reciprocal_exponential.toFixed(3));
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(4)').children('td:eq(9)').html(rmse_lin_nlin.linear_reciprocal_exponential.toFixed(3));
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(4)').children('td:eq(10)').html(f_stat_lin_nlin.linear_reciprocal_exponential.toFixed(3));
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(4)').children('td:eq(11)').html(p_f_lin_nlin.linear_reciprocal_exponential.toFixed(3));

    //Linha 5
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(5)').children('td:eq(1)').html(nonlinear_points.linear_reciprocal_exponential); // Linha 0 coluna 3
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(5)').children('td:eq(2)').html("q(t) = " + c.linear_reciprocal_exponential.toFixed(2) + " e<sup>"+d.linear_reciprocal_exponential.toFixed(2)+"/t</sup>"); // Linha 0 coluna 4
    $("#kinetica_model_analysis_table").children("tbody").children('tr:eq(5)').children('td:eq(3)').html(r_nlin.linear_reciprocal_exponential.toFixed(2)); // Linha 0 coluna 7



}

function newFunction() {
    return "#kinetica_model_analysis_table";
}

function preencherTabela02(all_results){

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

    //TABELA 2
    $("#kinetica_kinetic_parameters_table").children("thead").children('tr:eq(1)').children('th:eq(0)').html(all_results.system_common_results.concentration_unit.system_value);
    $("#kinetica_kinetic_parameters_table").children("thead").children('tr:eq(1)').children('th:eq(1)').html(all_results.system_common_results.uptake_rate_unit.system_value);
    $("#kinetica_kinetic_parameters_table").children("thead").children('tr:eq(1)').children('th:eq(2)').html(all_results.system_common_results.concentration_unit.system_value);

 
    //Coluna 1
    var km = all_results.model_specific_results.km;
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(0)').children('td:eq(1)').html(km.linear_power.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(1)').children('td:eq(1)').html(km.linear_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(2)').children('td:eq(1)').html(km.linear_reciprocal_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(3)').children('td:eq(1)').html(km.direct_adjust.toFixed(3));
    
    //Coluna 2
    var vmax = all_results.model_specific_results.vmax;
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(0)').children('td:eq(2)').html(vmax.linear_power.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(1)').children('td:eq(2)').html(vmax.linear_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(2)').children('td:eq(2)').html(vmax.linear_reciprocal_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(3)').children('td:eq(2)').html(vmax.direct_adjust.toFixed(3));
    
    //Coluna 3
    var cmin = all_results.model_specific_results.cmin;
    
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(0)').children('td:eq(3)').html(cmin.linear_power.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(1)').children('td:eq(3)').html(cmin.linear_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(2)').children('td:eq(3)').html(cmin.linear_reciprocal_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(3)').children('td:eq(3)').html(cmin.direct_adjust.toFixed(3));
    
    //coluna 4
    var rmse = all_results.model_specific_results.rmse_mm;
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(0)').children('td:eq(4)').html(rmse.linear_power.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(1)').children('td:eq(4)').html(rmse.linear_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(2)').children('td:eq(4)').html(rmse.linear_reciprocal_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(3)').children('td:eq(4)').html(rmse.direct_adjust.toFixed(3));

    //coluna 5
    var r_2_mm = all_results.model_specific_results.r_2_mm;
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(0)').children('td:eq(5)').html(r_2_mm.linear_power.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(1)').children('td:eq(5)').html(r_2_mm.linear_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(2)').children('td:eq(5)').html(r_2_mm.linear_reciprocal_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(3)').children('td:eq(5)').html(r_2_mm.direct_adjust.toFixed(3));

    //coluna 6
    var f_stat_mm = all_results.model_specific_results.f_stat_mm;
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(0)').children('td:eq(6)').html(f_stat_mm.linear_power.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(1)').children('td:eq(6)').html(f_stat_mm.linear_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(2)').children('td:eq(6)').html(f_stat_mm.linear_reciprocal_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(3)').children('td:eq(6)').html(f_stat_mm.direct_adjust.toFixed(3));

    //coluna 7
    var p_f_mm = all_results.model_specific_results.p_f_mm;
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(0)').children('td:eq(7)').html(p_f_mm.linear_power.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(1)').children('td:eq(7)').html(p_f_mm.linear_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(2)').children('td:eq(7)').html(p_f_mm.linear_reciprocal_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(3)').children('td:eq(7)').html(p_f_mm.direct_adjust.toFixed(3));

    //coluna 8
    var aicc_mm = all_results.model_specific_results.aicc_mm;
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(0)').children('td:eq(8)').html(aicc_mm.linear_power.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(1)').children('td:eq(8)').html(aicc_mm.linear_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(2)').children('td:eq(8)').html(aicc_mm.linear_reciprocal_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(3)').children('td:eq(8)').html(aicc_mm.direct_adjust.toFixed(3));

    //coluna 9
    var bic_mm = all_results.model_specific_results.bic_mm;
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(0)').children('td:eq(9)').html(bic_mm.linear_power.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(1)').children('td:eq(9)').html(bic_mm.linear_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(2)').children('td:eq(9)').html(bic_mm.linear_reciprocal_exponential.toFixed(3));
    $("#kinetica_kinetic_parameters_table").children("tbody").children('tr:eq(3)').children('td:eq(9)').html(bic_mm.direct_adjust.toFixed(3));
    

}

function graficos(all_results){
//grafico
    //TODO:VOLTAR COM ESSAS LINHAS;
    var concentrations = JSON.parse(all_results.system_common_results.concentrations.system_value);
    var concentrations_linear_power = JSON.parse(all_results.model_specific_results.estimated_concentrations.linear_power);
    var concentrations_linear_exponential = JSON.parse(all_results.model_specific_results.estimated_concentrations.linear_exponential);
    var concentrations_linear_reciprocal_exponential = JSON.parse(all_results.model_specific_results.estimated_concentrations.linear_reciprocal_exponential);

    
    var rates_linear_power = JSON.parse(all_results.model_specific_results.estimated_uptake_rates.linear_power);
    var rates_linear_exponential = JSON.parse(all_results.model_specific_results.estimated_uptake_rates.linear_exponential);
    var rates_linear_reciprocal_exponential = JSON.parse(all_results.model_specific_results.estimated_uptake_rates.linear_reciprocal_exponential);
    var rates_direct_adjust = JSON.parse(all_results.model_specific_results.estimated_uptake_rates.direct_adjust);
    var chart_data_linear_power = [], chart_data_linear_exponential = [], chart_data_linear_reciprocal_exponential = [], chart_diret_adjust= [];
    
  
    
    var max_x = concentrations[0], max_y = rates_linear_power[0];
    for (var i = 0; i < concentrations.length; i++) {
        chart_data_linear_power.push({
            x: parseFloat(concentrations[i]),
            y: rates_linear_power[i]
        });
        chart_data_linear_exponential.push({
            x: parseFloat(concentrations[i]),
            y: rates_linear_exponential[i]
        });
        chart_data_linear_reciprocal_exponential.push({
            x: parseFloat(concentrations[i]),
            y: rates_linear_reciprocal_exponential[i]
        });

        chart_diret_adjust.push({
            x: parseFloat(concentrations[i]),
            y: rates_direct_adjust[i]
        });

        if(concentrations[i] > max_x)
            max_x = concentrations[i];
        
        if(rates_linear_power[i] > max_y)
            max_y = rates_linear_power[i];
        
        if(rates_linear_exponential[i] > max_y)
            max_y = rates_linear_exponential[i];

        if(rates_linear_reciprocal_exponential[i] > max_y)
            max_y = rates_linear_reciprocal_exponential[i];

        if(rates_direct_adjust[i] > max_y)
            max_y = rates_direct_adjust[i];
        
    }

    var label_y = all_results.system_common_results.uptake_rate_unit.system_value;
    var label_y_1 = label_y.split("/", 2)[0]
    var label_y_2 = label_y.split("/", 2)[1]
    var label_y_2a = label_y_2.split(".", 2)[0]
    var label_y_2b = label_y_2.split(".", 2)[1]


    var label_x = all_results.system_common_results.concentration_unit.system_value;

    var label_x_1 = label_x.split("/", 2)[0]
    var label_x_2 = label_x.split("/", 2)[1]

    //Grafico 02
    var linear_Power_x = [], linear_Power_y=[];
    var linear_exponential_x = [], linear_exponential_y=[];
    var linear_reciprocal_exponential_x = [], linear_reciprocal_exponential_y=[];
    var direct_adjust_x = [], direct_adjust_y=[];

    for (var i = 0; i < concentrations.length; i++) {
        linear_Power_x.push(parseFloat(concentrations_linear_power[i]));
        linear_Power_y.push(rates_linear_power[i]);

        linear_exponential_x.push(parseFloat(concentrations_linear_exponential[i]));
        linear_exponential_y.push(rates_linear_exponential[i]);

        linear_reciprocal_exponential_x.push(parseFloat(concentrations_linear_reciprocal_exponential[i]));
        linear_reciprocal_exponential_y.push(rates_linear_reciprocal_exponential[i]);

        direct_adjust_x.push(parseFloat(concentrations[i]));
        direct_adjust_y.push(rates_direct_adjust[i]);
    }



    var Linear_Power = {
        x: linear_Power_x,
        y: linear_Power_y,
        mode: 'line',
        name: 'Linear + Power',
            line: {
            color: 'rgb(76, 153, 0)',
            width: 2,
            shape: 'spline',
            smoothing: 1.3
        }
        };

    var Linear_Exponential = {
        x: linear_exponential_x,
        y: linear_exponential_y,
        mode: 'line',
        name: 'Linear + Exponential',
        line: {
            color: 'rgb(51, 153, 255)',
            width: 2,
            shape: 'spline',
            smoothing: 1.3
            }
        };

    var Linear_Reciprocal_Exponential = {
        x: linear_reciprocal_exponential_x,
        y: linear_reciprocal_exponential_y,
        mode: 'line',
        name: 'Linear + Reciprocal Exponential ',
        line: {
            color: 'rgb(220, 0, 100)',
            width: 2,
            shape: 'spline',
            smoothing: 1.3
            }
        };

    var direct_adjust = {
            x: direct_adjust_x,
            y: direct_adjust_y,
            mode: 'line',
            name: 'Direct Adjust',
            line: {
                color: 'rgb(100, 100, 100)',
                width: 2,
                shape: 'spline',
                smoothing: 1.3
                }
            };

    // Grafico Linear_Power
    var layout = {
        title: 'Michaelis-Menten Plot',
        xaxis: {
            title: 'Concentration (' + label_x_1 +' '+ label_x_2 + '<sup>-1</sup>)',
            showgrid: false,
            zeroline: true
        },
        yaxis: {
            title: 'v<sub>0</sub> (' + label_y_1 +' '+ label_y_2a + '<sup>-1 </sup>' + label_y_2b + '<sup>-1</sup>' + ')',
            showgrid: false,
            zeroline: true
        },
        autosize: true,
        //width: 600,
        //height: 450,
        shapes: [
            //line horizontal      
            {type: 'line',
              x0: 0,
              y0: (all_results.model_specific_results.vmax.linear_power/2),
              x1: (all_results.model_specific_results.km.linear_power + all_results.model_specific_results.cmin.linear_power),
              y1: (all_results.model_specific_results.vmax.linear_power/2),
              line: { color: 'rgb(100, 100, 100)', width: 3, width: 1, dash: "dot"}
            },
            //line  vertical
            {   type: 'line',
                x0: all_results.model_specific_results.km.linear_power + all_results.model_specific_results.cmin.linear_power,
                y0: (0),
                x1: (all_results.model_specific_results.km.linear_power + all_results.model_specific_results.cmin.linear_power),
                y1: (all_results.model_specific_results.vmax.linear_power/2),
                line: { color: 'rgb(100, 100, 100)', width: 3, width: 1, dash: "dot"}
            },
          ]
    };
    data = [Linear_Power];
    Plotly.newPlot('chartsLinear_Power', data, layout, {showSendToCloud: true});
   
    
    
 // Grafico Linear_Exponential
 layout = {
    title: 'Michaelis-Menten Plot',
    xaxis: {
        title: 'Concentration (' + label_x_1 +' '+ label_x_2 + '<sup>-1</sup>)',
        showgrid: false,
        zeroline: false
    },
    yaxis: {
        title: 'v<sub>0</sub> (' + label_y_1 +' '+ label_y_2a + '<sup>-1 </sup>' + label_y_2b + '<sup>-1</sup>' + ')',
        showgrid: false,
        showline: true
    },
    
    autosize: true,
    //width: 600,
    //height: 450,

    shapes: [
        //line vertical      
        {type: 'line',
          x0: 0,
          y0: (all_results.model_specific_results.vmax.linear_exponential/2),
          x1: (all_results.model_specific_results.km.linear_exponential + all_results.model_specific_results.cmin.linear_exponential),
          y1: (all_results.model_specific_results.vmax.linear_exponential/2),
          line: { color: 'rgb(100, 100, 100)', width: 3, width: 1, dash: "dot"}
        },
        //line horizontal
        {   type: 'line',
            x0: all_results.model_specific_results.km.linear_exponential + all_results.model_specific_results.cmin.linear_exponential,
            y0: (0),
            x1: (all_results.model_specific_results.km.linear_exponential + all_results.model_specific_results.cmin.linear_exponential),
            y1: (all_results.model_specific_results.vmax.linear_exponential/2),
            line: { color: 'rgb(100, 100, 100)', width: 3, width: 1, dash: "dot"}
          }
      ]
};
    data = [Linear_Exponential];
    Plotly.newPlot('chartsLinear_Exponential', data, layout, {showSendToCloud: true});


    // Grafico Linear_Reciprocal_Exponential
 layout = {
    title: 'Michaelis-Menten Plot',
    xaxis: {
        title: 'Concentration (' + label_x_1 +' '+ label_x_2 + '<sup>-1</sup>)',
        showgrid: false,
        zeroline: false
    },
    yaxis: {
        title: 'v<sub>0</sub> (' + label_y_1 +' '+ label_y_2a + '<sup>-1 </sup>' + label_y_2b + '<sup>-1</sup>' + ')',
        showgrid: false,
        showline: true
    },
    
    autosize: true,
    //width: 600,
    //height: 450,


    shapes: [
        //line vertical      
        {type: 'line',
          x0: 0,
          y0: (all_results.model_specific_results.vmax.linear_reciprocal_exponential/2),
          x1: (all_results.model_specific_results.km.linear_reciprocal_exponential + all_results.model_specific_results.cmin.linear_reciprocal_exponential),
          y1: (all_results.model_specific_results.vmax.linear_reciprocal_exponential/2),
          line: {color: 'rgb(100, 100, 100)', width: 1, dash: "dot"}
        },
        //line horizontal
        {   type: 'line',
            x0: all_results.model_specific_results.km.linear_reciprocal_exponential + all_results.model_specific_results.cmin.linear_reciprocal_exponential,
            y0: (0),
            x1: (all_results.model_specific_results.km.linear_reciprocal_exponential + all_results.model_specific_results.cmin.linear_reciprocal_exponential),
            y1: (all_results.model_specific_results.vmax.linear_reciprocal_exponential/2),
            line: { color: 'rgb(100, 100, 100)', width: 3, width: 1, dash: "dot"}
          }
      ]
};
    data = [Linear_Reciprocal_Exponential];
    Plotly.newPlot('chartsLinear_Reciprocal_Exponential', data, layout, {showSendToCloud: true});
    

   // Grafico Direct Adjust
   layout = {
    title: 'Michaelis-Menten Plot',
    xaxis: {
        title: 'Concentration (' + label_x_1 +' '+ label_x_2 + '<sup>-1</sup>)',
        showgrid: false,
        zeroline: false
    },
    yaxis: {
        title: 'v<sub>0</sub> (' + label_y_1 +' '+ label_y_2a + '<sup>-1 </sup>' + label_y_2b + '<sup>-1</sup>' + ')',
        showgrid: false,
        showline: true
    },
    
    autosize: true,
    //width: 600,
    //height: 450,


    shapes: [
        //line vertical      
        {type: 'line',
          x0: 0,
          y0: (all_results.model_specific_results.vmax.direct_adjust/2),
          x1: (all_results.model_specific_results.km.direct_adjust + all_results.model_specific_results.cmin.direct_adjust),
          y1: (all_results.model_specific_results.vmax.direct_adjust/2),
          line: {color: 'rgb(100, 100, 100)', width: 1, dash: "dot"}
        },
        //line horizontal
        {   type: 'line',
            x0: all_results.model_specific_results.km.direct_adjust + all_results.model_specific_results.cmin.direct_adjust,
            y0: (0),
            x1: (all_results.model_specific_results.km.direct_adjust + all_results.model_specific_results.cmin.direct_adjust),
            y1: (all_results.model_specific_results.vmax.direct_adjust/2),
            line: { color: 'rgb(100, 100, 100)', width: 3, width: 1, dash: "dot"}
          }
      ]
};
    data = [direct_adjust];
    Plotly.newPlot('chartsDirect_Adjust', data, layout, {showSendToCloud: true});
}

function grafico_linear_power_model(all_results){
    var aux_x =  JSON.parse(all_results.model_specific_results.transf_lineweaver_burk_x_val.linear_power);
    var aux_y =JSON.parse(all_results.model_specific_results.transf_lineweaver_burk_y_val.linear_power);

    var lin_burk_x = [], lin_burk_y = [];
    for (var i = 0; i < aux_x.length; i++) {
        lin_burk_x.push(parseFloat(aux_x[i]));
        lin_burk_y.push(parseFloat(aux_y[i]));
  }

    var lin_burk = {
        x: lin_burk_x,
        y: lin_burk_y,
        mode: 'line',
        name: 'Lineweaver-Burk',
            line: {
            color: 'rgb(76, 153, 0)',
            width: 2,
            shape: 'spline',
            smoothing: 1.3
        }
    };

    var lin_burk_layout = {
        title: 'Lineweaver-Burk Plot',
        xaxis: {
            title: 'x',
            showgrid: false,
            zeroline: true
        },
        yaxis: {
            title: 'y',
            showgrid: false,
            zeroline: true
        },
        autosize: true
        //width: 600,
        //height: 450
    };
    
    Plotly.newPlot('charts_lp_lin_burk', [lin_burk], lin_burk_layout, {showSendToCloud: true});
   
    aux_x = []; aux_y=[];
    aux_x =  JSON.parse(all_results.model_specific_results.transf_eadie_hofstee_x_val.linear_power);
    aux_y =JSON.parse(all_results.model_specific_results.transf_eadie_hofstee_y_val.linear_power);
    
    var eadie_hofstee_x = [], eadie_hofstee_y = [];
    for (var i = 0; i < aux_x.length; i++) {
        eadie_hofstee_x.push(parseFloat(aux_x[i]));
        eadie_hofstee_y.push(parseFloat(aux_y[i]));
    }

    var eadie_hofstee = {
        x: eadie_hofstee_x,
        y: eadie_hofstee_y,
        mode: 'line',
        name: 'Eadie-Hofstee',
            line: {
            color: 'rgb(76, 153, 0)',
            width: 2,
            shape: 'spline',
            smoothing: 1.3
        }
    };

    var eadie_hofstee_layout = {
        title: 'Eadie-Hofstee Plot',
        xaxis: {
            title: 'x',
            showgrid: false,
            zeroline: true
        },
        yaxis: {
            title: 'y',
            showgrid: false,
            zeroline: true
        },
        autosize: true
        //width: 600,
        //height: 450
    };
    
    Plotly.newPlot('charts_lp_eadie_hofstee', [eadie_hofstee], eadie_hofstee_layout, {showSendToCloud: true});
        
    
    aux_x = []; aux_y=[];
    aux_x =  JSON.parse(all_results.model_specific_results.transf_hanes_woolf_x_val.linear_power);
    aux_y =JSON.parse(all_results.model_specific_results.transf_hanes_woolf_y_val.linear_power);

    var hanes_woolf_x = [], hanes_woolf_y = [];
    for (var i = 0; i < aux_x.length; i++) {
        hanes_woolf_x.push(parseFloat(aux_x[i]));
        hanes_woolf_y.push(parseFloat(aux_y[i]));
  }

    var hanes_woolf = {
        x: hanes_woolf_x,
        y: hanes_woolf_y,
        mode: 'line',
        name: 'Hanes-Woolf',
            line: {
            color: 'rgb(76, 153, 0)',
            width: 2,
            shape: 'spline',
            smoothing: 1.3
        }
    };

    var hanes_woolf_layout = {
        title: 'Hanes-Woolf Plot',
        xaxis: {
            title: 'x',
            showgrid: false,
            zeroline: true
        },
        yaxis: {
            title: 'y',
            showgrid: false,
            zeroline: true
        },
        autosize: true,
        //width: 600,
        //height: 450
    };
    
    Plotly.newPlot('charts_lp_hanes_woolf', [hanes_woolf], hanes_woolf_layout, {showSendToCloud: true});
}
function grafico_linear_reciprocal_model(all_results){
    var aux_x =  JSON.parse(all_results.model_specific_results.transf_lineweaver_burk_x_val.linear_reciprocal_exponential);
    var aux_y =JSON.parse(all_results.model_specific_results.transf_lineweaver_burk_y_val.linear_reciprocal_exponential);

    var lin_burk_x = [], lin_burk_y = [];
    for (var i = 0; i < aux_x.length; i++) {
        lin_burk_x.push(parseFloat(aux_x[i]));
        lin_burk_y.push(parseFloat(aux_y[i]));
    }

    var lin_burk = {
        x: lin_burk_x,
        y: lin_burk_y,
        mode: 'line',
        name: 'Lineweaver-Burk',
            line: {
            color: 'rgb(220, 0, 100)',
            width: 2,
            shape: 'spline',
            smoothing: 1.3
        }
    };

    var lin_burk_layout = {
        title: 'Lineweaver-Burk Plot',
        xaxis: {
            title: 'x',
            showgrid: false,
            zeroline: true
        },
        yaxis: {
            title: 'y',
            showgrid: false,
            zeroline: true
        },
        autosize: true
        //width: 600,
        //height: 450
    };
    
    Plotly.newPlot('charts_lr_lin_burk', [lin_burk], lin_burk_layout, {showSendToCloud: true});
   
    aux_x = []; aux_y=[];
    aux_x =  JSON.parse(all_results.model_specific_results.transf_eadie_hofstee_x_val.linear_reciprocal_exponential);
    aux_y =JSON.parse(all_results.model_specific_results.transf_eadie_hofstee_y_val.linear_reciprocal_exponential);
    
    var eadie_hofstee_x = [], eadie_hofstee_y = [];
    for (var i = 0; i < aux_x.length; i++) {
        eadie_hofstee_x.push(parseFloat(aux_x[i]));
        eadie_hofstee_y.push(parseFloat(aux_y[i]));
    }

    var eadie_hofstee = {
        x: eadie_hofstee_x,
        y: eadie_hofstee_y,
        mode: 'line',
        name: 'Eadie-Hofstee',
            line: {
            color: 'rgb(220, 0, 100)',
            width: 2,
            shape: 'spline',
            smoothing: 1.3
        }
    };

    var eadie_hofstee_layout = {
        title: 'Eadie-Hofstee Plot',
        xaxis: {
            title: 'x',
            showgrid: false,
            zeroline: true
        },
        yaxis: {
            title: 'y',
            showgrid: false,
            zeroline: true
        },
        autosize: true
        //width: 600,
        //height: 450
    };
    
    Plotly.newPlot('charts_lr_eadie_hofstee', [eadie_hofstee], eadie_hofstee_layout, {showSendToCloud: true});
        
    
    aux_x = []; aux_y=[];
    aux_x =  JSON.parse(all_results.model_specific_results.transf_hanes_woolf_x_val.linear_reciprocal_exponential);
    aux_y =JSON.parse(all_results.model_specific_results.transf_hanes_woolf_y_val.linear_reciprocal_exponential);

    var hanes_woolf_x = [], hanes_woolf_y = [];
    for (var i = 0; i < aux_x.length; i++) {
        hanes_woolf_x.push(parseFloat(aux_x[i]));
        hanes_woolf_y.push(parseFloat(aux_y[i]));
  }

    var hanes_woolf = {
        x: hanes_woolf_x,
        y: hanes_woolf_y,
        mode: 'line',
        name: 'Hanes-Woolf',
            line: {
            color: 'rgb(220, 0, 100)',
            width: 2,
            shape: 'spline',
            smoothing: 1.3
        }
    };

    var hanes_woolf_layout = {
        title: 'Hanes-Woolf Plot',
        xaxis: {
            title: 'x',
            showgrid: false,
            zeroline: true
        },
        yaxis: {
            title: 'y',
            showgrid: false,
            zeroline: true
        },
        autosize: true,
        //width: 600,
        //height: 450
    };
    
    Plotly.newPlot('charts_lr_hanes_woolf', [hanes_woolf], hanes_woolf_layout, {showSendToCloud: true});
}

function grafico_linear_exponential_model(all_results){
    var aux_x =  JSON.parse(all_results.model_specific_results.transf_lineweaver_burk_x_val.linear_exponential);
    var aux_y =JSON.parse(all_results.model_specific_results.transf_lineweaver_burk_y_val.linear_exponential);

    var lin_burk_x = [], lin_burk_y = [];
    for (var i = 0; i < aux_x.length; i++) {
        lin_burk_x.push(parseFloat(aux_x[i]));
        lin_burk_y.push(parseFloat(aux_y[i]));
    }

    var lin_burk = {
        x: lin_burk_x,
        y: lin_burk_y,
        mode: 'line',
        name: 'Lineweaver-Burk',
            line: {
            color: 'rgb(51, 153, 255)',
            width: 2,
            shape: 'spline',
            smoothing: 1.3
        }
    };

    var lin_burk_layout = {
        title: 'Lineweaver-Burk Plot',
        xaxis: {
            title: 'x',
            showgrid: false,
            zeroline: true
        },
        yaxis: {
            title: 'y',
            showgrid: false,
            zeroline: true
        },
        autosize: true
        //width: 600,
        //height: 450
    };
    
    Plotly.newPlot('charts_le_lin_burk', [lin_burk], lin_burk_layout, {showSendToCloud: true});
   
    aux_x = []; aux_y=[];
    aux_x =  JSON.parse(all_results.model_specific_results.transf_eadie_hofstee_x_val.linear_exponential);
    aux_y =JSON.parse(all_results.model_specific_results.transf_eadie_hofstee_y_val.linear_exponential);
    
    var eadie_hofstee_x = [], eadie_hofstee_y = [];
    for (var i = 0; i < aux_x.length; i++) {
        eadie_hofstee_x.push(parseFloat(aux_x[i]));
        eadie_hofstee_y.push(parseFloat(aux_y[i]));
    }

    var eadie_hofstee = {
        x: eadie_hofstee_x,
        y: eadie_hofstee_y,
        mode: 'line',
        name: 'Eadie-Hofstee',
            line: {
            color: 'rgb(51, 153, 255)',
            width: 2,
            shape: 'spline',
            smoothing: 1.3
        }
    };

    var eadie_hofstee_layout = {
        title: 'Eadie-Hofstee Plot',
        xaxis: {
            title: 'x',
            showgrid: false,
            zeroline: true
        },
        yaxis: {
            title: 'y',
            showgrid: false,
            zeroline: true
        },
        autosize: true
        //width: 600,
        //height: 450
    };
    
    Plotly.newPlot('charts_le_eadie_hofstee', [eadie_hofstee], eadie_hofstee_layout, {showSendToCloud: true});
        
    
    aux_x = []; aux_y=[];
    aux_x =  JSON.parse(all_results.model_specific_results.transf_hanes_woolf_x_val.linear_exponential);
    aux_y =JSON.parse(all_results.model_specific_results.transf_hanes_woolf_y_val.linear_exponential);

    var hanes_woolf_x = [], hanes_woolf_y = [];
    for (var i = 0; i < aux_x.length; i++) {
        hanes_woolf_x.push(parseFloat(aux_x[i]));
        hanes_woolf_y.push(parseFloat(aux_y[i]));
  }

    var hanes_woolf = {
        x: hanes_woolf_x,
        y: hanes_woolf_y,
        mode: 'line',
        name: 'Hanes-Woolf',
            line: {
            color: 'rgb(51, 153, 255)',
            width: 2,
            shape: 'spline',
            smoothing: 1.3
        }
    };

    var hanes_woolf_layout = {
        title: 'Hanes-Woolf Plot',
        xaxis: {
            title: 'x',
            showgrid: false,
            zeroline: true
        },
        yaxis: {
            title: 'y',
            showgrid: false,
            zeroline: true
        },
        autosize: true,
        //width: 600,
        //height: 450
    };
    
    Plotly.newPlot('charts_le_hanes_woolf', [hanes_woolf], hanes_woolf_layout, {showSendToCloud: true});
}

function grafico_direct_adjust_model(all_results){
    var aux_x =  JSON.parse(all_results.model_specific_results.transf_lineweaver_burk_x_val.direct_adjust);
    var aux_y =JSON.parse(all_results.model_specific_results.transf_lineweaver_burk_y_val.direct_adjust);

    var lin_burk_x = [], lin_burk_y = [];
    for (var i = 0; i < aux_x.length; i++) {
        lin_burk_x.push(parseFloat(aux_x[i]));
        lin_burk_y.push(parseFloat(aux_y[i]));
    }

    var lin_burk = {
        x: lin_burk_x,
        y: lin_burk_y,
        mode: 'line',
        name: 'Lineweaver-Burk',
            line: {
            color: 'rgb(100, 100, 100)',
            width: 2,
            shape: 'spline',
            smoothing: 1.3
        }
    };

    var lin_burk_layout = {
        title: 'Lineweaver-Burk Plot',
        xaxis: {
            title: 'x',
            showgrid: false,
            zeroline: true
        },
        yaxis: {
            title: 'y',
            showgrid: false,
            zeroline: true
        },
        autosize: true
        //width: 600,
        //height: 450
    };
    
    Plotly.newPlot('charts_da_lin_burk', [lin_burk], lin_burk_layout, {showSendToCloud: true});
   
    aux_x = []; aux_y=[];
    aux_x =  JSON.parse(all_results.model_specific_results.transf_eadie_hofstee_x_val.direct_adjust);
    aux_y =JSON.parse(all_results.model_specific_results.transf_eadie_hofstee_y_val.direct_adjust);
    
    var eadie_hofstee_x = [], eadie_hofstee_y = [];
    for (var i = 0; i < aux_x.length; i++) {
        eadie_hofstee_x.push(parseFloat(aux_x[i]));
        eadie_hofstee_y.push(parseFloat(aux_y[i]));
    }

    var eadie_hofstee = {
        x: eadie_hofstee_x,
        y: eadie_hofstee_y,
        mode: 'line',
        name: 'Eadie-Hofstee',
            line: {
            color: 'rgb(100, 100, 100)',
            width: 2,
            shape: 'spline',
            smoothing: 1.3
        }
    };

    var eadie_hofstee_layout = {
        title: 'Eadie-Hofstee Plot',
        xaxis: {
            title: 'x',
            showgrid: false,
            zeroline: true
        },
        yaxis: {
            title: 'y',
            showgrid: false,
            zeroline: true
        },
        autosize: true
        //width: 600,
        //height: 450
    };
    
    Plotly.newPlot('charts_da_eadie_hofstee', [eadie_hofstee], eadie_hofstee_layout, {showSendToCloud: true});
        
    
    aux_x = []; aux_y=[];
    aux_x =  JSON.parse(all_results.model_specific_results.transf_hanes_woolf_x_val.direct_adjust);
    aux_y =JSON.parse(all_results.model_specific_results.transf_hanes_woolf_y_val.direct_adjust);

    var hanes_woolf_x = [], hanes_woolf_y = [];
    for (var i = 0; i < aux_x.length; i++) {
        hanes_woolf_x.push(parseFloat(aux_x[i]));
        hanes_woolf_y.push(parseFloat(aux_y[i]));
  }

    var hanes_woolf = {
        x: hanes_woolf_x,
        y: hanes_woolf_y,
        mode: 'line',
        name: 'Hanes-Woolf',
            line: {
            color: 'rgb(100, 100, 100)',
            width: 2,
            shape: 'spline',
            smoothing: 1.3
        }
    };

    var hanes_woolf_layout = {
        title: 'Hanes-Woolf Plot',
        xaxis: {
            title: 'x',
            showgrid: false,
            zeroline: true
        },
        yaxis: {
            title: 'y',
            showgrid: false,
            zeroline: true
        },
        autosize: true,
        //width: 600,
        //height: 450
    };
    
    Plotly.newPlot('charts_da_hanes_woolf', [hanes_woolf], hanes_woolf_layout, {showSendToCloud: true});
}

$('.back-button').on('click', function() {
    //alert("OI");
    if (!window.name)
        return false;

    var all_results = JSON.parse(window.name);
    all_results = all_results.all_results;

    //console.log(all_results);
    

    //alert("OI");
    window.name = JSON.stringify(all_results);
    window.location = "1_data.html";
});


$("#download_table").click(function(){
    //$("#table").jexcel("download");
    $("#kinetica_depletion_data_table").tableExport();  
});

$("#download_kinetica_model_analysis_table").click(function(){
    $("#kinetica_model_analysis_table").tableExport(); 
});

$("#download_kinetica_kinetic_parameters_table").click(function(){
    $("#kinetica_kinetic_parameters_table").tableExport(); 
});
$("#download_grafico1").click(function(){
    Plotly.downloadImage(chartsTest2, {format: 'svg', width: 800, height: 600, filename: 'kinetica_depletion_curves'});
});



$("#download_all_LP").click(function(){
    Plotly.downloadImage(chartsLinear_Power, {format: 'svg', width: 800, height: 600, filename: 'kinetica_lp_michaelis-menten'});
    Plotly.downloadImage(charts_lp_lin_burk, {format: 'svg', width: 800, height: 600, filename: 'kinetica_lp_lin_burk'});
    Plotly.downloadImage(charts_lp_eadie_hofstee, {format: 'svg', width: 800, height: 600, filename: 'kinetica_lp_eadie_hofstee'});
    Plotly.downloadImage(charts_lp_hanes_woolf, {format: 'svg', width: 800, height: 600, filename: 'kinetica_lp_hanes_woolf'});

});

$("#download_all_LE").click(function(){
    Plotly.downloadImage(chartsLinear_Exponential, {format: 'svg', width: 800, height: 600, filename: 'kinetica_le_michaelis-menten'});
    Plotly.downloadImage(charts_le_lin_burk, {format: 'svg', width: 800, height: 600, filename: 'kinetica_le_lin_burk'});
    Plotly.downloadImage(charts_le_eadie_hofstee, {format: 'svg', width: 800, height: 600, filename: 'kinetica_le_eadie_hofstee'});
    Plotly.downloadImage(charts_le_hanes_woolf, {format: 'svg', width: 800, height: 600, filename: 'kinetica_le_hanes_woolf'});

});

$("#download_all_LRE").click(function(){
    Plotly.downloadImage(chartsLinear_Reciprocal_Exponential, {format: 'svg', width: 800, height: 600, filename: 'kinetica_lr_michaelis-menten'});
    Plotly.downloadImage(charts_lr_lin_burk, {format: 'svg', width: 800, height: 600, filename: 'kinetica_lr_lin_burk'});
    Plotly.downloadImage(charts_lr_eadie_hofstee, {format: 'svg', width: 800, height: 600, filename: 'kinetica_lr_eadie_hofstee'});
    Plotly.downloadImage(charts_lr_hanes_woolf, {format: 'svg', width: 800, height: 600, filename: 'kinetica_lr_hanes_woolf'});

});

$("#download_all_DA").click(function(){
    Plotly.downloadImage(chartsDirect_Adjust, {format: 'svg', width: 800, height: 600, filename: 'kinetica_da_michaelis-menten'});
    Plotly.downloadImage(charts_da_lin_burk, {format: 'svg', width: 800, height: 600, filename: 'kinetica_da_lin_burk'});
    Plotly.downloadImage(charts_da_eadie_hofstee, {format: 'svg', width: 800, height: 600, filename: 'kinetica_da_eadie_hofstee'});
    Plotly.downloadImage(charts_da_hanes_woolf, {format: 'svg', width: 800, height: 600, filename: 'kinetica_da_hanes_woolf'});

});

$( document ).ready(function() {
    var k_name = sessionStorage.getItem('k_name');
    var k_email = sessionStorage.getItem('k_email');
    var k_organization = sessionStorage.getItem('k_organization');
    if(k_name == null || k_email==null || k_organization == null)
        window.location = "index.html";
    });