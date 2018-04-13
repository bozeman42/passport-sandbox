const session = require('express-session');

module.exports = session({
  secret: process.env.SESSION_SECRET || 'mySuperSecretSecret',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false }
});