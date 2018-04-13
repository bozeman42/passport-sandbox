const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = [
  {
    id: 1,
    username: 'someUser',
    password: 'somePassword'
  },
  {
    id: 2,
    username: 'otherUser',
    password: 'otherPassword'
  }
];

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
    console.log(user);
    if (user.length !== 1) {
      return done(null, false, {message: 'Incorrect username'});
    } else if (user[0].password !== password) {
      return done(null, false, {message: 'Incorrect password'});
    }
    return done(null, user[0]);
  }
));

module.exports = passport;