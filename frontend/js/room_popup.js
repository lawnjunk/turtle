$('.room-list li').click(function() {
    var i = $(this).index();
    $('.items').hide();
    $('#item' + (i+1)).show();
});
