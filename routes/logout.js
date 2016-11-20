var express = require('express');
var router  = express.Router();
var passport = require('passport');

//
router.get('/', function (req, res) {
  console.log('inside logout.js');
    // req.session.destroy();
    req.logout();
    res.redirect('/');
    req.session.destroy();

// router.get('/', function(req, res){
//   console.log('inside logout.js');
//   req.logout();
//   res.redirect('/');


// router.get('/logout', function(req, res){
//   console.log('in log out function');
//   req.session.destroy()
//     console.log('session destroyed');
//   req.logout();
//   res.redirect('/');
//
// });



});

module.exports = router;
