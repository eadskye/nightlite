'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({ extended: false }));

//new acct
router.post('/login/createaccount', (req,res,next) => {

  let userName = req.body.username;
  let hashedPW = bcrypt.hashSync(req.body.password, 8);

  knex('users')
  .where({username: userName})
  .then(function (results) {
    if (results.length === 0) {
      knex('users')
      .insert({
        username: userName,
        hashed_password: hashedPW
      }, '*')
      .then(function (result) {

        //result is an array
        req.session.user = result;

        // console.log(req.user);
        // console.log("user before, session after");
        //
        // req.session.id = result[0].id;
        // req.session.username = result[0].username;
        // req.session.isAdmin = result[0].admin;
        // req.session.created = result[0].created_at;

        console.log(req.session.user);

        res.send(req.session.user);
        // console.log("req sent");

      })
      .catch(function (err) {
        next(err);
      });
    }else{
      //need to let them know that name already taken
      res.status(400).send('Username already exists');
    }
  });
});

// existing users
router.post('/login/existinglogin',(req, res, next) =>{

  let userName = req.body.username;
  let password = req.body.password;
  // let hashedPW = bcrypt.hashSync(req.body.password, 8);

  console.log(userName);
  console.log(password);

  if (!userName || !password) {
    res.sendStatus(400);
  }

    knex('users')
      .where({username: userName})
      .first()
      .then((result) => {
        // console.log(result);
        // console.log(result.hashed_password);
        // console.log(result.username);
        // console.log(password);

          if(!result || !bcrypt.compareSync(password,result.hashed_password)) {
            // console.log("error is here");
            res.sendStatus(401);
          }else{

            //result is an array
            req.session.user = result;
            // console.log("else");
            // req.session.id = result.id;
            // req.session.username = result.username;
            // req.session.isAdmin = result.admin;
            // req.session.created = result.created_at;
            //
            // console.log(req.session.username);

            console.log(req.session.user);

            res.send(req.session.user);
          }

      })
      .catch((err)=>{
        next(err);
      });

});

//logout
router.post('/login/logout', (req, res, next) => {
  console.log(req.session);
  req.session = null;
  console.log('log out/session cleared');
  console.log(req.session);
  res.send(req.session);
});

module.exports = router;
