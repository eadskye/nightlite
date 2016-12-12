"use strict";

$(document).ready(function() {
// Code add selected class to star when it is clicked on
  $('.rating input').change(function () {
  var $radio = $(this);
  $('.rating .selected').removeClass('selected');
  $radio.closest('label').addClass('selected');
  });


  $('#obsform').on('submit', function(event){
     event.preventDefault();
     // var target = $(event.target).val();
     // console.log(target + " stars here");

     var newObs = {};

     let name = $('#name').val();
     let latitude = $('#latitude').val();
     let longitude = $('#longitude').val();
     let description = $('#description').val();
     let stars = $(this.stars).val();
     let user_id = $('#user_id').val();

     newObs.name = name;
     newObs.latitude = latitude;
     newObs.longitude = longitude;
     newObs.description = description;
     newObs.stars = stars;
     newObs.user_id = user_id;

     newObs = JSON.stringify(newObs);

     console.log(newObs);

     var $xhr = $.ajax({
     method: 'POST',
     url: '/observations/',
     dataType: 'json',
     contentType: 'application/json',
     data: newObs
    });


 }); // end doc ready



});
  // const submit = $('#submit-button');
  //
  var name = $("#name");
  var latitude = $("#latitude");
  var longitude = $("#longitude");
  var description = $("#description");
  // var star;
  var numberOfStars;


  $("#stars").on('click', function(event) {
                          if ($(event.target) !== $(event.currentTarget)) {
                            numberOfStars = event.target.value;
                          }
                          console.log(numberOfStars, "******");
                          return numberOfStars;

                      });


  // $('#obsform').submit(function(event) {
  // // alert($(this).serialize());
  //     event.preventDefault();
  //     var name = $("#name");
  //     var latitude = $("#latitude");
  //     var longitude = $("#longitude");
  //     var description = $("#description");
  //     var stars = $("#stars");
  //     var userid = $("#user_id");
  //
  //     var formData = {
  //           "user_id": userid.val(),
  //          "latitude": latitude.val(),
  //          "longitude": longitude.val(),
  //          "stars": "3",
  //          "name": name.val(),
  //          "description": description.val()
  //     };


      // console.log(formData);
  //     $.ajax({
  //        type: 'post',
  //        url: 'http://localhost:8000/observations/',
  //        data: formData,
  //        success: function(response) {
  //          console.log(formData);
  //          console.log($('obsform').serialize());
  //           console.log(response);
  //        }
  // });
// });


// submit.on('click', function() {
//
// var formData =      {
//       "user_id": "2",
//      "latitude": latitude.val(),
//      "longitude": longitude.val(),
//      "stars": numberOfStars,
//      "name": name.val(),
//      "description": description.val()
// };
//
// console.log(formData);
//
//
// $.ajax({
//    type: 'post',
//    url: 'http://localhost:8000/observations/',
//    data: formData,
//    success: function(response) {
//      console.log(formData);
//      console.log($('obsform').serialize());
//       console.log(response);
//    }
// });
// });

// });
//
// });
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
//  });
