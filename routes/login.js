'use strict';

const express = require('express');
const app = express();
const router = express.Router();
// const ev = require('express-validation');
// const validations = require('../validations/observations');
const knex = require('../knex');

// const {decamelizeKeys, camelizeKeys} = require('humps');
// const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const boom = require('boom');

app.use(bodyParser.json());

//existing users
// router.post('/login',(req, res, next) =>{
//
//   let userName = req.body.loginuser;
//   let password = req.body.userpassword;
//
//   console.log(userName);
//   console.log(password);
//
//   if (!userName || !password) {
//   res.sendStatus(400);
//   }
//
//     knex('users')
//       .where({username: userName})
//       .first()
//       .then((result) => {
//         if (!result) {
//           // if (!result || !bcrypt.compareSync(password,result.password_hash)) {
//           res.sendStatus(401);
//         }else{
//           req.session.userId = result.id;
//           console.log(req.session.userId);
//           //logging user's id
//           // res.redirect('/');
//         }
//       });
//
// });

//new acct
//is working and posting to db
router.post('/login', (req,res,next) => {

  let userName = req.body.loginuser;
  let hashedPW = bcrypt.hashSync(req.body.userpassword, 8);
  console.log(userName);
  console.log(req.body.userpassword);

  knex('users')
  .where({username: userName})
  .then(function (results) {
    if (results.length === 0) {
      knex('users')
      .insert({
        username: userName,
        hashed_password: hashedPW
      })
      .then(function (result) {
        //success/redirect
        console.log('success');
        // res.sendStatus(201);
        /////////need to get id back to set in session
      })
      .catch(function (err) {
        next(err);
      });
    } else {
      res.status(400).send('User Already Exists');
    }
  });
});


module.exports = router;
