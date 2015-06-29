$(function() {
  // post on the message
  $.ajax({
    type: 'GET',
    url: '',
    sucess: function(thread) {
      $.each(thread, function(i, threads) {
        $('#message').append('<p>' + thread.message() + '<p>');
      });
    }
  });
  // get the response from the server
  $.ajax({
    var message {
      roomID = $('#roomID').val(),
        mess = $('#message').val(),
    }
    type: 'POST',
      url: '',
      data: message,
      sucess: function(newthread) {
        $('#message').append(newthread.roomID + newthread.mess);
      }
  });
  // going through get the timestamp,username,and message
  var message = function(array) {
    $.each(array, function(i, message) {
      return message.timestamp, message.user, message.mess, ;
    });
  });
});
