$(document).ready(function () {
  function init() {
    if (localStorage["name"]) {
      $('#name').val(localStorage["name"]);
    }
    if (localStorage["new_username"]) {
      $('#new_username').val(localStorage["new_username"]);
    }
    if (localStorage["new_email"]) {
      $('#new_email').val(localStorage["new_email"]);
    }
  }
  init();

  $('#login').click(login);
  $('#create_new').click(create_new);

  function login() {
    name = $('#name').val();
    password = $('#password').val();
    $.ajax({
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      url: '/api/new_message',
      success: function(newthread) {
        console.log(newthread);
      }
    });
  }

  function create_new() {
    var userData = {
      username: $('#new_username').val(),
      email: $('#new_email').val(),
      password: $('#new_password').val()
    };
    $.ajax({
      type: 'POST',
      data: JSON.stringify(userData),
      contentType: 'application/json',
      url: '/api/create_new_user',
      success: function(data) {
        var token = data.token;
      }
    });
  }
});

$('.stored').change(function () {
  localStorage[$(this).attr('name')] = $(this).val();
});
