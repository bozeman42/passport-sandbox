const express = require('express');
const bodyParser = require('body-parser');

const passport = require('./strategies/local-strategy').passport;
const addUser = require('./strategies/local-strategy').addUser;
const sessionConfig = require('./modules/session.config');
const encryption = require('./modules/encryption');

const PORT = 5000;

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public/'));

app.use(sessionConfig);

app.use(passport.initialize());
app.use(passport.session());

app.post('/user',
  passport.authenticate('local',{
    successRedirect: '/wow',
    failureRedirect: '/failsauce'
  })
);

app.post('/newuser',(req,res) => {
  const { username, password } = req.body;
  addUser(username,password);
  res.sendStatus(201);
})

app.get('/wow', (req,res)  => {
  console.log('wow!');
  if (req.isAuthenticated()){
    console.log(`${req.user.username} logged in!`);
    res.send('Well done!');
  } else {
    res.status(500).send('How did you even get here???');
  }
})

app.get('/failsauce',(req,res) => {
  console.log('Failed to log in, friend.');
  res.status(500).send('Failed to log in, friend.');
})

app.get('/authentication-test',(req,res) => {
  if (req.isAuthenticated()) {
    console.log('authenticated');
    res.sendStatus(200);
  } else {
    console.log('not authenticated');
    res.sendStatus(500);
  }
})

app.get('/logout',(req,res) => {
  if (req.isAuthenticated()){
    console.log('logging out ', req.user.username);
    req.logOut();
  } else {
    console.log('already logged out');
  }
  res.sendStatus(200);
});


app.listen(PORT,() => console.log(`Listening on port ${PORT}...`));