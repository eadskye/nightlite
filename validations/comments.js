'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    user_id: Joi.string()
    .label('user_id')
    .required()
    .trim(),

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
