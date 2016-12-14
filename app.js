'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

//switches to dev or test environments
switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

app.use(cookieSession({
  name: 'session',
  keys: ['5b9ba0b9ddbd81f7a092c7150d2c5d9fa83ccbcc914fb79d3802baa21286efbb']

  // Cookie Options
  // maxAge: 2 * 60 * 60 * 1000 // 2hrs=(2hrs * 60 mins * 60 secs * milliseconds)
}));

app.use(bodyParser.json());
app.use(cookieParser());

const path = require('path');

app.use(express.static(path.join('public')));

//vital to read users info
app.use(bodyParser.urlencoded({ extended: false }));

// CSRF protection
// app.use((req, res, next) => {
//   if (/json/.test(req.get('Accept'))) {
//     return next();
//   }
//
//   res.sendStatus(406);
// });

const users = require('./routes/users');
const observations = require('./routes/observations');
const comments = require('./routes/comments');
const login = require('./routes/login');


app.use(users);
app.use(observations);
app.use(comments);
app.use(login);

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port);
  }
});

module.exports = app;
