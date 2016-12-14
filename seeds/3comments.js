'use strict';
//TODO seed comments
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({
          id: 1,
          user_id: 1,
          observation_id:1,
          comment: "Stars were beautiful - great evening",
          stars: 5
        }),
        knex('comments').insert({
          id: 2,
          user_id: 2,
          observation_id:1,
          comment: "Clear skys, great spot",
          stars: 5
        }),
        knex('comments').insert({
          id: 3,
          user_id: 2,
          observation_id:1,
          comment: "Clear skys, great spot",
          stars: 5
        }),
        knex('comments').insert({
          id: 6,
          user_id: 2,
          observation_id:1,
          comment: "Clear skys, great spot",
          stars: 5
        })
      ]);
    })
    .then(function(){
      return knex.raw("SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments))");
  });
};
