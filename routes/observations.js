'use strict';

const express = require('express');
const router = express.Router();
// const ev = require('express-validation');
// const validations = require('../validations/observations');
const knex = require('../knex');
// const {decamelizeKeys, camelizeKeys} = require('humps');
const bcrypt = require('bcrypt');

router.get('/observations', (req, res, next) => {
 knex('observations')
   .orderBy('name')
   .then((results) => {
     res.send(results);
   })
   .catch((err) => {
     next(err);
   });
});

//TODO will get all of a users observations to update and delete
router.get('/observations/:user_id', (req, res, next) => {
  let userId = parseInt(req.params.user_id);

  knex('observations')
    .where('user_id', userId)
    .first()
    .then((result) => {

      if (!result) {
        return next();
      }
      res.send(result);

    })
    .catch((err) => {
      next(err);
    });

});

//TODO validaton code router.post('/observations', ev(validations.post), (req, res, next) => {
//TODO add error handling of no lat, long, stars, etc

router.post('/observations', (req, res, next) => {

  knex('observations')
    .insert({
      user_id: req.body.user_id,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      stars: req.body.stars,
      name: req.body.name
    })
    .then(
      res.send('observation post created')
    )
    .catch((err) => {
      next(err);
    });
});

// router.patch('/observations', ev(validations.patch), (req, res, next) => {
//
// });
//
// router.delete('/observations', ev(validations.delete), (req, res, next) => {
//
// });

module.exports = router;
