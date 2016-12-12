'use strict';

$(document).ready(function(){
  $("#submit-button").on('click', function(event){
    //event.preventDefault();
    console.log('submit clicked');
    //getObservations();
  });



function getObservations(data){
$.ajax({
  url:'http://localhost:8000/observations',
  jsonp: "callback",
  data: data,
  type: 'get',
  success: function (data){
    console.log(data);
  },
  error: function(){
    console.log("error");
  }
});
  //gets observation data
  //draws on page
}

});

var data = {
created_at : "2016-12-11T23:41:16.122Z",
description : "Super chill vibe watching the stars",
id : 4,
latitude : "40.0150",
longitude :"105.2705",
name : "Boulder Stars",
stars : 4,
updated_at : "2016-12-11T23:41:16.122Z",
user_id : 3
};

function drawObservations(data){
  console.log(data);
  $('#information').empty();
  var template = [];
  var i;
  for (i = 0; i<data.length; i++){
  template.push(
  '<div class="row">' +
      '<div class="col s12 m6 l6">' +
          '<h5 class="black-text">Information</h5>' +
          '<div id="location" class="black-text">Location: ' + data[i].name +'</div>' +
          '<div id="description" class="black-text">Description: ' + data[i].description + '</div>' +
          '<div id="rating" class="black-text">Rating: ' + data[i].stars + '</div>' +
          '<div id="coordinates" class="black-text">Coordinates: Latitude: ' + data[i].latitude + 'Longitude: ' + data[i].longitude + '</div>' +
          '<div id="date" class="black-text">Date: ' + data[i].updated_at + '</div>' +
          '<div id="posted" class="black-text">Posted by:' + data[i].user_id + '</div>' +
          '<div class="input-field s6 m6 l6">' +
              '<input value="" id="comments" type="text" class="validate">' +
              '<label class="active black-text" for="comments">Comments: ' + '</label>' +
          '</div>' +
      '</div>' +
  '</div>');
  }
  $('#information').append(template.join(''));
}
