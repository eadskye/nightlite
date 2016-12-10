'use strict';
//TODO create observations table

exports.up = function(knex, Promise) {

  return knex.schema.createTable('observations', function(table){

  table.increments();
  table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE');
  table.decimal('latitude', 7, 4).notNullable();
  table.decimal('longitude', 7, 4).notNullable();
  table.integer('stars').notNullable();
  table.string('name').notNullable().defaultTo('');
  table.text('description').notNullable().defaultTo('');
  table.timestamps(true, true);

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('observations');
};
