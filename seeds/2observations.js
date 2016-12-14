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
          latitude: 38.8339,
          longitude: -104.8214,
          stars: 4,
          name: 'Garden of the Gods',
          description: 'This spot was awesome, and a lot of fun hiking.'
        }),

        knex('observations').insert({
          id: 2,
          user_id: 2,
          latitude: 40.0150,
          longitude: -105.2705,
          stars: 2,
          name: 'Galvanize Balcony',
          description: 'Ok, Devin kept shining a flashlight at me'
        }),

        knex('observations').insert({
          id: 3,
          user_id: 3,
          latitude: 37.4694,
          longitude: -105.8700,
          stars: 5,
          name: 'UFO Watchtower  Alamosa, CO',
          description: 'I loved it here, such a great view of the skies!'
        }),

        knex('observations').insert({
          id: 4,
          user_id: 3,
          latitude: 36.1128,
          longitude: -113.9961,
          stars: 5,
          name: 'Grand Canyon',
          description: 'Spent a long time hiking to our spot, but the views were so worth it!  Definitely reccommended!'
        }),

        knex('observations').insert({
          id: 5,
          user_id: 3,
          latitude: 53.9808,
          longitude: -9.1132,
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
