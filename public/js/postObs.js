
$(document).ready(function() {
  const submit = $('#submit-button');
  var form = $('obsform');

  submit.on('click', function() {
    $.ajax({
       type: 'post',
       url: 'http://localhost:8000/observations/',
       data: $('obsform').serialize(),
       success: function(response) {
         console.log($('obsform').serialize());
          console.log(resonse);
       }
    });
  });

  $('.rating input').change(function () {
  var $radio = $(this);
  $('.rating .selected').removeClass('selected');
  $radio.closest('label').addClass('selected');
});
});

$.ajax({
        dataType: 'json',
        url: 'http://localhost:8000/observations',
        method: 'GET',
        cache: false,
    })
    .done(function(data) {
        observations = data;
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("jxXHR : ", jqXHR, " - status : ", textStatus, " - error : ", errorThrown);
    });
