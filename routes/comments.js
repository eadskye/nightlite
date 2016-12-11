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


router.get('/comments/:obsid', (req, res, next) => {
  let observationId = parseInt(req.params.obsid);
  console.log(observationId);

  knex.from('comments').innerJoin('observations', 'comments.id', 'observations.id')
  .where({
    observation_id: observationId
  })
  //.orderBy('updated_at', 'desc')
  .then((results) => {
    console.log(results);
    res.send(results);
  })
  .catch((err) => {
    next(err);
  });
});
//
//get comments by user id
router.get('/comments/:userid', (req, res, next) => {
  let userID = parseInt(req.params.userid)
});
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
