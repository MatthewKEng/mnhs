var express = require('express');
var router  = express.Router();


router.get('/', function (req, res) {
  res.redirect('/');
});

// router.get('/login', passport.authenticate('google'));
//
// router.get('/auth/callback/google',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     function(req, res) {
//         // Successful authentication, redirect to your app.
//         res.redirect('/');
//     }
// );

module.exports = router;
