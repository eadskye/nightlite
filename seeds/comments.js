'use strict';
//TODO seed comments
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
<<<<<<< HEAD
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
      })
    ]);
  })
      .then(function(){
 return knex.raw("SELECT setval('comments_id_seq', (SELECT MAX(id) FROM comments))");
    });
=======
  // return knex('table_name').del()
  //   .then(function () {
  //     return Promise.all([
  //       // Inserts seed entries
  //       knex('table_name').insert({id: 1, colName: 'rowValue1'}),
  //       knex('table_name').insert({id: 2, colName: 'rowValue2'}),
  //       knex('table_name').insert({id: 3, colName: 'rowValue3'})
  //     ]);
  //   });
>>>>>>> f5b0f5c0480d4986551b141eecff546a24d9aa48
};
