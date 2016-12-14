'use strict';
var obsID;

$(document).ready(function() {
    getObservations();

    $(".information").on('click', function(event) {
        // console.log(event.target);

        if ($(event.target).hasClass('comments-button')) {

            obsID = event.target.getAttribute('attr');
            console.log(obsID);
            getComments();
            $('#modal1').modal('open');
        }
        if ($(event.target).hasClass('submit-button')) {
            obsID = event.target.getAttribute('attr');
            console.log(obsID);
            var containerDiv = event.target.closest('div');
            var input = $(containerDiv).find('input');
            var newComment = $(input).val();
            $(input).val('');
            addComment(newComment);
        }
    });
});

var obsData;
var comments;

function getObservations(data) {
    $.ajax({
        // url: 'https://nightlited.herokuapp.com/observations',
        url: 'http://localhost:8000/observations/',
        jsonp: "callback",
        data: data,
        type: 'get',
        success: function(data) {
            obsData = data;
            drawObservations(obsData);
        },
        error: function() {
            console.log("error");
        }
    });
}

function addComment(comment) {
  $.ajax({
      // url: 'https://nightlited.herokuapp.com/observations',
      url: 'http://localhost:8000/comments/',
      method: 'POST', // Default is GET
      data: {
        'observation_id': obsID,
        'comment': comment,
        'user_id': '2', // TODO: Fix this
        'stars': '2' // TODO : Fix this
        },
      // type: 'post', // An alias for method, use type if you're using versions of jQuery prior to 1.9.0.
      success: function(data) {
        Materialize.toast("Comment added!", 3000, 'rounded');
      },
      error: function(jqXHR, textStatus, errorThrown) {
        Materialize.toast("Error!", 3000, 'rounded');
      }
  });
}

function getComments(data) {
    console.log("in HERE");
    $.ajax({
        // url: 'https://nightlited.herokuapp.com/observations' + obsID,
        url: 'http://localhost:8000/observations/comments/' + obsID,
        jsonp: "callback",
        data: data,
        type: 'get',
        success: function(data) {
            console.log(data, "comments by ID");
            comments = data;
            $('#content').empty();

            // displays no comments if there are none to display
            // updated to handle for undefined data
            if (typeof data === typeof undefined || data.length === 0) {
                $('#content').append(
                    '<h5 class="black-text">No comments to display.</h5>'
                );
            }

            // loop through the length of the comments and append them to the modal
            for (var i = 0; i < data.length; i++) {

                var cdate = data[i].updated_at;
                cdate = cdate.substring(0, 10);

                $('#content').append(
                    '<h5 class="black-text">' + data[i].name + '</h5>' +
                    '<div class="black-text">Comment:  ' + data[i].comment + '</div>' +
                    //'<div class="black-text">Rating:  ' + data[i].stars + '</div>' +

                    '<label for="stars">Star Rating</label>' +
                    '<div class="rating" id="stars">' +
                        '<label><input type="radio" name="stars" value="5" title="5 stars"> 5</label>' +
                        '<label><input type="radio" name="stars" value="4" title="4 stars"> 4</label>' +
                        '<label><input type="radio" name="stars" value="3" title="3 stars"> 3</label>' +
                        '<label><input type="radio" name="stars" value="2" title="2 stars"> 2</label>' +
                        '<label><input type="radio" name="stars" value="1" title="1 star"> 1</label>' +
                    '</div>' +

                    '<div class="black-text">Coordinates:  Latitude:  ' + data[i].latitude + ' Longitude:  ' + data[i].longitude + '</div>' +
                    '<div class="black-text">Date:  ' + cdate + '</div>' +
                    '<div class="black-text">Posted by:  ' + data[i].username + '</div>'
                );
            }
        },
        error: function() {
            console.log("error");

        }
    });
}

function drawObservations(data) {
    console.log("DATA: ", data);

    $('.information').empty();
    var template = [];

    for (var i = 0; i < data.length; i++) {
        var date = data[i].updated_at;
        date = date.substring(0, 10);

        template.push(
            '<div class="row">' +
            '<div class="col s12">' +
            '<h5 class="bold black-text">' + data[i].name + '</h5>' +
            '<div class="bold black-text">Location:  ' + data[i].name + '</div>' +
            '<div class="bold black-text">Description:  ' + data[i].description + '</div>' +
            // '<div class="bold black-text">Rating:  ' + data[i].stars + '</div>' +

            '<label for="stars">Star Rating</label>' +
            '<div class="rating" id="stars">' +
                '<label><input type="radio" name="stars" value="5" title="5 stars"> 5</label>' +
                '<label><input type="radio" name="stars" value="4" title="4 stars"> 4</label>' +
                '<label><input type="radio" name="stars" value="3" title="3 stars"> 3</label>' +
                '<label><input type="radio" name="stars" value="2" title="2 stars"> 2</label>' +
                '<label><input type="radio" name="stars" value="1" title="1 star"> 1</label>' +
            '</div>' +

            '<div class="bold black-text">Coordinates:  Latitude:  ' + data[i].latitude + '  Longitude:  ' + data[i].longitude + '</div>' +
            '<div class="bold black-text">Date:  ' + date + '</div>' +
            '<div class="black-text">Posted by:  ' + data[i].username + '</div>' +
            // '<div class="id black-text">ID: ' + data[i].id + '</div>' +

            '<div class="input-field s6 m6 l3">' +
            '<input placeholder="Add a comment" type="text" class="validate comments">' +
            '<label class="active black-text" for="comments">Comments: ' + '</label>' +
            '<button attr=' + data[i].id + ' class="submit-button white-text col s3 btn waves-effect waves-light blue lighten-1" type="button" name="make-comment">Add Comment</button>' +
            '<button attr=' + data[i].id + ' class="comments-button white-text col s3 btn waves-effect waves-light blue lighten-1" type="button" name="view-comment">View Comments</button>' +
            '<div id="commentsDiv' + data[i].id + '">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }
    console.log("template: ", template);
    $('.information').append(template.join(''));
}
