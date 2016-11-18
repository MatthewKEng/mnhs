const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const auth = require('./auth/setup');
const passport = require('passport');
const session = require('express-session');
const isLoggedIn = require('./auth/logins');
const googleAuth = require('./routes/googleauth');
const login = require('./routes/login');

const sessionConfig = {
  secret: 'super secret key goes here', // TODO this info gets stored in ENV file
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000,
    secure: false
  }
};

const app = express();
auth.setup();

app.use(session(sessionConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

//
app.use('/auth', googleAuth);
// app.use('/login',isLoggedIn, login);


app.get('/*', function (req, res) {
 // if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
// } else {
//
//     res.redirect('/auth/google');


//
app.get('/login', passport.authenticate('google'));

app.get('/auth/callback/google',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect to your app.
        res.redirect('/');
    }
);

});

app.use('/login',isLoggedIn, login);
var server = app.listen(3000, function() {
  console.log('Listening on port', server.address().port);
});
