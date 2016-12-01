const router = require('express').Router();
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const pool = require('../db/connection');

// find by username
function findByEmail(googleID, googleEmail, googleName, accessToken, refreshToken) {
  return new Promise(function(resolve, reject){
    pool.connect(function(err, client, done){
      if (err) {
        done();
        return reject(err);
      }

      client.query('SELECT * FROM users WHERE email=$1',
      [googleEmail],
      function(err, result){
        done();
        if (err) {
          reject(err);
        }else{
        resolve(result.rows[0]);
      }
      });
    });
  });
}

function findById(id) {
  return new Promise(function(resolve, reject){
    pool.connect(function(err, client, done){
      if (err) {
        done();
        return reject(err);
      }

      client.query('SELECT * FROM users WHERE id=$1',
      [id],
      function(err, result){
        done();
        if (err) {
          reject(err);
        }else{
        resolve(result.rows[0]);
      }
      });
    });
  });
}





function updateTokens(googleID, googleEmail, googleName, accessToken, refreshToken){
    return new Promise(function(resolve, reject){
    pool.connect(function(err, client, done){
      if (err) {
        done();
        return reject(err);
      }

      client.query('UPDATE users SET accesstoken=$1, refreshtoken=$2, googleid=$3, google_name=$4 WHERE email=$5 RETURNING *',
      [accessToken, refreshToken, googleID, googleName, googleEmail],
      function(err, result){
        done();
        if (err) {
          reject(err);
        }
        resolve(result.rows[0]);
      });
    });
    });
}


// create
function create(googleID, googleEmail, googleName, accessToken, refreshToken) {
    console.log('googleID create in database')
  return new Promise(function(resolve, reject){

      pool.connect(function(err, client, done){
        if (err) {
          done();
          return reject(err);
        }

        client.query('INSERT INTO users (googleid, accesstoken, refreshtoken, email, google_name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                     [googleID, accessToken, refreshToken, googleEmail, googleName],
                     function(err, result){
                       done();
                       if (err) {
                         return reject(err);
                       }
                       resolve(result.rows[0]);
                     });
      });

  });
}

module.exports = {
  findById: findById,
  findByEmail: findByEmail,
  create: create,
  updateTokens:updateTokens
};
