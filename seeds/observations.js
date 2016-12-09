'use strict';
//TODO seed observations
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('observations').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('observations').insert({
          id: 1,
          user_id: 1,
          latitude: 43.0760,
          longitude: 107.2903,
          stars: 4,
          name: 'Wyoming Star Spot',
          description: 'This spot was awesome'
        }),

        knex('observations').insert({
          id: 2,
          user_id: 2,
          latitude: 40.0150,
          longitude: 105.2705,
          stars: 2,
          name: 'Galvanize Balcony',
          description: 'Ok, Devin kept shining a flashlight at me'
        }),

        knex('observations').insert({
          id: 3,
          user_id: 3,
          latitude: 39.7330,
          longitude: 105.2391,
          stars: 4,
          name: 'Golden Lookout Mountain',
          description: 'It was awesome. I love stars!'
        })
      ]);
    });
    .then(function(){
      return knex.raw("SELECT setval('observations_id_seq', (SELECT MAX(id) FROM observations))");
    });

};
