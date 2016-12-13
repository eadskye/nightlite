'use strict';

//get comments for specific user
//display the comments on the page
  //include edit and delete buttons for each comment
//create patch for on click 'edit'
//create delete route on click 'delete'
//redraw the comments with the updated results

$(document).ready(function(){
  getComments();
  console.log('we are here');



function getComments(data){
  $.ajax({
    url:'http://localhost:8000/comments/1',
    jsonp: "callback",
    data: data,
    type: 'get',
    success: function (data){
      console.log(data);
      console.log('success');
      //drawObservations(data);
    },
    error: function(){
      console.log("error");
    }
  });
}

});
