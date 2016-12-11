 'use strict';

const express = require('express');
const router = express.Router();
const ev = require('express-validation');
const validations = require('../validations/comments');
const knex = require('../knex');
const {decamelizeKeys, camelizeKeys} = require('humps');
const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');

//get comments for the observation id that the user is looking at
  //get all comments
  //get all comments with a specific obs id
  //get the obs id from the DOM


router.get('/comments', (req, res, next) => {
  knex('comments')
  .orderBy('updated_at')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next(err);
  });
});
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
