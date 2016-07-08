// FORM CHECK VALIDATE, PREVENT DEFAULT, SEND MAIL
//global variable setup
var inputs = [$('input[name=firstName]'), $('input[name=lastName]'), $('input[name=email]')];
//check form as typing/onfocus
$('form input').on('focus, keydown', function(){
  //variable setup
   var invalidCount, emptyCount;
   //Character Set Warning Message
   var charWarning = '<p id="charset" class="feedback">Special characters not allowed</p>';

  //text input validation
  var textInputs = [$('input[name=firstName]'), $('input[name=lastName]')];
  for(b = 0; b < textInputs.length; b++){
      var textInput = textInputs[b].val();
      if(/^[a-zA-Z0-9- ]*$/.test(textInput) === false) {
          $(textInputs[b]).addClass('error');
          invalidCount++;
              if(!$('#charset').length ){
                  $('#form-feedback').append(charWarning);
              }//end if present
          }else{ //removes error statements/styling if error-free
              if( invalidCount < 1 ){
                 $('#charset').remove();
              }
          $(textInputs[b]).removeClass('error');
      }
  }//end for

  //e-mail input validation
  var eInput = $('input[name=email]').val();
  if(/^[a-zA-Z0-9-@.]*$/.test(eInput) === false ){
   $('input[name=email]').addClass('error');

      //tests how many are coming up false validity
      invalidCount++;
          //tests if warning is already present
          if(!$('#charset').length ){
              $('#form-feedback').append(charWarning);
          }//end if present
      }else{ //removes error statements/styling if error-free
          if( invalidCount < 1 ){
             $('#charset').remove();
          }
      $('input[name=email]').removeClass('error');
  }

  //number input validation
  var numInput = $('input[name=phone]').val();
  if(/^[0-9-]*$/.test(numInput) === false){
      $('input[name=phone]').addClass('error');
      invalidCount++;
      if(!$('#charset').length ){
          $('#form-feedback').append(charWarning);
      }
  }else{ //removes error statements/styling if error-free
      if( invalidCount < 1 ){
             $('#charset').remove();
          }
      $('input[name=phone]').removeClass('error');
  }
});


//FORM SUBMISSION CHECKING
$('input[type=submit]').click(function(ev){
  //Replace Location Direction
    var redirectLocation = "https://www.google.com/";
    var botField = $('input[name=botField]').val();
    ev.preventDefault();
    //post data sent
    var post_data = {
        firstName : $('input[name=firstName]').val(),
        lastName : $('input[name=lastName]').val(),
        email : $('input[name=email]').val(),
        phone : $('input[name=phone]').val(),
        checkbox : $('input[name=checkbox]').val()
    };//end post_data

    //checkbox input validation
    var checkbox = $('input:checked').length;
    //Checks if checkbox checked
    if(checkbox < 1) {
        $('input[name=termsCheck]').addClass('error');
        //checks if warning already present
        if(!$('#fillCheck').length ){
            $('#form-feedback').append('<p id="fillCheck" class="feedback">Please confirm you have read the terms of agreement.</p>');
        }
        //changes color of border
    } else { //removes error statements/styling if error-free
        if( $('#fillCheck').length ){
            $('#fillCheck').remove();
        }
        $('input[name=termsCheck]').removeClass('error');
    }

//ensure no fields are blank loop
    for(i = 0; i < inputs.length; i++){
        var input = inputs[i].val();
        if(input === ""){
            //checks if the warning is already there
            if(!$('#notFilled').length ){
                $('#form-feedback').append('<p id="notFilled" class="feedback">Please fill out all fields.</p>');
            }
            emptyCount++;
        } else { //removes warning
            if( emptyCount === 0 ){
                $('#notFilled').remove();
            }
        }
    }



    if(invalidCount < 1 && emptyCount < 1 && checkbox < 1){
        $.ajax({
            type: 'POST',
            //change name of processor php file if necessary
            url: 'mailer.php',
            data: post_data,
            success: function(){
                //honeypot method - checks if botField filled out
                if(botField === ''){

                    $('form').fadeOut(500);
                    $('form').after('<h2 id="thanks" style="display:hidden;">Thanks! We\'ll contact you soon.</h2>');
                    $('#thanks').fadeIn(700);
                }else{
                    window.location.replace(redirectLocation);
                }//botField
            }
        });//end ajax
        return false;
    }//end if valid
});//end form submit
