'use strict';

const express = require('express');
const router = express.Router();
// const ev = require('express-validation');
// const validations = require('../validations/comments');
const knex = require('../knex');
const {decamelizeKeys, camelizeKeys} = require('humps');
const bcrypt = require('bcrypt');

router.get('/users', (req, res, next) => {
  knex('users')
    .orderBy('username')
    .then((users) => {
      //TODO cookies admin (key and value)
      if(!req.cookies.admin){
        //TODO add toast in css?
        res.status(401).send('Insuffient privileges');
      }else{
      res.send(users).status(200);
      }

    })
    .catch((err) =>{
      next(err);
    });
});

// router.get('/users/:id', (req, res, next) => {
//
// });

//TODO ev(validations.post),

router.post('/users', (req, res, next) => {
  var hashed = bcrypt.hashSync(req.body.password, 8);

  knex('users')
    .insert({
      username: req.body.username,
      hashed_password: hashed
    }, '*')
    .then(
      res.send('it Worked!!')
    )
    .catch((err) =>{
      next(err);
    });
});

// router.delete('/users', ev(validations.delete), (req, res, next) => {
//
// });

module.exports = router;
