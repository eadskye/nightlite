'use strict';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          id: 1,
          username: 'annamefford',
          hashed_password:'$2a$08$GRP5vwq.R2ruRY/r8dH7UOT3PFhJ3MRNxw7eyZjmDkFszq3H4xnLq',
          admin: true
        }),
        knex('users').insert({
          id: 2,
          username: 'bradefting',
          hashed_password:'$2a$08$j3fxQH1Rff9z3Wvb03WxJePbzq1jAYsCmBLshboNUFZJJ/C8AO7yG',
          admin: true
        }),
        knex('users').insert({
          id: 3,
          username: 'kylejoyce',
          hashed_password:'$2a$08$R2wmJqZEhB1hMoMQR2y.R.Q1wFGvi2DlxP6hW5c0oSs6O4kXvhh0C',
          admin: true
        }),
        knex('users').insert({
          id: 4,
          username: 'lizdavis',
          hashed_password:'$2a$08$AaTPn15Fm..EXugFOXKMGej4s7o8X2LljEvhxNTg5a6OLwvk1uWcu',
          admin: true
        }),
        knex('users').insert({
          id: 5,
          username: 'mehrirusso',
          hashed_password:'$2a$08$L4.U3DbbMUyYXZK7u77He.MMdt.oTQsNstaMcr1Y2m7cQnxHz2ayS',
          admin: true
        }),
        knex('users').insert({
          id: 6,
          username: 'brendan',
          hashed_password:'$2a$08$WAbTYG2jka5CbtsIjw9mCOw5tRZ0XvXCcHc4UygAL5Mr4LKMUvCZW',
          admin: false
        }),
        knex('users').insert({
          id: 7,
          username: 'kristen',
          hashed_password:'$2a$08$NEYUnSWHpur6KtShIPd66uvp/60ZVmDGChk1rHQsRuptTs7m4se7O',
          admin: false
        })

      ]);
    })
    .then(function(){
  return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
  });

};
