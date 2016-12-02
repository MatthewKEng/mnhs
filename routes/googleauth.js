const router = require('express').Router();
const passport = require('passport');

var express = require('express'),
    app = express();

var adminValue;

router.get('/google',
  passport.authenticate('google', { scope:
    ['https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read',
    'https://mail.google.com'],
    }
  ));

router.get('/google/callback',
  passport.authenticate('google',{
    successRedirect: '/gallery',
    failureRedirect: '/',
}));

  router.get('/', function (req, res) {
  if (req.isAuthenticated()) {
    console.log('where is the admin,',req.user.admin);
    adminValue = req.user.admin;
    res.json({ status: true, name: req.user.email, user: req.user });
  } else {
    res.json({ status: false });
  }

});

module.exports = router;
