'use strict';

const express = require('express');
const router = express.Router();
const ev = require('express-validation');
const validations = require('../validations/comments');
const knex = require('../knex');
const {decamelizeKeys, camelizeKeys} = require('humps');
const bcrypt = require('bcrypt');

router.get('/comments', (req, res, next) => {

});

router.get('/comments/:id', (req, res, next) => {

});

router.post('/comments', ev(validations.post), (req, res, next) => {

});

router.patch('/comments', ev(validations.patch), (req, res, next) => {

});

router.delete('/comments', ev(validations.delete), (req, res, next) => {

});

module.exports = router;
