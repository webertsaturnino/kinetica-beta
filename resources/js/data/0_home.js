$('.login-button').on('click', function() {

    var name = $("#name").val();
    var email = $("#email").val();
    var organization = $("#organization").val();
    

    if(name == "" || name == null || name.length < 4 || name.split(" ").length < 2) {
        alert("Por favor, indique um Nome válido.");
        $("#name").focus();
        return false;
   
    }
    if(email.indexOf("@") == -1 ||
        email.indexOf(".") == -1 ||
        email == "" ||
        email == null) {
          alert("Por favor, indique um e-mail válido.");
          $("#email").focus();
          return false;
      }

   if(grecaptcha.getResponse().length > 1){
        // References:
        var $form = $('#loginForm');
        var $subm = $('#mySubmit');
        var $impt = $form.find(':input').not(':button, :submit, :reset, :hidden');

        // Submit function:
        $form.submit(function(){
            $.post($(this).attr('action'), $(this).serialize(), function(response){
                // On success, clear all inputs;
                $impt.val('').attr('value','').removeAttr('checked').removeAttr('selected');
                // Write a confirmation message:
                alert("Submitted!");
                // Disable the submit button:
                $subm.prop('disabled', true);
                window.location = "1_data.html";

            },'json');
            return false;
        });
    }   

});


function submitUserForm() {
    var response = grecaptcha.getResponse();
    if(response.length == 0) {
        document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">This field is required.</span>';
        return false;
    }
    return true;
}
 
function verifyCaptcha() {
    document.getElementById('g-recaptcha-error').innerHTML = '';
}