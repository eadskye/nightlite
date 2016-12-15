'use strict';

$(document).ready(function(){
  // $('.button-collapse').sideNav();

  //create account
  $('#createaccount').on('click', function(event){
    event.preventDefault();

    let username = $('#loginuser').val().trim();
    let password = $('#userpassword').val();

    // console.log(username);
    // console.log(password);

    if (!username) {
      return Materialize.toast('Please include a username', 3000);
    }
    if (!password) {
      return Materialize.toast('Please include a password.', 3000);
    }

    var login = {};

    login.username = username;
    login.password = password;

    login = JSON.stringify(login);
    // console.log(login);

    let $xhr = $.ajax({
      method: 'POST',
      url:'https://mittino-nightlight.herokuapp.com/login/createaccount',
      dataType: 'json',
      contentType: 'application/json',
      data: login
    });

    $xhr.done(function(req) {
      Materialize.toast('Account created, you are logged in', 3000);
      window.location = '/map.html';
    });
    $xhr.fail(function() {
      Materialize.toast('An error occurred when creating your account. Please try using a different username', 3000);
    });

  });//end create account

  // login to existing account
  $('#login').on('click', function(event){
    event.preventDefault();

    let username = $('#loginuser').val().trim();
    let password = $('#userpassword').val();

    // console.log(username);
    // console.log(password);

    if (!username) {
      return Materialize.toast('Please include a   username', 3000);
    }
    if (!password) {
      return Materialize.toast('Please include a   password.', 3000);
    }

    var login = {};

    login.username = username;
    login.password = password;

    login = JSON.stringify(login);

    console.log(login);

    let $xhr = $.ajax({
      method: 'POST',
      url:'http://localhost:8000/login/existinglogin',
      dataType: 'json',
      contentType: 'application/json',
      data: login
    });

    $xhr.done(function(req) {
      window.location = '/map.html';
      console.log('logged in')
      console.log(req);
    });
    $xhr.fail(function(err) {
      Materialize.toast('Incorrect username or password, please try again', 3000);
      // console.log(err);
    });

  }); // login existing

  //logout
  $('.logout').on('click', function(event){
    event.preventDefault();

    let $xhr = $.ajax({
      method: 'POST',
      url:'http://localhost:8000/login/logout',
      dataType: 'json',
    });

    $xhr.done(function() {
      console.log("you are logged out");
    });
    $xhr.fail(function(err) {
      // console.log(err);
    });
    window.location = '/';
  });//end logout

}); //end of doc
//login.html
