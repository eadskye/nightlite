'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          username: 'annamefford',
          hashed_password:
        }),

      ]);
    });
};
