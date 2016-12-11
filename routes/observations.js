'use strict';

const express = require('express');
const app = express();
const router = express.Router();
// const ev = require('express-validation');
// const validations = require('../validations/comments');
const knex = require('../knex');
const {decamelizeKeys, camelizeKeys} = require('humps');
const bcrypt = require('bcrypt');

// const mapCode = require('../public/js/script');
//
// app.use('mapCode');
var obsGET;

router.get('/observations', (req, res, next) => {
 knex('observations')
   .orderBy('name')
   // .first()
   .then((results)=> {
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

// router.get('/observations/:id', (req, res, next) => {
//
// });

// router.post('/observations', ev(validations.post), (req, res, next) => {
//
// });
//
// router.patch('/observations', ev(validations.patch), (req, res, next) => {
//
// });
//
// router.delete('/observations', ev(validations.delete), (req, res, next) => {
//
// });

module.exports = router;
