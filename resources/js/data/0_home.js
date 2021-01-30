$('.login-button').on('click', function() {

    var name = $("#name").val();
    var email = $("#email").val();
    var organization = $("#organization").val();
    

    if(name == "" || name == null || name.length < 4 || name.split(" ").length < 2) {
        alert("Please indicate a valid name.");
        $("#name").focus();
        return false;
   
    }
    if(email.indexOf("@") == -1 ||
        email.indexOf(".") == -1 ||
        email == "" ||
        email == null) {
          alert("Please indicate a valid email address.");
          $("#email").focus();
          return false;
      }

   if(grecaptcha.getResponse().length > 1){
        // References:
        var $form = $('#loginForm');
        var $subm = $('#mySubmit');
        var $impt = $form.find(':input').not(':button, :submit, :reset, :hidden');


        $("#loginForm").attr("action","https://script.google.com/macros/s/AKfycbzmKRze1sKeiK33xgb4QyEhldmBkSd3-mZ4_pRcSRN0MCM5bWEqOYlK/exec");

        // Submit function:
        $form.submit(function(){
            $.post($(this).attr('action'), $(this).serialize(), function(response){
                // On success, clear all inputs;
                $impt.val('').attr('value','').removeAttr('checked').removeAttr('selected');
                // Write a confirmation message:
                //alert("Submitted!");
                // Disable the submit button:
                $subm.prop('disabled', true);

                sessionStorage.setItem('k_name', name);
                sessionStorage.setItem('k_email', email);
                sessionStorage.setItem('k_organization', organization);


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

$("#btn_abount").click(function(){
    $("#about").toggle();
});
$(".close").click(function(){
    $("#about").hide();
    $("#htc").hide();
});
$("#btn_htc").click(function(){
    $("#htc").show();
});



/*
$( document ).ready(function() {
   
    });
    */
