'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bodyParser = require('body-parser');
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

        req.session.id = result[0].id;
        req.session.username = result[0].username;
        req.session.isAdmin = result[0].admin;
        req.session.created = result[0].created_at;

        res.send(req.session);

      })
      .catch(function (err) {
        next(err);
      });

    }else{
      res.status(400).send('Username already exists');
    }
  });
});

// existing users
router.post('/login/existinglogin',(req, res, next) =>{

  let userName = req.body.username;
  let password = req.body.password;

  if (!userName || !password) {
    res.sendStatus(400);
  }

    knex('users')
      .where({username: userName})
      .first()
      .then((result) => {

          if(!result || !bcrypt.compareSync(password,result.hashed_password)) {

            res.sendStatus(401);

          }else{

            req.session.id = result.id;
            req.session.username = result.username;
            req.session.isAdmin = result.admin;
            req.session.created = result.created_at;

            res.send(req.session);
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
