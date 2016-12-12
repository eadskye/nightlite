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
          latitude: 41.2664,
          longitude: -105.3591,
          stars: 4,
          name: 'Wyoming Star Spot',
          description: 'This spot was awesome'
        }),

        knex('observations').insert({
          id: 2,
          user_id: 2,
          latitude: 40.0168,
          longitude: -105.2791,
          stars: 2,
          name: 'Galvanize Balcony',
          description: 'Ok, Devin kept shining a flashlight at me'
        }),

        knex('observations').insert({
          id: 3,
          user_id: 3,
          latitude: 39.7483,
          longitude: -105.2403,
          stars: 4,
          name: 'Golden Lookout Mountain',
          description: 'It was awesome. I love stars!'
        }),

        knex('observations').insert({
          id: 4,
          user_id: 3,
          latitude: 48.2831,
          longitude: -92.8856,
          stars: 5,
          name: 'Rural Minnesota',
          description: 'Sure is dark here.'
        }),

        knex('observations').insert({
          id: 5,
          user_id: 3,
          latitude: 53.8719,
          longitude: -9.1222,
          stars: 2,
          name: 'Foxford, Ireland',
          description: 'Too cloudy here for stars!'
        })
      ]);
    })
    .then(function(){
      return knex.raw("SELECT setval('observations_id_seq', (SELECT MAX(id) FROM observations))");
    });

};
