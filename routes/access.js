const router = require('express').Router();
const path = require('path');
const pg = require('pg');

var config = {
  database: 'mnhs'
};

var pool = new pg.Pool(config);

// query departments table to get department and department_id's
router.get('/departments', function(req, res) {
  pool.connect(function(error, client, done) {
    try {
      if (error) {
        console.log('Error connecting to DB', error);
        res.sendStatus(500);
      }
      client.query('SELECT * FROM departments;', [], function(error, result) {
        if (error) {
          console.log('Error querying DB', error);
          res.sendStatus(500);
        }
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

// //query deparments table to get department based on department_id
// router.get('/departments/:id', function(req, res) {
//   var departmentId = req.params.id;
//   pool.connect(function(error, client, done) {
//     try {
//       if (error) {
//         console.log('Error connecting to DB', error);
//         res.sendStatus(500);
//       }
//       client.query('SELECT department FROM departments WHERE id=$1;', [departmentId], function(error, result) {
//         if (error) {
//           console.log('Error querying DB', error);
//           res.sendStatus(500);
//         }
//         res.send(result.rows);
//       });
//     } finally {
//       done();
//     }
//   });
// });




// query departments table to post department and department_id's
router.post('/departments', function(req, res) {
  pool.connect(function(error, client, done) {
    try {
      if (error) {
        console.log('Error connecting to DB', error);
        res.sendStatus(500);
      }
      client.query('INSERT INTO departments (department) VALUES ($1);', [req.body.department], function(error, result) {
        if (error) {
          console.log('Error querying DB', error);
          res.sendStatus(500);
        }
        res.sendStatus(201);
      });
    } finally {
      done();
    }
  });
});






//query the users table for access data and users email
router.get('/', function(req, res) {
  pool.connect(function(error, client, done) {
    if (error) {
      done();
      console.log('Error connecting to DB', error);
      res.sendStatus(500);
    }
    client.query('SELECT id, first_name, last_name, email, admin, alexander_ramsey_house,'+
      'birch_coulee_battlefield, charles_a_lindbergh_historic_site,'+
      'comstock_house, folsom_house, fort_ridgely, harkin_store,'+
      'historic_forestville, historic_fort_snelling, james_j_hill_house,'+
      'jeffers_petroglyphs, lac_qui_parle_mission, lower_sioux_agency,'+
      'marine_mill, mill_city_museum, mille_lacs_indian_museum,'+
      'minnehaha_depot, minnesota_history_center, gale_family_library,'+
      'minnesota_state_capitol, north_west_company_fur_post, oliver_kelley_farm,'+
      'sibley_historic_site, split_rock_lighthouse, traverse_des_sioux,'+
      'w_w_mayo_house from users',function(error, result) {
      if (error) {
        done();
        console.log('Error querying DB', error);
        res.sendStatus(500);
      }
      //console.log('whats the access route rows data',result.rows);
      res.send(result.rows);
    });
  });
});//end of get router

//post users from admin into approved_users table
router.post('/', function(req, res) {
  pool.connect(function(error, client, done) {
    if (error) {
      done();
      console.log('Error connecting to DB', error);
      res.sendStatus(500);
    }
    client.query('INSERT INTO users (first_name, last_name, email) ' + 'VALUES ($1, $2, $3)', [req.body.first_name, req.body.last_name, req.body.email],
    function(error, result) {
      if (error) {
        done();
        console.log('Error querying DB', error);
        res.sendStatus(500);
      }
      //console.log('whats the access route rows data',result.rows);
      res.sendStatus(201);
    });
  });
});//end of post router



//to add a column to users DB of department
router.post('/users', function(req, res) {
  console.log('query ', req.query);
  console.log('body ', req.body);
  pool.connect(function(error, client, done) {
    if (error) {
      done();
      console.log('Error connecting to DB', error);
      res.sendStatus(500);
    }
    client.query ('ALTER TABLE users ADD COLUMN ' + req.body.department + '  BOOLEAN DEFAULT FALSE',
    function(error, result) {
      if (error) {
        done();
        // next(error);
        console.log('Error querying DB', error);
        res.sendStatus(500);
      }
      //console.log('whats the access route rows data',result.rows);
      res.sendStatus(201);
    });
  });
});//end of get router



// Edit user access to SQL DB.
router.put('/', function (req, res, next) {
  var id = req.body.id;
  var departments = req.body.departments;
  var numberOfDepartments = departments.length;
  var accessBoolean = req.body.accessBoolean.toString().toUpperCase();
  //console.log('whats the truth',accessBoolean);
  var statement = 'UPDATE USERS set ';
  for (var i = 0; i < numberOfDepartments; i++) {
    statement = statement + departments[i] + '=' + accessBoolean;
    if (i != numberOfDepartments - 1) {
      statement = statement + ',';
    }
  }
  statement = statement + ' WHERE id=' + id;
  // console.log('STATEMENT: ', statement);

  pool.connect(function (err, client, done) {
    try {
      if (err) {
        res.sendStatus(500);
      }
      if (departments[0] == 'admin') {
        client.query('UPDATE USERS set admin=$1 WHERE id=$2;',
                    [accessBoolean, id],
                    function (err) {
                      if (err) {
                        console.log('Error inserting into db', err);
                        return res.sendStatus(500);
                      }
                      res.sendStatus(200);
                    });//end of querry
      } else {
        client.query(statement,
                    function (err) {
                      if (err) {
                        console.log('Error inserting into db', err);
                        return res.sendStatus(500);
                      }
                      res.sendStatus(200);
                    });//end of querry
      }
    } finally {
      done();
    }
  });
});//end of put

router.delete('/users/:id', function (req, res, next) {
  var id = req.params.id;
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting with DB: ', err);
        res.sendStatus(500);
      }

      client.query('DELETE FROM departments WHERE id=$1;', [id],
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

router.delete('/:department/:id', function (req, res, next) {
  var id = req.params.id;
  var department = req.params.department;
  console.log('req.body', req.body);
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting with DB: ', err);
        res.sendStatus(500);
      }

      client.query('ALTER TABLE users drop COLUMN '+  department,
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




//dete the department column from users table

// router.delete('/department', function (req, res, next) {
//   // var id = req.params.id;
//   console.log('req.body', req.body);
//   pool.connect(function (err, client, done) {
//     try {
//       if (err) {
//         console.log('Error connecting with DB: ', err);
//         res.sendStatus(500);
//       }
//
//       client.query('ALTER TABLE users drop COLUMN  $1',  [req.body.department],
//         function (err, result) {
//           if (err) {
//             console.log('Error querying DB: ', err);
//             return res.sendStatus(500);
//           }
//           res.sendStatus(204);
//           });
//     } finally {
//       done();
//     }
//   });
// });


module.exports = router;
