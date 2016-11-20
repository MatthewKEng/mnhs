var express = require('express');
var router  = express.Router();
var passport = require('passport');


router.get('/', function (req, res) {
  res.redirect('/');
});

// router.post('/', passport.authenticate('google'), function(req, res){
//   console.log('authenticating google');
//   res.sendStatus(200);
// });


module.exports = router;
