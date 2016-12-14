 'use strict';

const express = require('express');
const router = express.Router();
const ev = require('express-validation');
const validations = require('../validations/comments');
const knex = require('../knex');
const {decamelizeKeys, camelizeKeys} = require('humps');
const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');

//get comments for a given user
router.get('/comments/users/:userid', (req, res, next) => {
  let userid = req.params.userid;
  console.log(userid);

   knex.from('comments').leftJoin('users', 'comments.id', 'users.id')
   .where({
     'user_id': userid})
  .select(['comments.id', 'comments.user_id', 'comments.comment', 'comments.stars', 'comments.created_at', 'comments.updated_at', 'username', 'admin'])
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next(err);
  });
});

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
//patch comment by commentid
router.patch('/comments/:id', (req, res, next) => {
  console.log(req.body.comment);
  var id = req.params.id;
  knex('comments')
  .where({
    id: id
  })
  .first()
  .then((comment) => {
    if (!comment || !req.body.comment){
      return next();
    } return knex('comments')
    .update({
      comment: req.body.comment
    }, '*')
    .where({'id' : id});
  })
  .then((comments) => {
    res.send(comments);
  })
  .catch ((err) => {
    next(err);
  });
});


//delete comment by id
router.delete('/comments/:id', (req, res, next) => {
  var id = req.params.id;
  let comment;

  knex('comments')
  .where('id', id)
  .first()
  .then ((result) => {
    if (!result) {
      return next();
    }
  comment = result;

  return knex('comments')
    .del()
    .where('id', id);
  })
  .then(() => {
    delete comment.id;
    res.send(comment);
  })
  .catch((err) => {
    next(err);
  });
});


//
module.exports = router;
