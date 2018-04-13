const session = require('express-session');

module.exports = session({
  secret: process.env.SESSION_SECRET || 'secret',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 60000, secure: false }
});