$(document).ready(function(){
  'use strict';

  $('.button-collapse').sideNav();

  $('#login').on('click', function(event){
    event.preventDefault();

    let username = $('#loginuser').val().trim();
    let password = $('#userpassword').val();

    // if (!username) {
    //   return Materialize.toast('Please include a username', 3000);
    // }
    //
    // if (!password) {
    //   return Materialize.toast('Please include a password.', 3000);
    // }

    const options = {
      method: 'POST',
      url: '/login/',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ username, password })
    };

    $.ajax(options)
      .done(() => {
        window.location.href = '/map.html';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });
});
//login.html
//add <a href="/user.html">button code</a>
