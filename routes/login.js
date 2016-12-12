'use strict';

const express = require('express');
const app = express();
const router = express.Router();
// const ev = require('express-validation');
// const validations = require('../validations/observations');
const knex = require('../knex');

// const {decamelizeKeys, camelizeKeys} = require('humps');
// const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const boom = require('boom');

app.use(bodyParser.json());

router.post('/login', function(req, res, next){
  var hashedPassword = bcrypt.hash(req.body.password, 8);
  var username = req.body.name;

  console.log(hashedPassword);
  res.send(username);

});



module.exports = router;
