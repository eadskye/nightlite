'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection:'postgres://localhost/nightlite_dev'
  },

  test: {
    client: 'pg',
    connection:'postgres://localhost/nightlite_test'
  },

//Hooks up the Heroku database
  production: {
  	  client: 'pg',
  	  connection: process.env.DATABASE_URL
  	}
};
