var express = require('express');
var router  = express.Router();
var passport = require('passport');


// router.get('/', function (req, res) {
//   res.redirect('/');

router.get('/', function(req, res){
  console.log('inside logout.js');
  req.logout();
  res.redirect('/');
});

module.exports = router;
