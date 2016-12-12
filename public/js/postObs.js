"use strict";

$(document).ready(function() {
// Code to make stars work
  $('.rating input').change(function () {
  var $radio = $(this);
  $('.rating .selected').removeClass('selected');
  $radio.closest('label').addClass('selected');

  const submit = $('#submit-button');

  var name = $("#name");
  var latitude = $("#latitude");
  var longitude = $("#longitude");
  var description = $("#description");
  var stars = $("#stars");
  var numberOfStars =


  stars.on('click', function(event) {
                          var target = $(event.target);
                          if (target !== $(event.currentTarget)) {
                            numberOfStars = event.target.value;
                            console.log(numberOfStars);
                            return event.target.value;
                          }
                      });

//   $('#obsform').submit(function() {
//   alert($(this).serialize());
//   return false;
// });

submit.on('click', function() {

var formData =      {
      "user_id": "2",
     "latitude": latitude.val(),
     "longitude": longitude.val(),
     "stars": numberOfStars,
     "name": name.val(),
     "description": description.val()
};

console.log(formData);


  $.ajax({
     type: 'post',
     url: 'http://localhost:8000/observations/',
     data: formData,
     success: function(response) {
       console.log(formData);
       console.log($('obsform').serialize());
        console.log(response);
     }
  });
});

});

});
//
// $.ajax({
//         dataType: 'json',
//         url: 'http://localhost:8000/observations',
//         method: 'GET',
//         cache: false,
//     })
//     .done(function(data) {
//         var observations = data;
//     })
//     .fail(function(jqXHR, textStatus, errorThrown) {
//         console.log("jxXHR : ", jqXHR, " - status : ", textStatus, " - error : ", errorThrown);
//     });
