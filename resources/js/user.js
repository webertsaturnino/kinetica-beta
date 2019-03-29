$('body').append(
    '<div class="message"></div>' +
    '<div class="loading"></div>');

$('.hide').hide();
$('.loading').append('<p><i class="fa fa-hourglass fa-spin"></i> ' + translation['en']['calculating'] + '...</p>').hide();

function showMsg(msg, type) {
    $('.message').append(
        '<div class="alert alert-' + (type || 'warning') + ' alert-dismissible fade show" role="alert">' +
        '  <p>' + (msg || translation['en']['defaultError']) + '</p>' +
        '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '    <span aria-hidden="true">&times;</span>' +
        '  </button>' +
        '</div>'
    );
    $(".alert").fadeTo(2000, 500).slideUp(500, function() {
        $(".alert").slideUp(500).remove();
    });
}

function showError(msg) {
    showMsg(msg, 'danger');
}