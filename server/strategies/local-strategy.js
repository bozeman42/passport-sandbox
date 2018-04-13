const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryption = require('../modules/encryption');

let counter = 0;
const users = [];

passport.serializeUser((user,done) => {
  console.log('serialize user',user);
  done(null, user.id);
})

passport.deserializeUser((id,done) => {
  console.log('deserialize', id);
  user = users.filter(user => user.id === id )[0];
  done(null, user);
})

passport.use('local', new LocalStrategy(
  function (username, password, done) {
    console.log('username:',username, 'password',password);
    user = users.filter(user => user.username === username);
    console.log(user, password);
    if (user.length < 1) {
      return done(null, false, {message: 'Incorrect username'});
    } else if (!encryption.comparePassword(password,user[0].password)) {
      return done(null, false, {message: 'Incorrect password'});
    }
    return done(null, user[0]);
  }
));

module.exports = {
  passport,
  addUser: (username, password) => {
    users.push({
      id: counter,
      username: username,
      password: encryption.encryptPassword(password)
    });
    counter++
    console.log(users);
  }
}