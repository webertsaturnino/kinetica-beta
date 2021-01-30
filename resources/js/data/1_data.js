﻿//Máscaras de campos
$('.mask-money').mask('###0.00', {
    reverse: true
});
$('.mask-integer').mask('#0', {
    reverse: true
});

//Tratamento de eventos dos campos
$('#concentration_unit').on('change', function() {
    var und = $(this).val().replace(/.*\/(\w+)/, '$1')
    var cont = "Sampled volume";
    $('.addon-volume').html(und);
    $("#col-2").html(cont + '<br>(' + und + ')' );
    
    var cont = "Instant Concentration";
    var und = $(this).val();
    $("#col-1").html(cont + '<br>(' + und + ')' );
});
$('#absorbing_tissue_measure_unit').on('change', function() {
    $('.addon-root_tissue').html($(this).val());
});

$('#absorbing_tissue_measure').on('change', function() {
    var valor = $(this).val();
    if(valor <= 0){
        $(this).val("");
        $("#errorRoot").fadeIn(700, function(){
            setTimeout(function(){ 
                $('#errorRoot').fadeOut();
            }, 5000);                
        });  
    }
});

$('#time_unit').on('change', function() {
    var und = $(this).val().replace(/.*\/(\w+)/, '$1')
    var cont = "Sampling time"
    $("#col-0").html(cont + '<br>(' + und + ')' );
});


$('#final_volume').on('change', function() {
    var und = $(this).val();
    var initial_volume = Number($("#initial_volume").val().replace(',', '')) || 0;
    var final_volume = Number($("#final_volume").val().replace(',', '')) || 0;
    if(final_volume > initial_volume){
        $(this).val("");
        $("#errorVolume").fadeIn(700, function(){
            setTimeout(function(){ 
                $('#errorVolume').fadeOut();
            }, 5000);                
        });  
    }
});

$('#initial_volume').on('change', function() {
    var und = $(this).val();
    if(und <= 0) {    
        $(this).val("");
        $("#errorVolumeInicial").fadeIn(700, function(){
            setTimeout(function(){ 
                $('#errorVolumeInicial').fadeOut();
            }, 5000);                
        });  
    }
});

$('#samples').on('change', function() {
    addCampos();
});


function addCampos(){
    var quant = $("#samples").val();
    if(quant < 8){
        $("#samples").val("8");
    }
        
    var numRows = $('#mytable').jexcel('getData').length;
    var value = Number($("#samples").val());

    if (value > numRows) {
        $('#mytable').jexcel('insertRow', value - numRows);
    } else if (value < numRows)
        $('#mytable').jexcel('deleteRow', value, numRows - value);

}
function getDataInput() {
    var data = {
        "concentration_unit": $("#concentration_unit :selected").val(),
        "time_unit": $("#time_unit :selected").val(),
        "absorbing_tissue_measure_unit": $("#absorbing_tissue_measure_unit :selected").val(),
        "initial_volume": Number($("#initial_volume").val().replace(',', '')) || 0,
        "final_volume": Number($("#final_volume").val().replace(',', '')) || 0,
        "absorbing_tissue_measure": Number($("#absorbing_tissue_measure").val().replace(',', '')) || 0,
        "sampling_times": $('#mytable').jexcel('getColumnData', 0),
        "observed_instant_concentrations": $('#mytable').jexcel('getColumnData', 1),
        "sampling_volumes": $('#mytable').jexcel('getColumnData', 2)
    };

    for (var i = 0; i < data.sampling_volumes.length; i++) {
        data.sampling_times[i] = Number(data.sampling_times[i].replace(',', '.')) || 0;
        data.observed_instant_concentrations[i] = Number(data.observed_instant_concentrations[i].replace(',', '.')) || 0;
        data.sampling_volumes[i] = Number(data.sampling_volumes[i].replace(',', '.')) || 0;
    }
    console.log(data);
    return data;

}

$('.next-button').on('click', function() {
    if(validacao())
        return;
    
    $('.loading').show();
    $.support.cors = true;
    $.ajax({
        url: "https://us-central1-nifty-inkwell-237614.cloudfunctions.net/kinetica",
        type: 'POST',
        data: JSON.stringify(getDataInput()),
        contentType: "application/json; charset=UTF-8",
        dataType: 'json',
        crossDomain: true,
        
        success: function(resp) {
            window.name = JSON.stringify(resp);
            window.location = "2_checkout.html";
        },
        error: function(jqx) {
            console.error(jqx.status + ': ' + jqx.statusText);
            showError();
        },
        complete: function() {
            $('.loading').hide();
        }
    });
});



$( document ).ready(function() {

    var k_name = sessionStorage.getItem('k_name');
    var k_email = sessionStorage.getItem('k_email');
    var k_organization = sessionStorage.getItem('k_organization');
    //console.log(k_name, k_email,  k_organization );
    //return;

    if(k_name == null || k_email==null || k_organization == null)
        window.location = "index.html";

    //Inicialização da planilha
    var data = [],
        colHeaders = [
            translation[$("#language :selected").val()]['sampling_time'] || translation['en']['sampling_time'],
            translation[$("#language :selected").val()]['observed_instant_concentrations'] || translation['en']['observed_instant_concentrations'],
            translation[$("#language :selected").val()]['sampled_volume'] || translation['en']['sampled_volume']
        ];

    

    $('#mytable').jexcel({
        data: data,
        colHeaders: colHeaders,
        colWidths: [150, 200, 170],
        oninsertrow: function(e) {
            $('#samples').val(e.jexcel('getData').length);
        }
    });
    
    addCampos();
    
    //carregarDadosInicio();
    //console.log(window.name);
    if (!window.name)
        return false;

    var all_results = JSON.parse(window.name);
    //]all_results = all_results.all_results;
    if (typeof all_results != 'object')
        return false;

    carregarDadosCache(all_results);
    console.log(all_results)
    
});

function carregarDadosCache(all_results){
    //all_results = all_results.all_results;
    var a = all_results.system_common_results.concentration_unit.value;
    $('#concentration_unit option[value="'+a+'"]').attr('selected','selected').change();
    
    a = all_results.system_common_results.time_unit.value;
    $('#time_unit option[value="'+a+'"]').attr('selected','selected').change();
    
    a = all_results.system_common_results.absorbing_tissue_measure_unit.value;
    $('#absorbing_tissue_measure_unit option[value="'+a+'"]').attr('selected','selected').change();
    
    a = all_results.system_common_results.initial_volume.value;
    $('#initial_volume').val(a);
    
    a = all_results.system_common_results.final_volume.value;
    $('#final_volume').val(a);

    a = all_results.system_common_results.absorbing_tissue_measure.value;
    $('#absorbing_tissue_measure').val(a);
    
    var data = [];
    var times = JSON.parse(all_results.system_common_results.sampling_times.value.replace(/'/g, '\"'));
    var observed_instant_concentrations = JSON.parse(all_results.system_common_results.observed_concentrations.value.replace(/'/g, '\"'));
    var sampling_volumes = JSON.parse(all_results.system_common_results.sampling_volumes.value.replace(/'/g, '\"'));
    for (var i = 0; i <  times.length; i++) {
        
        data.push([
            times[i],
            observed_instant_concentrations[i],
            sampling_volumes[i]
        ]);
    }
    $('#mytable').jexcel('setData',data);

}

function carregarDadosInicio(){
    $("#concentration_unit").prop("selectedIndex", 3).change();
    $("#time_unit").prop("selectedIndex", 3).change();
    $("#absorbing_tissue_measure_unit").prop("selectedIndex", 1).change();
    $("#initial_volume").val(19);
    $("#final_volume").val(14);
    $("#absorbing_tissue_measure").val(5500.00);
    $('#mytable').jexcel('setData',[["0.0", "397.0", "0.01"], ["0.5", "346.5", "0.03"], ["1.0", "296.0", "0.01"], ["1.5", "245.5", "0.05"], ["2.0", "195.0", "0.01"], ["2.5", "144.4", "0.02"], ["3.0", "94.0", "0.04"], ["3.5", "80.0", "0.02"], ["4.0", "66.0", "0.02"], ["4.5", "54.0", "0.02"], ["5.0", "41.0", "0.01"], ["5.5", "40.0", "0.01"], ["6.0", "42.0", "0.01"]]);
   
}

$(".clear-button").click(function(){
    $('#mytable').jexcel('setData',[["", "", ""],["", "", ""],["", "", ""],["", "", ""],["", "", ""],["", "", ""],["", "", ""],["", "", ""]]);
    $("#col-0").html("Sampling time");
    $("#col-1").html("Instant Concentration");
    $("#col-2").html("Samples volume");
    $('.addon-volume').html("");
    $('.addon-root_tissue').html("");
});
$("#load-button").click(function(){
    
    carregarDadosInicio();    
});

function validacao(){
    var flag = 0;
    //Validacao coluna 0
    var col = $('#mytable').jexcel('getColumnData', 0);
    for(var i = 0 ; i < col.length - 1; i++){
        if(col[i] > col[i + 1]){
            //Mensagem de texto
            var msg = "Sampling time error: Erro na linha " + (i+1);
            $("#erroTabelaColuna0").html(msg); 
            $("#erroTabelaColuna0").fadeIn(700, function(){
                setTimeout(function(){ 
                    $('#erroTabelaColuna0').fadeOut();
                }, 5000);                
            });
            $("#help").fadeIn(1000);
            flag = 1;
            break;
        }
    }
    //Validacao coluna 1
    col = $('#mytable').jexcel('getColumnData', 1);
    var valoresErrados = "";
    for(var i = 0 ; i < col.length; i++){
        if(col[i] < 0){
            if(valoresErrados == "")
                valoresErrados = (i+1);
            else
                valoresErrados = valoresErrados + ", "+ (i+1); 
        }
    }
    if(valoresErrados != ""){
        //Mensagem de texto
        var msg = "Instant concentration error: Valores errados nas linhas " + (valoresErrados);
        $("#erroTabelaColuna1").html(msg+"."); 
        $("#erroTabelaColuna1").fadeIn(700, function(){
            setTimeout(function(){ 
                $('#erroTabelaColuna1').fadeOut();
            }, 5000);                
        });
        $("#help").fadeIn(1000);  
        flag = 1;  
    }

    //Validacao coluna 2
    col = $('#mytable').jexcel('getColumnData', 2);
    var soma = 0;
    for(var i = 0 ; i < col.length; i++){
        soma += Number(col[i]);
    }
    var inicial = Number($("#initial_volume").val().replace(',', '')) || 0;
    var final = Number($("#final_volume").val().replace(',', '')) || 0;
    if(soma > (inicial-final)){
        //Mensagem de texto
        var msg = "Sampled volume error: ";
        $("#erroTabelaColuna2").html(msg); 
        $("#erroTabelaColuna2").fadeIn(700, function(){
            setTimeout(function(){ 
                $('#erroTabelaColuna2').fadeOut();
            }, 5000);                
        });  
        $("#help").fadeIn(1000);  
        flag = 1;
    }

    //Validacao de campos vazios 
    if ($("#concentration_unit :selected").val() == '' ||
        $("#time_unit :selected").val()  == '' ||
        $("#absorbing_tissue_measure_unit :selected")  == '' ||
        ($("#initial_volume").val().replace(',', '')) == '' ||
        ($("#final_volume").val().replace(',', '')) == '' ||
        ($("#absorbing_tissue_measure").val().replace(',', '')) == '' ){

            flag = 1;
        }
    //Valida dados primeira coluna (verifica campos vazios)
    var col = $('#mytable').jexcel('getColumnData', 0);
    for(var i = 0 ; i < col.length; i++){
        if(col[i] == ''){
            flag = 1;
            erropreenchimentoTabela();
            break
        }
    }
    //Valida dados segunda coluna (verifica campos vazios)
    var col = $('#mytable').jexcel('getColumnData', 1);
    for(var i = 0 ; i < col.length; i++){
        if(col[i] == ''){
            flag = 1;
            erropreenchimentoTabela();
            break
        }
    }
    //Valida dados terceira coluna (verifica campos vazios)
    var col = $('#mytable').jexcel('getColumnData', 2);
    for(var i = 0 ; i < col.length; i++){
        //if(col[i] == ''){
        //    flag = 1;
        //    erropreenchimentoTabela();
        //    break
       // }
    }


    if(flag == 1)
        return true;
    else
        return false;

}

function erropreenchimentoTabela(){
    var msg = "Erro de preenchimento de tabela, verifique todos os valores de entrada";
    $("#erroPreenchimentoTabela").html(msg); 
    $("#erroPreenchimentoTabela").fadeIn(700, function(){
        setTimeout(function(){ 
            $('#erroPreenchimentoTabela').fadeOut();
        }, 5000);                
    });  
}
    


