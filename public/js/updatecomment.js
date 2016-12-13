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
  $('#newcomments').empty();
  for (i=0 ; i<data.length ; i++){
    results.push(
          '<div class="col s2"></div>' +
          '<div class="col s8">' +
            '<div class="card-panel white">' +
              '<p class="black-text">' + data[i].comment + '</p>'+
              '<p class="black-text"> Added By:' + data[i].username + '</p>'+
              '<p class="black-text"> Updated At:' + data[i].updated_at + '</p>'+
              '<button value=' + data[i].id + ' id="update'+ data[i].id + '"> Update </button>' +
              '<button value=' + data[i].id + ' id="delete' + data[i].id + '"> Delete </button>' +
            '</div>' +
          '</div>' +
          '<div class="col s2"></div>'
        );
      }
  $('.modal').modal();
  $('#newcomments').append(results.join(''));
  }

});
