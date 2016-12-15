'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {

    observation_id: Joi.string()
    .label("observation_id")
    .required()
    .trim(),

    comment: Joi.string()
    .label("comment")
    .required()
    .trim(),
  }

};
