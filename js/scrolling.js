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

var config = {
    apiKey: "AIzaSyDvbnQTRiFLITcQGysvKWmiOTb4s2iSIwo",
    authDomain: "myportfolio-76385.firebaseapp.com",
    databaseURL: "https://myportfolio-76385.firebaseio.com",
    projectId: "myportfolio-76385",
    storageBucket: "myportfolio-76385.appspot.com",
    messagingSenderId: "484788336806"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // Button for adding trains
  $("#add-msg-btn").on("click", function(event) {
    event.preventDefault();
  
    // User input
    var nameInput = $("#name").val().trim();
    var emailInput = $("#email").val().trim();
    var subjectInput = $("#sub").val().trim();
    var messageInput = $("#message").val().trim();
  
    // Creates "temporary" object for train data
    var newMsg = {
      name: nameInput,
      email: emailInput,
      subject: subjectInput,
      message: messageInput
    };
  
    // Uploads train data to the database
    database.ref().push(newMsg);
  
    // Clears userinput text-boxes
    $("#name").val("");
    $("#email").val("");
    $("#sub").val("");
    $("#message").val("");

    $( "#success" ).trigger( "alert" );

  });
  $(document).ready(function(){
    $("#add-msg-btn").click(function(){
        $('.alert').show()
    }) 
});