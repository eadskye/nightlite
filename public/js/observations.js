'use strict';

$(document).ready(function(){
  getObservations();
  $("#submit-button").on('click', function(event){
    event.preventDefault();
    console.log('submit clicked');
  });

function getObservations(data){
$.ajax({
  url:'http://localhost:8000/observations',
  jsonp: "callback",
  data: data,
  type: 'get',
  success: function (data){
    console.log(data);
    console.log('success');
    drawObservations(data);
  },
  error: function(){
    console.log("error");
  }
});
}

//draws the observations onto the bottom of the maps page
function drawObservations(data){
  console.log(data);
  $('#information').empty();
  var template = [];
  var i;
  for (i = 0; i<data.length; i++){
  template.push(
  '<div class="row">' +
      '<div class="col s12 m6 l6">' +
          '<h5 class="black-text">' + data[i].name +'</h5>' +
          '<div id="location" class="black-text">Location: ' + data[i].name +'</div>' +
          '<div id="description" class="black-text">Description: ' + data[i].description + '</div>' +
          '<div id="rating" class="black-text">Rating: ' + data[i].stars + '</div>' +
          '<div id="coordinates" class="black-text">Coordinates:  Latitude:  ' + data[i].latitude + ' Longitude:  ' + data[i].longitude + '</div>' +
          '<div id="date" class="black-text">Date: ' + data[i].updated_at + '</div>' +
          '<div id="posted" class="black-text">Posted by:' + data[i].username + '</div>' +
          '<div class="input-field s6 m6 l6">' +
              '<input value="" id="comments" type="text" class="validate">' +
              '<label class="active black-text" for="comments">Comments: ' + '</label>' +
          '</div>' +
      '</div>' +
  '</div>');
  }
  $('#information').append(template.join(''));
}
});
