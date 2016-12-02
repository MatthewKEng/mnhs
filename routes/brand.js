const router = require('express').Router();
const path = require('path');
const pg = require('pg');

var config = {
  database: 'rho'
};

var pool = new pg.Pool(config);

// Get only Brand URL's in SQL DB for specific user department
router.get('/:deptID', function(req, res) {
  var deptID = req.params.deptID;
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
      }
      client.query('SELECT * FROM brands WHERE department_id = $1;', [deptID],function(err, result) {
        if (err) {
          console.log('Error querying DB', err);
          res.sendStatus(500);
        }
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

module.exports = router;
