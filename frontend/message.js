$(function() {
  // post on the message
  $.ajax({
    type: 'GET',
    url: 'https://warm-escarpment-7619.herokuapp.com/api/threads',
    success: function(data) {
      $.each(data.threads, function(i, thread) {
        $.each(thread.messages,function(i,message){
          $('#chat-box').append('<p>' + ' '+ thread.roomID +' '+ message.username + ' ' + message.message +'<p>');
        });
      });
    }
  });

  // get the response from the server
  $.ajax({
    var message = {
      roomID= '1',
      timestamp = $('#message-text').now(),
      username = 'Andre',
      message = $('#message-text').val(),
    }
    type: 'POST',
      url: 'https://warm-escarpment-7619.herokuapp.com/api/threads',
      data: message,
      success: function(newthread) {
        console.log("added data" newthread);
      }
  });

});
