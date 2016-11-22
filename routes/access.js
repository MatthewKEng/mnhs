const router = require('express').Router();
const path = require('path');
const pg = require('pg');

var config = {
  database: 'rho'
};

var pool = new pg.Pool(config);

//query the users table for access data and users email
router.get('/', function(req, res) {
  pool.connect(function(error, client, done) {
    if (error) {
      done();
      next(error);
    }
    client.query('SELECT id, email, admin, alexander_ramsey_house,'+
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
        next(error);
      }
      console.log('whats the access route rows data',result.rows);
      res.send(result.rows);
    });
  });
});//end of get router

// Edit user access to SQL DB.
router.put('/', function (req, res, next) {
  var email = req.body.email;

  var department = req.body.department;
  var accessBoolean = req.body.accessBoolean.toString().toUpperCase();
  console.log('whats the truth',accessBoolean);
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        res.sendStatus(500);
      }
      client.query('UPDATE users SET '+ department +'=$1 WHERE email=$2;',
                  [accessBoolean, email],
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



module.exports = router;
