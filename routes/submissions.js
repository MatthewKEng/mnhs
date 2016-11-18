const router = require('express').Router();
const path = require('path');
const pg = require('pg');

var pool = new pg.Pool(config);

//query the submissions table for submissions data
router.get('/', function(req, res) {
  pool.connect(function(error, client, done) {
    if (error) {
      done();
      next(error);
    }
    client.query('SELECT * from submissions',function(error, result) {
      if (error) {
        done();
        next(error);
      }
      res.send(result.rows);
    });
  });
});


module.exports = router;
