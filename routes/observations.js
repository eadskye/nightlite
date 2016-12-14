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



//get comments for a given observation id
router.get('/observations/comments/:obsid', (req, res, next) => {
  let observationId = parseInt(req.params.obsid);

  let userId = req.session.id;
  let username = req.session.username;

   knex.from('comments').leftJoin('observations', 'comments.id', 'observations.id')
   .select('comments.comment', 'comments.created_at', 'comments.updated_at')
   .where({
     observation_id: observationId
   })
  //.orderBy('updated_at', 'desc')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next(err);
  });
});

//get observations with username for observation cards on map page
router.get('/observations', (req, res, next) => {
  knex.from('observations').leftJoin('users', 'observations.id', 'users.id')
    .select(['observations.id','observations.user_id','latitude', 'longitude', 'stars', 'name', 'description','observations.created_at', 'observations.updated_at', 'username'])
    .then((result) => {
      console.log(result);
      if (!result) {
        return next();
      }
      //obsGET = JSON.stringify(results);
      res.send(result);

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
//get observations with username for observation cards on map page

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
      // res.redirect('/map.html')
    )
    .catch((err) => {
      next(err);
    });
});

// router.patch('/observations', ev(validations.patch), (req, res, next) => {
//
// });

//
router.delete('/observations/:id', (req, res, next) => {
 let id = Number.parseInt(req.params.id);
 let observation = null;

   if(isNaN(id) || id<0){
     res.sendStatus(404);
   }

   knex('observations')
     .where('id', id)
     .first()
     .then((result) =>{
       if(!result){
         return next();
       }
     observation = result;

       // console.log(observation);
     return knex('observations')
       .del()
       .where('id', id);
     })
     .then(() => {
       delete observation.id;
       res.send(observation);
     })
     .catch((err) => {
       next(err);
     });

});

module.exports = router;
