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
});

$('.stored').change(function () {
    localStorage[$(this).attr('name')] = $(this).val();
});
