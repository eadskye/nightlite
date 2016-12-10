 'use strict';

const express = require('express');
const router = express.Router();
const ev = require('express-validation');
const validations = require('../validations/comments');
const knex = require('../knex');
const {decamelizeKeys, camelizeKeys} = require('humps');
const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');
//
// router.get('/comments', (req, res, next) => {
//
// });
//
// router.get('/comments/:id', (req, res, next) => {
//
// });
//
//TODO update observaton_id and user_id location from post request - is it in body or cookie??
router.post('/comments', ev(validations.post), (req, res, next) => {
  console.log(req.body);
    knex('comments')
      .insert({
        user_id: req.body.user_id,
        observation_id: req.body.observation_id,
        comment: req.body.comment,
        stars: req.body.stars
      })
      .then(
        res.send('update comment')
      )
      .catch((err) => {
        next(err);
      });

});
//
// router.patch('/comments', ev(validations.patch), (req, res, next) => {
//
// });
//
// router.delete('/comments', ev(validations.delete), (req, res, next) => {
//
// });
//
module.exports = router;
