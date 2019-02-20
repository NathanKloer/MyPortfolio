$('a[href^="#"]').on('click',function (e) {
    // e.preventDefault();

    var target = this.hash,
    $target = $(target);

   $('html, body').stop().animate({
     'scrollTop': $target.offset().top-70
    }, 900, 'swing', function () {
     window.location.hash = target;
    });
});

$("#fileRequest").click(function() {
    // // hope the server sets Content-Disposition: attachment!
    window.location = 'resume.pdf';
});

$(document).ready(function() {
    $("#submit").click(function() {
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();
    var contact = $("#contact").val();
    $("#returnmessage").empty(); // To empty previous error/success message.
    // Checking for blank fields.
    if (name == '' || email == '' || contact == '') {
    alert("Please Fill Required Fields");
    } else {
    // Returns successful data submission message when the entered information is stored in database.
    $.post("contact_form.php", {
    name1: name,
    email1: email,
    message1: message,
    contact1: contact
    }, function(data) {
    $("#returnmessage").append(data); // Append returned message to message paragraph.
    if (data == "Your Query has been received, We will contact you soon.") {
    $("#form")[0].reset(); // To reset form fields on success.
    }
    });
    }
    });
    });

    $(function()
{
    function after_form_submitted(data)
    {
        if(data.result == 'success')
        {
            $('form#reused_form').hide();
            $('#success_message').show();
            $('#error_message').hide();
        }
        else
        {
            $('#error_message').append('<ul></ul>');

            jQuery.each(data.errors,function(key,val)
            {
                $('#error_message ul').append('<li>'+key+':'+val+'</li>');
            });
            $('#success_message').hide();
            $('#error_message').show();

            //reverse the response on the button
            $('button[type="button"]', $form).each(function()
            {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if(label)
                {
                    $btn.prop('type','submit' );
                    $btn.text(label);
                    $btn.prop('orig_label','');
                }
            });

        }//else
    }

	$('#reused_form').submit(function(e)
      {
        e.preventDefault();

        $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function()
        {
            $btn = $(this);
            $btn.prop('type','button' );
            $btn.prop('orig_label',$btn.text());
            $btn.text('Sending ...');
        });


                    $.ajax({
                type: "POST",
                url: 'handler.php',
                data: $form.serialize(),
                success: after_form_submitted,
                dataType: 'json'
            });

      });
});