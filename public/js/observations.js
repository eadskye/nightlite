'use strict';

$(document).ready(function(){
  getObservations();
  getComments();
  $("#submit-button").on('click', function(event){
    event.preventDefault();
    console.log('submit clicked');
    //getObservations();
  });

function getComments(data){

  var obsID = 2;
  $.ajax({
    // url: 'https://nightlited.herokuapp.com/observations',
    url:'http://localhost:8000/comments/observation/' + obsID,
    jsonp: "callback",
    data: data,
    type: 'get',
    success: function (data){
      console.log(data);
      console.log('success');
      // drawObservations(data);
    },
    error: function(){
      console.log("error");
    }
  });
  //gets observation data
  //draws on page
}

// function getObservations(data){
// $.ajax({
//   // url: 'https://nightlited.herokuapp.com/observations',
//   url:'http://localhost:8000/observations',
//   jsonp: "callback",
//   data: data,
//   type: 'get',
//   success: function (data){
//     console.log(data);
//     console.log('success');
//     drawObservations(data);
//   },
//   error: function(){
//     console.log("error");
//   }
// });
//   //gets observation data
//   //draws on page
// }


function drawObservations(data){
  console.log(data);
  $('#information1').empty();
  var template = [];
  var i;

  for (i = 0; i<data.length; i++){
    var date = data[i].updated_at
    date = date.substring(0, 10);

  template.push(
    // ANNA
  // '<div class="row">' +
      // '<div class="col s12 m6 l6">' +
      //     '<h5 class="black-text">' + data[i].name +'</h5>' +
      //     '<div id="location" class="black-text">Location: ' + data[i].name +'</div>' +
      //     '<div id="description" class="black-text">Description: ' + data[i].description + '</div>' +
      //     '<div id="rating" class="black-text">Rating: ' + data[i].stars + '</div>' +
      //     '<div id="coordinates" class="black-text">Coordinates:  Latitude:  ' + data[i].latitude + ' Longitude:  ' + data[i].longitude + '</div>' +
      //     '<div id="date" class="black-text">Date: ' + data[i].updated_at + '</div>' +
      //     '<div id="posted" class="black-text">Posted by:' + data[i].username + '</div>' +
      //     '<div class="input-field s6 m6 l6">' +
      //         '<input value="" id="comments" type="text" class="validate">' +
      //         '<label class="active black-text" for="comments">Comments: ' + '</label>' +
      //     '</div>' +
      // '</div>' +
  // '</div>'


  '<div class="row">' +
      '<a class="modal-trigger waves-effect waves-light btn" href="#modal' + i + '" >Update</a>' +
                             '<id="modal' + i + '" class="modal modal-fixed-footer">' +
                               '<div class="modal-content">' +
                                 '<h4>Comments</h4>' +
                                 '<p>A bunch of text</p>' +
                               '</div>' +
                              '<div class="modal-footer">' +
                                ' <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Save</a>' +
                              '</div>' +
                             '</div>' +

  '</div>'

  // KYLE LIZ MARY
//   '<div class="row">' +
//   '<div class="col s12 m6 l6">' +
//       '<h5 class="black-text">Information</h5>' +
//       '<div id="location" class="black-text">Location: ' + data[i].name + '</div>' +
//       '<div id="description" class="black-text">Description: ' + data[i].description + '</div>' +
//       '<div id="rating" class="black-text">Rating: ' + data[i].stars + '</div>' +
//       '<div id="lat" class="black-text">Latitude: ' + data[i].latitude + '</div>' +
//       '<div id="long" class="black-text">Longitude: ' + data[i].latitude + '</div>' +
//       '<div id="date" class="black-text">Date: ' + date + '</div>' +
//       '<div id="posted" class="black-text">Posted by: ' + data[i].username + '</div>' +
//       '<div id="hiddenID' + i + '" class="black-text" >ID :' + data[i].id + ' Card #:' + i + '</div>' +
//       '<div class="input-field s6 m6 l6">' +
//           '<input value="" id="comments" type="text" class="validate">' +
//           '<label class="active black-text" for="comments">Comments:</label>' +
//
//
//           '<!--   User enters comment -->' +
//           '<button id="make-comment" class="col s3 btn waves-effect waves-light blue lighten-1" type="submit" name="make-comment">Comment</button>' +
//
//           // '<button id="comments-modal" class="white-text col s6 btn waves-effect waves-light blue lighten-1" type="submit" name="view-comment">' +
//             '<a class="modal-trigger white-text waves-effect waves-light blue lighten-1" href="#modal' + i + '">View Comments</a>' +
//           // '</button>' +
//
//           // '<button data-target="modal' + i + '" class="btn">Modal</button>' +
//
//           '<div id="modal' + i + '" class="modal modal-fixed-footer">' +
//               '<div class="modal-content">' +
//                   '<h4>Comments</h4>'+
//                   '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ligula nunc, suscipit sed tellus eu, imperdiet fringilla dui. Etiam sapien metus, ultricies eu ligula eu, congue sagittis tortor. <br>' +
//                     '<br>Etiam tincidunt arcu ac dapibus bibendum. Nulla mattis a leo vel tincidunt. Duis suscipit nisi justo, vel ultrices lacus efficitur at. Sed a nunc viverra, efficitur nunc ac, semper urna. </p>' +
//               '</div>' +
//               '<div class="modal-footer">' +
//                   '<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>' +
//               '</div>' +
//           '</div>' +
//
//       '</div>' +
//   '</div>' +
// '</div>'
    );
  }
  $('#information1').append(template.join(''));
}
});
