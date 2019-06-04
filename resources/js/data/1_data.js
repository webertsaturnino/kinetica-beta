//Máscaras de campos
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
    
    cont = "Instant Concentration";
    und = $(this).val();
    $("#col-1").html(cont + '<br>(' + und + ')' );
});
$('#root_tissue_measure_unit').on('change', function() {
    $('.addon-root_tissue').html($(this).val());
});

$('#root_tissue_measure').on('change', function() {
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
$('#system_final_volume').on('change', function() {
    var und = $(this).val();
    var initial_volume = Number($("#system_initial_volume").val().replace(',', '')) || 0;
    var final_volume = Number($("#system_final_volume").val().replace(',', '')) || 0;
    if(final_volume > initial_volume){
        $(this).val("");
        $("#errorVolume").fadeIn(700, function(){
            setTimeout(function(){ 
                $('#errorVolume').fadeOut();
            }, 5000);                
        });  
    }
});
$('#system_initial_volume').on('change', function() {
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


//Inicialização da planilha
var data = [],
    colHeaders = [
        translation[$("#language :selected").val()]['sampling_time'] || translation['en']['sampling_time'],
        translation[$("#language :selected").val()]['instant_concentration'] || translation['en']['instant_concentration'],
        translation[$("#language :selected").val()]['sampled_volume'] || translation['en']['sampled_volume']
    ];

$('#samples').on('change', function() {
    addCampos();
});

$('#mytable').jexcel({
    data: data,
    colHeaders: colHeaders,
    colWidths: [150, 200, 170],
    oninsertrow: function(e) {
        $('#samples').val(e.jexcel('getData').length);
    }
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
        "root_tissue_measure_unit": $("#root_tissue_measure_unit :selected").val(),
        "system_initial_volume": Number($("#system_initial_volume").val().replace(',', '')) || 0,
        "system_final_volume": Number($("#system_final_volume").val().replace(',', '')) || 0,
        "root_tissue_measure": Number($("#root_tissue_measure").val().replace(',', '')) || 0,
        "time_data": $('#mytable').jexcel('getColumnData', 0),
        "instant_concentration": $('#mytable').jexcel('getColumnData', 1),
        "sampled_volumes": $('#mytable').jexcel('getColumnData', 2)
    };

    for (var i = 0; i < data.sampled_volumes.length; i++) {
        data.time_data[i] = Number(data.time_data[i].replace(',', '.')) || 0;
        data.instant_concentration[i] = Number(data.instant_concentration[i].replace(',', '.')) || 0;
        data.sampled_volumes[i] = Number(data.sampled_volumes[i].replace(',', '.')) || 0;
    }
    //console.log(data);
    return [data];

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
    addCampos();
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
    var inicial = Number($("#system_initial_volume").val().replace(',', '')) || 0;
    if(soma > inicial){
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
        $("#root_tissue_measure_unit :selected")  == '' ||
        ($("#system_initial_volume").val().replace(',', '')) == '' ||
        ($("#system_final_volume").val().replace(',', '')) == '' ||
        ($("#root_tissue_measure").val().replace(',', '')) == '' 
        ){

            flag = 1;
        }
    //Valida dados primeira coluna (verifica campos vazios)
    var col = $('#mytable').jexcel('getColumnData', 0);
    for(var i = 0 ; i < col.length; i++){
        if(col[i] == ''){
            flag = 1;
            preenchimentoTabela();
            break
        }
    }
    //Valida dados segunda coluna (verifica campos vazios)
    var col = $('#mytable').jexcel('getColumnData', 1);
    for(var i = 0 ; i < col.length; i++){
        if(col[i] == ''){
            flag = 1;
            preenchimentoTabela();
            break
        }
    }
    //Valida dados terceira coluna (verifica campos vazios)
    var col = $('#mytable').jexcel('getColumnData', 2);
    for(var i = 0 ; i < col.length; i++){
        if(col[i] == ''){
            flag = 1;
            preenchimentoTabela();
            break
        }
    }


    if(flag == 1)
        return true;
    else
        return false;

}

function preenchimentoTabela(){
    var msg = "Erro de preenchimento de tabela, verifique todos os valores de entrada";
    $("#erroPreenchimentoTabela").html(msg); 
    $("#erroPreenchimentoTabela").fadeIn(700, function(){
        setTimeout(function(){ 
            $('#erroPreenchimentoTabela').fadeOut();
        }, 5000);                
    });  
}
    


