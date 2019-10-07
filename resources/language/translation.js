var translation = {
    'en': {},
    'pt-br': {}
};

translation['en'] = {
    "calculating": "Calculating",
    "chart": "Chart",
    "concentration_unit": "Concentration unit",
    "data_input": "Data input",
    "defaultError": "There was an error. Try Again!",
    "en": "English",
    "instant_concentration": "Instant concentration",
    "next": "Next",
    "parameters": "Parameters",
    "pt-br": "Portuguese",
    "root_tissue_measure": "Roots/tissue measure",
    "root_tissue_measure_unit": "Root/tissue measure unit",
    "sampled_volume": "Sampled volume",
    "samples": "Samples",
    "sampling_time": "Sampling time",
    "start": "Start",
    "system_final_volume": "Final volume",
    "system_initial_volume": "Initial volume",
    "time_unit": "Time unit",
    "welcome_text": '<p class="text-center">'  +
        '</p>' +
        '<p class="text-justify">' +
        '    Web-based application for determining ion uptake kinect parameter values in plants' +
        '</p>',
    "µmol/L": "&#xB5;mol&#x22C5;L&#x207B;&#xB9;",
    "µmol/mL": "&#xB5;mol&#x22C5;mL&#x207B;&#xB9;",
    "mmol/L": "mmol&#x22C5;L&#x207B;&#xB9;",
    "mmol/mL": "mmol&#x22C5;mL&#x207B;&#xB9;",
    "pmol/L": "pmol&#x22C5;L&#x207B;&#xB9;",
    "pmol/mL": "pmol&#x22C5;mL&#x207B;&#xB9;",
    "µmol/g.h": "&#xB5;mol(g&#x22C5;h)&#x207B;&#xB9;"
};

translation['pt-br'] = {
    "concentration_unit": "Unidade de concentração",
    "en": "Inglês",
    "next": "Próximo",
    "pt-br": "Português",
    "start": "Iniciar",
    "welcome_text": '<p class="text-center">' +
        '    Bem-vindo(a) ao Kinetica.' +
        '</p>' +
        '<p class="text-left">' +
        '    Aplicação baseada na <i>web</i> para determinar os valores de parâmetros de captação de nutrientes nas plantas.' +
        '</p>'
};

function translate() {
    $('[translate]').each(function(i, e) {
        $(e).html(translation[$('#language :selected').val()][$(e).attr('translate')] || translation['en'][$(e).attr('translate')]);
    })
}

$(document).ready(translate);
$('#language').on('change', translate);