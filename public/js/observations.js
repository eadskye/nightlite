'use strict';
var obsID;

$(document).ready(function() {
    getObservations();

    $(".information").on('click', function(event) {

    if ($(event.target).hasClass('comments-button')) {

        obsID = event.target.getAttribute('attr');
        console.log(obsID);
        getComments();
        $('#modal1').modal('open');
    }
    if ($(event.target).hasClass('submit-button')) {
        obsID = event.target.getAttribute('attr');
        console.log(obsID);
        var containerDiv = $(event.target).closest('div.commentSection');
        console.log(containerDiv);
        var comment = $(containerDiv).find('textarea');
        var newComment = $(comment).val();
        var stars = $(containerDiv).find('input');
        console.log(stars);
        var starsVal = $(stars).val;
        $(comment).val('');
        $(stars).val('');
        addComment(newComment, starsVal);
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

// TODO: get the user name working here
// this only works for the first post
function addComment(comment, stars) {
  $.ajax({
      // url: 'https://nightlited.herokuapp.com/comments',
      url: 'http://localhost:8000/comments/',
      method: 'POST', // Default is GET
      data: {
        'observation_id': obsID,
        'comment': comment,
        'user_id': '2', // TODO: Fix this
        'stars': stars
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

var clearFix = '<div class="clearfix"></div>';

function getComments(data) {
    console.log("in HERE");
    console.log(obsID);
    $.ajax({
        // url: 'https://nightlited.herokuapp.com/observations/comments' + obsID,
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

                if (cdate !== null && typeof cdate !== typeof undefined && cdate.length > 0) {
                  cdate = cdate.substring(0, 10);
                } else {
                  cdate = '';
                }

                $('#content').append(
                    '<div class="black-text">Comment:  ' + data[i].comment + '</div>' +
                    '<div class="black-text">Stars:  ' + data[i].stars + '</div>' +

                    // '<label for="stars">Star Rating</label>' +
                    // '<div class="rating" id="stars">' +
                    //   getStars(data, i) +
                    // '</div>' +

                    // '<div class="black-text">Coordinates:  Latitude:  ' + data[i].latitude + ' Longitude:  ' + data[i].longitude + '</div>' +
                    '<div class="black-text">Date:  ' + cdate + '</div>' +
                    '<br>' +
                    '<br>'
                    // '<div class="black-text">Posted by:  ' + data[i].username + '</div>'
                );
            }
        },
        error: function() {
            console.log("error");

        }
    });
}

// function getStars(data, dataIndex) {
//
//   var noStars = 5;
//   var stars = '';
//
//   for (var index = 1; index <= noStars; index++) {
//     if (data[dataIndex].stars !== null
//       && typeof data[dataIndex].stars !== typeof undefined
//       && data[dataIndex].stars === index) {
//       stars += '<label class="selected"><input type="radio" name="stars" value="'+index+'" title="'+index+' stars"> '+index+'</label>';
//     } else {
//       stars += '<label><input type="radio" name="stars" value="'+index+'" title="'+index+' stars"> '+index+'</label>';
//     }
//   }
//
//   return stars;
// }

function drawObservations(data) {
    console.log("DATA: ", data);

    $('.information').empty();
    var template = [];
    var labelCss = 'col s3 m3 l3';
    var spanCss = 'class="col s6 m6 l6"';
    var starsCss = 'col s6 m6 l6 left-align'; // This should be the same column definitions as spanCss

    for (var i = 0; i < data.length; i++) {
        var date = data[i].updated_at;
        date = date.substring(0, 10);

        template.push(
            '<div class="row commentSection">' +
              '<h5 class="black-text">' + data[i].name + '</h5>' +
              '<label class="black-text '+ labelCss +'">Location</label><span '+ spanCss +'>' + data[i].name + '</span>' +
              clearFix +
              '<label class="black-text '+ labelCss +'">Description</label><span '+ spanCss +'>' + data[i].description + '</span>' +
              clearFix +
              '<label for="stars" class="'+ labelCss +'">Star Rating</label>' +
              '<div class="rating '+ data[i].stars + '">' +
              '</div>' +
              clearFix +
              '<dl>' +
              '<dt class="bold black-text '+ '' +'">Coordinates</dt>' +
              '<dd>Latitude:  ' + data[i].latitude + '</dd>' +
              '<dd>Longitude:  ' + data[i].longitude + '</dd>' +
              '</dl>' +
              clearFix +
              '<label class="bold black-text '+ labelCss +'">Date</label><span '+ spanCss +'>' + date + '</span>' +
              clearFix +
              '<label class="black-text '+ labelCss +'">Posted by</label><span '+ spanCss +'>' + data[i].username + '</span>' +
              // '<div class="id black-text">ID: ' + data[i].id + '</div>' +
              clearFix +


            '<div class="row">' +
              '<div class="valign-wrapper col s12">' +
                '<div class="valign input-field col s8 m8 10">' +
                  '<textarea type="text" class="cvalidate comments materialize-textarea" />' +
                  '<label for="comments">Comments</label>' +
                '</div>' +
                '<div class="valign input-field col s2">' +
                  '<input name="starRating" type="text" class="center-align starRating validate">' +
                  '<label for="starRating">Star Rating:</label>' +
                '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +

                  clearFix +
                '<div>' +
                  '<button attr=' + data[i].id + ' class="submit-button white-text col s3 offset-s1 btn waves-effect waves-light blue lighten-1" type="button" name="make-comment">Add Comment</button>' +
                  '<button attr=' + data[i].id + ' class="comments-button white-text col s3 offset-s1 btn waves-effect waves-light blue lighten-1" type="button" name="view-comment">View Comments</button>' +
                '</div>' +
                clearFix +
              '</div>'
          );
      }

    $('.information').append(template.join(''));

  }


    // // This has to be called here because the inputs don't exist on the page until this point
    // // Code add selected class to star when it is clicked on
    // $('.rating label input').each(function() {
    //     $(this).change(function() {
    //       var radio = $(this);
    //       $('.rating .selected').removeClass('selected');
    //       $(radio).closest('label').addClass('selected');
    //     });
    // });

    // // Code to get number of stars any time user clicks on them
    // $('[name="commentStars"]').each(function() {
    //     $(this).on('click', function(event) {
    //       // We have to check for the label here because both the div and the input fire events
    //       // The div gives us the event we want so we can ignore the input
    //       if ($(event.target) !== $(event.currentTarget) && event.target.nodeName === 'LABEL') {
    //           numberOfStars = $(event.target).find('input').val();
    //       }
    //       return numberOfStars;
    //       console.log(numberOfStars);
    //   });
    // });
