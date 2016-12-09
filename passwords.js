'use srict';

const bcrypt = require('bcrypt');

var pass = bcrypt.hashSync('letsgorunning', 8);

console.log(pass);
