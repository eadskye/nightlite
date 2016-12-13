'use strict';

const express = require('express');
// const app = express();
const router = express.Router();

const knex = require('../knex');

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

// const boom = require('boom');
// router.use(bodyParser.json());

router.use(bodyParser.urlencoded({ extended: false }));

//new acct
// is working and posting to db
router.post('/login/createaccount/', (req,res,next) => {

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

        req.session.id = result[0].id;
        req.session.username = result[0].username;
        req.session.isAdmin = result[0].admin;
        req.session.created = result[0].created_at;

        console.log(req.session);

        res.send(req.session);

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
router.post('/login/login',(req, res, next) =>{

  let userName = req.body.username;
  let hashedPW = bcrypt.hashSync(req.body.password, 8);

  console.log(userName);
  console.log(hashedPW);

  if (!userName || !hashedPW) {
    res.sendStatus(400);
  }

    knex('users')
      .where({username: userName})
      .first()
      .then((result) => {
        console.log(result);
        console.log("im here a");
        console.log(result.hashed_password);
        console.log(hashedPW);
        if (!result) {
          if (!result || !bcrypt.compareSync(hashedPW,result.hashed_password)) {
            console.log("error is here");
          res.sendStatus(401);

        }else{
          console.log("here now");
          req.session.username = result[0].username;
          console.log(req.session.username);
          //logging user's id
          res.redirect('/login.html');
        }
          res.send('im here');
        }
      })
      .catch((err)=>{
        next(err);
      });

});

//logout
router.post('/login/logout', (req, res, next) => {
  req.session = null;
  console.log('log out');
  res.send('logged out');
});


module.exports = router;
