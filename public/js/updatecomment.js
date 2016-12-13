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
  $('#comments').empty();
  for (i=0 ; i<data.length ; i++){
    results.push(
      '<div class="card-panel white">' +
        '<span class="black-text"> "' + data[i].comment +
        '"</span>' +
        '<div class="black-text"> Posted By: ' + data[i].username + '</div>' +
        '<div class="black-text"> Star Rating: ' + data[i].stars + '</div>' +
        '<div class="black-text"> PostedDate: ' + data[i].created_at + '</div>' +
        '<div id=commentbutton>' +
        '<a class="modal-trigger wave-effect waves-light btn blue lighten-1" href="#modal' + data[i].id + '"> MODAL </a>' +

        // '<button class="white-text col s6 btn waves-effect waves-light blue lighten-1 comments-modal" type="submit" name="updatecomment"><a id="comments-modal" class="white-text modal-trigger waves-effect waves-light blue lighten-1" href="#modal1">Update</a></button>' +
        // '<button class="white-text col s6 btn waves-effect waves-light blue lighten-1 comments-modal" type="submit" name="deletecomment"><a id="comments-modal" class="white-text modal-trigger waves-effect waves-light blue lighten-1" href="#modal1">Delete</a></button>' +

        '<div id="modal' + data[i].id + '"class="modal modal-fixed-footer">' +
            '<div class="modal-content">' +
                '<h4>Update Comments</h4>' +
                '<p> MODAL TEXT GOES HERE. </p>' +
            '</div>' +
            // '<div class="modal-footer">' +
            //     '<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>' +
            // '</div>' +
          '</div>' +
      '</div>');
  }
  $('.modal').modal();
  $('#comments').append(results.join(''));
}

$('#commentbutton').on('click', function(){
  console.log("I'm clicked");
  event.target.hide();
});


});
