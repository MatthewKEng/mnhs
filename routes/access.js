const router = require('express').Router();
const path = require('path');
const pg = require('pg');

var pool = new pg.Pool(config);

router.get('/', function(req, res) {
  pool.connect(function(error, client, done) {
    if (error) {
      done();
      next(error);
    }
    client.query('SELECT * from access WHERE user_id=$1',function(error, result) {
      if (error) {
        done();
        next(error);
      }
      res.send(result.rows);
    });
  });
});


module.exports = router;
