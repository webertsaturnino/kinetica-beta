$(document).ready(function(){
    //tabela 01
    
//      if (!window.name)
//        return false;
//    var all_results = JSON.parse(window.name);
    var all_results = jsonObject.all_results;


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
    //Tabela 1
    //Linha 0
    $("#tabela1").children("tbody").children('tr:eq(0)').children('td:eq(2)').html(linear_points.linear_power); // Linha 0 coluna 3
    $("#tabela1").children("tbody").children('tr:eq(0)').children('td:eq(3)').html("q(t) = " + a.linear_power.toFixed(2) + " + ("+b.linear_power.toFixed(2)+") t"); // Linha 0 coluna 4
    $("#tabela1").children("tbody").children('tr:eq(0)').children('td:eq(4)').html(s_lin.linear_power.toFixed(2)); // Linha 0 coluna 5
    $("#tabela1").children("tbody").children('tr:eq(0)').children('td:eq(5)').html(s_conj.linear_power.toFixed(2)); // Linha 0 coluna 6
    $("#tabela1").children("tbody").children('tr:eq(0)').children('td:eq(6)').html(r_lin.linear_power.toFixed(2)); // Linha 0 coluna 7
    $("#tabela1").children("tbody").children('tr:eq(0)').children('td:eq(7)').html(r_conj.linear_power.toFixed(2)); // Linha 0 coluna 8

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

    //Linha 5
    $("#tabela1").children("tbody").children('tr:eq(5)').children('td:eq(1)').html(nonlinear_points.linear_reciprocal_exponential); // Linha 0 coluna 3
    $("#tabela1").children("tbody").children('tr:eq(5)').children('td:eq(2)').html("q(t) = " + c.linear_reciprocal_exponential.toFixed(2) + " e<sup>"+d.linear_reciprocal_exponential.toFixed(2)+"/t</sup>"); // Linha 0 coluna 4
    $("#tabela1").children("tbody").children('tr:eq(5)').children('td:eq(3)').html(s_nlin.linear_reciprocal_exponential.toFixed(2)); // Linha 0 coluna 6
    $("#tabela1").children("tbody").children('tr:eq(5)').children('td:eq(4)').html(r_nlin.linear_reciprocal_exponential.toFixed(2)); // Linha 0 coluna 7


    //TABELA 2
    $("#tabela2").children("thead").children('tr:eq(1)').children('th:eq(0)').html(all_results.system_common_results.matter_quantity_unit.system_value);
    $("#tabela2").children("thead").children('tr:eq(1)').children('th:eq(1)').html(all_results.system_common_results.time_unit.system_value);
    $("#tabela2").children("thead").children('tr:eq(1)').children('th:eq(2)').html(all_results.system_common_results.concentration_unit.system_value);
    $("#tabela2").children("thead").children('tr:eq(1)').children('th:eq(3)').html(all_results.system_common_results.uptake_rate_unit.system_value);
    $("#tabela2").children("thead").children('tr:eq(1)').children('th:eq(4)').html(all_results.system_common_results.concentration_unit.system_value);


    //Coluna 1
    var qm = all_results.model_specific_results.qm;
    $("#tabela2").children("tbody").children('tr:eq(0)').children('td:eq(1)').html(qm.linear_power.toFixed(3));
    $("#tabela2").children("tbody").children('tr:eq(1)').children('td:eq(1)').html(qm.linear_exponential.toFixed(3));
    $("#tabela2").children("tbody").children('tr:eq(2)').children('td:eq(1)').html(qm.linear_reciprocal_exponential.toFixed(3));

    //Coluna 2
    var tm = all_results.model_specific_results.tm;
    $("#tabela2").children("tbody").children('tr:eq(0)').children('td:eq(2)').html(tm.linear_power.toFixed(3));
    $("#tabela2").children("tbody").children('tr:eq(1)').children('td:eq(2)').html(tm.linear_exponential.toFixed(3));
    $("#tabela2").children("tbody").children('tr:eq(2)').children('td:eq(2)').html(tm.linear_reciprocal_exponential.toFixed(3));
    
    //Coluna 3
    var km = all_results.model_specific_results.km;
    $("#tabela2").children("tbody").children('tr:eq(0)').children('td:eq(3)').html(km.linear_power.toFixed(3));
    $("#tabela2").children("tbody").children('tr:eq(1)').children('td:eq(3)').html(km.linear_exponential.toFixed(3));
    $("#tabela2").children("tbody").children('tr:eq(2)').children('td:eq(3)').html(km.linear_reciprocal_exponential.toFixed(3));
    
    //Coluna 4
    var vmax = all_results.model_specific_results.vmax;
    $("#tabela2").children("tbody").children('tr:eq(0)').children('td:eq(4)').html(vmax.linear_power.toFixed(3));
    $("#tabela2").children("tbody").children('tr:eq(1)').children('td:eq(4)').html(vmax.linear_exponential.toFixed(3));
    $("#tabela2").children("tbody").children('tr:eq(2)').children('td:eq(4)').html(vmax.linear_reciprocal_exponential.toFixed(3));
    
    //Coluna 5
    var cmin = all_results.model_specific_results.cmin;
    $("#tabela2").children("tbody").children('tr:eq(0)').children('td:eq(5)').html(cmin.linear_power.toFixed(3));
    $("#tabela2").children("tbody").children('tr:eq(1)').children('td:eq(5)').html(cmin.linear_exponential.toFixed(3));
    $("#tabela2").children("tbody").children('tr:eq(2)').children('td:eq(5)').html(cmin.linear_reciprocal_exponential.toFixed(3));
    

    //grafico
    //TODO:VOLTAR COM ESSAS LINHAS;
    //var concentrations = JSON.parse(all_results.system_common_results.concentrations.system_value.replace(/'/g, '\"'));
    //var rates_linear_power = JSON.parse(all_results.model_specific_results.uptake_rates.linear_power.replace(/'/g, '\"'));
    //var rates_linear_exponential = JSON.parse(all_results.model_specific_results.uptake_rates.linear_exponential.replace(/'/g, '\"'));
    //var rates_linear_reciprocal_exponential = JSON.parse(all_results.model_specific_results.uptake_rates.linear_reciprocal_exponential.replace(/'/g, '\"'));
    //var chart_data_linear_power = [], chart_data_linear_exponential = [], chart_data_linear_reciprocal_exponential = [];
    
    var concentrations = all_results.system_common_results.concentrations.system_value;
    var rates_linear_power = JSON.parse(all_results.model_specific_results.uptake_rates.linear_power);
    var rates_linear_exponential = JSON.parse(all_results.model_specific_results.uptake_rates.linear_exponential);
    var rates_linear_reciprocal_exponential = JSON.parse(all_results.model_specific_results.uptake_rates.linear_reciprocal_exponential);
    var chart_data_linear_power = [], chart_data_linear_exponential = [], chart_data_linear_reciprocal_exponential = [];
    
    
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
        if(concentrations[i] > max_x)
            max_x = concentrations[i];
        
        if(rates_linear_power[i] > max_y)
            max_y = rates_linear_power[i];
        
        if(rates_linear_exponential[i] > max_y)
            max_y = rates_linear_exponential[i];

        if(rates_linear_reciprocal_exponential[i] > max_y)
            max_y = rates_linear_reciprocal_exponential[i];
        
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

    for (var i = 0; i < concentrations.length; i++) {
        linear_Power_x.push(parseFloat(concentrations[i]));
        linear_Power_y.push(rates_linear_power[i]);

        linear_exponential_x.push(parseFloat(concentrations[i]));
        linear_exponential_y.push(rates_linear_exponential[i]);

        linear_reciprocal_exponential_x.push(parseFloat(concentrations[i]));
        linear_reciprocal_exponential_y.push(rates_linear_reciprocal_exponential[i]);
    }



    var Linear_Power = {
        x: linear_Power_x,
        y: linear_Power_y,
        mode: 'line',
        name: 'Linear + Power',
            line: {
            color: 'rgb(219, 0, 0)',
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
            color: 'rgb(0, 219, 0)',
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
            color: 'rgb(0, 0, 219)',
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
        width: 600,
        height: 450,
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
    width: 600,
    height: 450,

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
    width: 600,
    height: 450,


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
    
});


function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    console.log(array);
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}