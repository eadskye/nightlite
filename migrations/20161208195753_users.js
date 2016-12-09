'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('username').notNullable().unique();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.boolean('admin').defaultTo('false');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
