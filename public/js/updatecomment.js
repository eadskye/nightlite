'use strict';

//get comments for specific user
//display the comments on the page
  //include edit and delete buttons for each comment
//create patch for on click 'edit'
//create delete route on click 'delete'
//redraw the comments with the updated results

$(document).ready(function(){
  getComments();


function getComments(data){
  $.ajax({
    url:'http://localhost:8000/comments/1',
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
  $('#comments').empty();
  for (i=0 ; i<data.length ; i++){
    results.push(
      '<div class="card-panel white">' +
        '<span class="black-text"> "' + data[i].comment +
        '"</span>' +
        '<div class="black-text"> Posted By: ' + data[i].username + '</div>' +
        '<div class="black-text"> Star Rating: ' + data[i].stars + '</div>' +
        '<div class="black-text"> PostedDate: ' + data[i].created_at + '</div>' +
        '<a id="updatepost' + i + '" class="btn waves-effect waves-light blue lighten-2">Update</a>' +
        '<a id="deletepost" class="btn waves-effect waves-light blue lighten-2">Delete</a>' +
      '</div>');
  }
  $('#comments').append(results.join(''));
}

});
