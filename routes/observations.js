'use strict';

const express = require('express');
const app = express();
const router = express.Router();
// const ev = require('express-validation');
// const validations = require('../validations/comments');
const knex = require('../knex');
const {
    decamelizeKeys,
    camelizeKeys
} = require('humps');
const bcrypt = require('bcrypt');

var obsGET;

router.get('/observations', (req, res, next) => {
    knex('observations')
        .orderBy('name')
        .then((results) => {
            obsGET = JSON.stringify(results);
            console.log(obsGET);
            console.log(typeof obsGET);
            res.send(obsGET);
            res.send(results);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/observations/:id', (req, res, next) => {
    knex('observations')
        .where('user_id', req.params.id)
        .orderBy('name')
        // .first()
        .then((results) => {
            obsGET = JSON.stringify(results);
            console.log(obsGET);
            console.log(typeof obsGET);
            res.send(obsGET);
            res.send(results);
        })
        .catch((err) => {
            next(err);
        });
});

//     created_at:"2016-12-10T22:51:41.010Z",
//     description:"Ok, Devin kept shining a flashlight at me",
//     id:2,
//     latitude:"42.0150",
//     longitude:"-96.2705",
//     name:"Galvanize Balcony",
//     stars:2,
//     updated_at:"2016-12-10T22:51:41.010Z",
//     user_id:2,
//     Image: "<img src='http://davidzentz.com/blog/wp-content/uploads/2014/01/20131223-untitled-_DEZ6857-Edit1.jpg' style='height: 150px;'>"
// }];
// ev(validations.post),
router.post('/observations', (req, res, next) => {
  console.log(req.body, "99999");

  let insertObs = decamelizeKeys({
    user_id: req.body.user_id,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    name: req.body.name,
    stars: req.body.stars,
    description: req.body.description
  });

  knex('observations')
      .insert((insertObs), '*')
      .then((rows) => {
          const newObs = camelizeKeys(rows[0]);
          res.send(newObs);
      })
      .catch((err) => {
          next(err);
      });
});
//
// router.patch('/observations', ev(validations.patch), (req, res, next) => {
//
// });
//
// router.delete('/observations', ev(validations.delete), (req, res, next) => {
//
// });

module.exports = router;
