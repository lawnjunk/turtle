$(function() {
  // post on the message
  $.ajax({
    type: 'GET',
    url: '/api/threads',
    success: function(data) {
      console.log(data);
      $.each(data.threads, function(i, thread) {
        $.each(thread.messages,function(i,message){
          thread.roomID;
          message.timeStamp;
          message.username;
          message.message;
          $('#chat-box').append('<p>' + ' '+ thread.roomID +' '+ message.username + ' ' + message.message +'<p>');
        });
      });
    },
    failure: function(err) {
      console.log(err);
    }
  });

  //Post a message to the server
  var message = {
    roomID: '1',
    timeStamp: Date.now(),
    username: 'Andre',
    message: 'I am a message'
  }
  $.ajax({
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    url: '/api/new_message',
    success: function(newthread) {
      console.log(newthread);
    }
  });


$("li").click(function() {
  alert( "Handler for .click() called." );
  // if (this.class == thread.roomID) {
    // $( "div" ).show();
  }
});
