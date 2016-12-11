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

  //get the obs id from the DOM

router.get('/comments/:obsid', (req, res, next) => {
  let observationId = parseInt(req.params.obsid);
  console.log(observationId);

   knex.from('comments').leftJoin('observations', 'comments.id', 'observations.id')
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
router.patch('/comments/:id', (req, res, next) => {
  var id = req.params.id;
  knex('comments')
  .where({
    id: id
  })
  .first()
  .then((comment) => {
    console.log(comment);
    if (!comment || !req.body.comment){
      return next();
    } return knex('comments')
    .update({
      comment: req.body.comment
    }, '*')
    .where({'id' : id});
  })
  .then((comments) => {
    console.log(comments[0]);
    res.send(comments[0]);
  })
  .catch ((err) => {
    next(err);
  });
});


//
// router.delete('/comments/:commentid', (req, res, next) => {
//   let commentId = commentid;
//
//   knex('comments')
//   .where('id', commentId)
//   .first()
//   .then ((result) => {
//     if (!result) {
//       return next();
//     }
//
//   var comment = result;
//
//   return knex('comments')
//     .del()
//     .where('id', commentId);
//   })
//   .then(() => {
//     delete comment.id;
//   })
//   .catch((err) => {
//     next(err);
//   });
// });


//
module.exports = router;
