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
      // if(!req.cookies.admin){
      //   //TODO add toast in css?
      //   res.status(401).send('insuffient privileges');
      // }else{
      res.send(users).status(200);
      // }

    })
    .catch((err) =>{
      next(err);
    });
});

// router.get('/users/:id', (req, res, next) => {
//
// });

// router.post('/users', ev(validations.post), (req, res, next) => {
//
// });
//
// router.delete('/users', ev(validations.delete), (req, res, next) => {
//
// });

module.exports = router;
