const router = require('express').Router();
const path = require('path');
const pg = require('pg');

var pool = new pg.Pool(config);

// Get all URL's in SQL DB for images stored in S3
router.get('/admin', function(req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
      }
      client.query('SELECT * FROM images;', function(err, result) {
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

// Get only URL's in SQL DB for specific user department
router.get('/:deptID', function(req, res) {
  var deptID = req.params.deptID;
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to DB', err);
        res.sendStatus(500);
      }
      client.query('SELECT * FROM images WHERE department_id = $1;', [deptID],function(err, result) {
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

// Post to SQL DB, not to S3
router.post('/', function (req, res, next) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        res.sendStatus(500);
      }
      client.query('INSERT INTO images (img_url, department_id) VALUES ($1, $2])', [req.body.url, req.file.department],
                  function (err) {
        if (err) {
          console.log('Error inserting into db', err);
          return res.sendStatus(500);
        }
        res.sendStatus(200);
      });
    } finally {
      done();
    }
  });
});

//deletes entries from SQL database, not S3
router.delete('/:id', function (req, res, next) {
  var id = req.params.id;
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting with DB: ', err);
        res.sendStatus(500);
      }

      client.query('DELETE FROM submissions WHERE id=$1;', [id],
    function (err, result) {
        if (err) {
          console.log('Error querying DB: ', err);
          return res.sendStatus(500);
        }
        res.sendStatus(204);
      });
    } finally {
      done();
    }
  });
});

module.exports = router;
