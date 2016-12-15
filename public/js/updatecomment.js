'use strict';

//get comments for specific user
//display the comments on the page
//include edit and delete buttons for each comment
//create patch for on click 'edit'
//create delete route on click 'delete'
//redraw the comments with the updated results

$(document).ready(function() {
    getComments();

    function getComments(data) {
        $.ajax({

            // url: 'http://localhost:8000/comments/users',
            url: 'https://mittino-nightlight.herokuapp.com/comments/users',
            jsonp: "callback",
            data: data,
            type: 'get',
            success: function(data) {
                console.log('success');
                console.log(data);
                drawComments(data);
            },
            error: function() {
                Materialize.toast('Please login to gain access', 3000);
                console.log('error line 26');
            }
        });
    }

    function drawComments(data) {
      var i;
      var results = [];
      $('#newcomments').empty();
      for (i = 0; i < data.length; i++) {
        results.push(
          '<div class="row">' +
            '<div class="col s2"></div>' +
            '<div class="col s8">' +
            '<div class="card-panel white">' +
              '<p class="black-text">"' + data[i].comment + '"</p>' +
              '<p class="black-text"> Star Rating: ' + data[i].stars + '</p>' +
              '<p class="black-text"> Added By: ' + data[i].username + '</p>' +
              '<p class="black-text"> Updated At: ' + moment(data[i].updated_at).format('MMM-D-YYYY') + '</p>' +
              '<input id="input' + data[i].id + '" class="materialize-textarea" type="text">' +
              '<button value=' + data[i].id + ' class="update"> Update </button>' +
              '<button value=' + data[i].id + ' class="delete"> Delete </button>' +
              '</div>' +
            '</div>' +
            '<div class="col s2"></div>' +
          '</div>'
          );
      }
        $('#newcomments').append(results.join(''));
        $('.update').click(function() {
          var updatenum = $(this).val();
          var text = $(this).parent().find('input').val();
          updateComment(updatenum, text);
        });

        $('.delete').click(function() {
            var deletenum = $(this).val();
            deleteComment(deletenum);
        });
    }

    function updateComment(id, text) {
        let commentid = id;
        let newcomment = text;
        var data = {
            comment: newcomment
        }
        console.log(data);
        console.log(newcomment, text);

        const options = {
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json',
            type: 'PATCH',
            // url: 'http://localhost:8000/comments/' + commentid
            url: 'https://nightlited.herokuapp.com/comments/' + commentid

        };

        $.ajax(options)
            .done(() => {
                console.log('success');
                getComments(data);
            })
            .fail(($xhr) => {
                console.log('shr response text');
            });


      $.ajax(options)
        .done(() => {
            console.log('success');
            getComments(data);
        })
        .fail(($xhr) => {
            console.log('error');
        });
    }

    function deleteComment(id) {
        const options = {
            contentType: 'application/json',
            type: 'DELETE',
            // url: 'http://localhost:8000/comments/' + id
            url: 'https://nightlited.herokuapp.com/comments/' + id

        };

        $.ajax(options)
            .done(() => {
                console.log('success');
                getComments();
            })
            .fail(($xhr) => {
                console.log('error');
            });
    }
});
