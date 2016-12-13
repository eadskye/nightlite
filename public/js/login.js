'use strict';

$(document).ready(function(){
  // $('.button-collapse').sideNav();

  //create account
  $('#createaccount').on('click', function(event){
    event.preventDefault();

    let username = $('#loginuser').val().trim();
    let password = $('#userpassword').val();

    console.log(username);
    console.log(password);

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

    console.log(login);

    let $xhr = $.ajax({
      method: 'POST',
      url:'http://localhost:8000/login/createaccount',
      dataType: 'json',
      contentType: 'application/json',
      data: login
    });

    $xhr.done(function(req) {
      console.log("Account created, you are logged in");
      console.log(req);
    });
    $xhr.fail(function() {
      console.log('An error occurred, please try again');
    });

  });//end create account


  // login to existing account
  $('#login').on('click', function(event){
    event.preventDefault();

    let username = $('#loginuser').val().trim();
    let password = $('#userpassword').val();

    console.log(username);
    console.log(password);

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
      url:'http://localhost:8000/login/login',
      dataType: 'json',
      contentType: 'application/json',
      data: login
    });

    $xhr.done(function(req) {
      console.log("You are logged in");
      console.log(req);
    });
    $xhr.fail(function() {
      console.log('An error occurred, please try   logging in again');
    });
  }); // login existing

  //logout
  $('#logout').on('click', function(event){
    event.preventDefault();

    let $xhr = $.ajax({
      method: 'POST',
      url:'http://localhost:8000/login/logout',
      dataType: 'json',
    });

    $xhr.done(function() {
      console.log("you are logged in");
    });
    $xhr.fail(function(err) {
      console.log('please try logging in again');
    });
    window.location = '/';
  });//end logout

}); //end of doc
//login.html
//add <a href="/user.html">button code</a>
