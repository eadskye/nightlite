'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const ev = require('express-validation');
const validations = require('../validations/observations');
const knex = require('../knex');

const {decamelizeKeys, camelizeKeys} = require('humps');
const bcrypt = require('bcrypt');
const boom = require('boom');

var obsGET;

router.get('/observations', (req, res, next) => {
  knex('observations')
      .orderBy('name')
      .then((results) => {
          obsGET = JSON.stringify(results);
          // console.log(obsGET);
          // console.log(typeof obsGET);
          res.send(obsGET);
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

router.post('/observations', ev(validations.post), (req, res, next) => {

  const newObservation = {
    user_id: req.body.user_id,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    stars: req.body.stars,
    name: req.body.name,
    description: req.body.description
   };

  if(!newObservation.user_id){
    return next(boom.create(400, 'user_id must not be blank'));
  }
  if (!newObservation.latitude) {
    return next(boom.create(400, 'latitude must not be blank'));
  }

  if (!newObservation.longitude) {
    return next(boom.create(400, 'longitude must not be blank'));
  }

  if (!newObservation.stars) {
    return next(boom.create(400, 'stars must not be blank'));
  }

  if (!newObservation.name) {
    return next(boom.create(400, 'name must not be blank'));
  }

  if (!newObservation.description) {
    return next(boom.create(400, 'description must not be blank'));
  }

  knex('observations')
    .insert(newObservation)
    .then(
      res.send('New observation post created')
    )
    .catch((err) => {
      next(err);
    });
});

// router.patch('/observations', ev(validations.patch), (req, res, next) => {
//
// });

//
// router.delete('/observations', (req, res, next) => {
//   console.log("here");
//     const deleteId = Number.parseInt(req.params.id);
//     // console.log(deleteId);
//     // if(isNaN(deleteId) || deleteId<0){
//     //   res.sendStatus(404);
//     // }
//
//     knex('observations')
//       .where('id', deleteId)
//       .first()
//       .then((deleteObs) =>{
//         if(!deleteObs){
//           return next();
//         }
//         console.log(deleteObs);
//         return knex('observations')
//           .del()
//           .where('id', deleteId);
//       })
//
//       .then(() => {
//         delete deleteObs.id;
//         res.send("its gone");
//       })
//       .catch((err) => {
//         next(err);
//       });
//
// });

module.exports = router;
