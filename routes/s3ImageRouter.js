const router = require('express').Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const multerS3 = require('multer-s3');
const knox = require('knox');
const path = require('path');
const pg = require('pg');

var config = {
  database: 'mnhs'
};

var pool = new pg.Pool(config);


// Credentials should be stored in a .gitignored file (./config.json here).
// Uncomment following line when running on local server.  Comment out when
// testing on Heroku where creditials can be loaded from ENV variables.
// AWS.config.loadFromPath('./config.json');


// Can also require dotenv and load env variables like:
// var accessKeyId =  process.env.AWS_ACCESS_KEY;
// var secretAccessKey = process.env.AWS_SECRET_KEY;
//
// // accessKeyID and secretAccesKey provided by Amazon S3.
// AWS.config.update({
//     accessKeyId: accessKeyId,
//     secretAccessKey: secretAccessKey,
//     region: 'us-west-2',   // or whatever region our bucket is in.
//   });

var s3 = new AWS.S3();

//sets the destination for multer to upload the file as s3
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'mnhs',
    // Makes file viewable to public, which makes things easier when retrieving
    // file later on.  This is optional, but helpful.
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },

    key: function (req, file, cb) {
      //creates a name for the file with the file extention
      //New name will be stored in req.file.key;
      cb(null, Date.now().toString() + path.extname(file.originalname));
    },
  }),
});


// Post request.  Need to send department_id as part of req.body from client
router.post('/upload', upload.single('file'), function (req, res) {
  console.log(req.file.key);
  // On success, need to send image url to SQL database to be stored there as well.
  // Img URL will be in the following format:
  // http://BUCKET_REGION.amazonaws.com/BUCKET_NAME/IMAGE_NAME.jpg
  var url = 'https://s3.amazonaws.com/mnhs/' + req.file.key;
  pool.connect(function (err, client, done) {
  try {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO images (url_image, department_id) VALUES ($1, $2);',
                [url, req.body.department_id],
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




//deletes entries from S3 database, not SQL
router.delete('/:key', function (req, res) {
  var key = req.params.key;
  var bucket = 'mnhs';
  var params = {
    Bucket: bucket,
    Key: key,
  };
  s3.deleteObject(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      console.log(data);           // successful response
      // On Success, need to delete image url from SQL database as well.
    }
  });
});


module.exports = router;
