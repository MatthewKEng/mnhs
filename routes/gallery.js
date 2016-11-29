var router = require('express').Router();
var path = require('path');
var pg = require('pg');

var config = {
  database: 'rho'
};

var pool = new pg.Pool(config);



router.get('/', function(req, res){
    pool.connect(function(err, client, done){
        if (err){
            console.log('connected to db');
            res.sendStatus(500)
            done();
            return;
        }

        client.query("SELECT saved_edit, admin_comment FROM submissions WHERE status = 'not_approved';",

        function(err,result){
            done();
            if(err){
                console.log('Error querying the DB', err);
                res.sendStatus(500);
                return;
            }
          console.log('result.rows=', result.rows);
          res.send(result.rows);
        });
    });
    });

    module.exports = router;
