const router = require('express').Router();
const passport = require('passport');

var express = require('express'),
    app = express();

router.get('/google',
  passport.authenticate('google', { scope:
    ['https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read',
    'https://mail.google.com'],
    }
  ));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/gallery',
    failureRedirect: '/',
  }));

  router.get('/', function (req, res) {
  if (req.isAuthenticated()) {
    res.json({ status: true, name: req.user.google_name });
  } else {
    res.json({ status: false });
  }

});

// router.get('/', function (req, res) {
//   console.log('feels good to log out');
//   // req.session.destroy();
//   req.logout();
//   // res.sendStatus(200); // they made it!
//   res.redirect('/');
// });





module.exports = router;
