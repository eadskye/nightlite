'use strict';

//get comments for specific user
//display the comments on the page
  //include edit and delete buttons for each comment
//create patch for on click 'edit'
//create delete route on click 'delete'
//redraw the comments with the updated results

$(document).ready(function(){
  getComments();
  console.log('getcomments');


function getComments(data){
  $.ajax({
    url:'http://localhost:8000/comments/users/1',
    jsonp: "callback",
    data: data,
    type: 'get',
    success: function (data){
      console.log(data);
      console.log('success');
      drawComments(data);
    },
    error: function(){
      console.log("error");
    }
  });
}


function drawComments(data){
  var i;
  var results = [];
  console.log(data);
  $('#comments').empty();
  for (i=0 ; i<data.length ; i++){
    results.push(

      '<div class="col s12 m3">'+
        '<div class="card small">'+

          '<div class="card-action center">' +
            '<p class="dogName">' + data[i].username + '</p>' +
          '<a class="waves-effect waves-light btn modal-trigger" href="#modal' + data[i].id + '">' +
            'More Info' +
          '</a>' +
            '<div id="modal' + data[i].id + '" class="modal">' +
              '<div class="modal-content">'+
                '<h4>' + data[i].username + '</h4>' +
                '<p class="modaltext"> Description: ' + data[i].comments + '</p>' +
              '</div>' +
            '</div>' +
          '</div>'+
        '</div>'+
      '</div>');

  }
  $('.modal1').modal();
  $('#comments').append(results.join(''));

  }

});
