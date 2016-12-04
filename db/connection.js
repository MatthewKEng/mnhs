const pg = require('pg');

var config = {
  database: 'mnhs'
};

var pool = new pg.Pool(config);

module.exports = pool;
