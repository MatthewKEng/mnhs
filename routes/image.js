const router = require('express').Router();
const AWS = require('aws-sdk');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var multerS3 = require('multer-s3');
var path = require('path');


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
var uploads3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'BUCKET_NAME',
    // Makes file viewable to public, which makes things easier when retrieving
    // file later on.  This is optional, but helpful.
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },

    key: function (req, file, cb) {
      //creates a name for the file with the file extention
      cb(null, Date.now().toString() + path.extname(file.originalname));
    },
  }),
});


// This will get the first image for a given bucket.  If all images are stored
// in the same bucket, this will not be useful to get a specific image.
router.get('/home', function(req, res) {
  var params = {Bucket: 'BUCKET_NAME'};
  var homeUrl = {};

  s3.listObjects(params, function(err, data) {
    if (err) {
      console.log('Error querying S3', err);
      res.sendStatus(500);
    } else {
      var bucketContents = data.Contents;

      //take only the first image from this bucket.
      for (var i = 0; i < 1; i++) {
        var urlParams = {Bucket: 'BUCKET_NAME', Key: bucketContents[i].Key};
        s3.getSignedUrl('getObject', urlParams, function(err, url) {
          homeUrl = {url: url};
        });
      }
    }
    res.send(homeUrl);
  });
});


// Given a bucket name via a parameter in a GET request, this
// will return all URL's for the given bucket.  May not be needed
// if the URL's are stored in SQL database.
router.get('/:bucket', function(req, res) {
  var s3Bucket = req.params.bucket;

  var params = {Bucket: s3Bucket};
  var images = [];
  s3.listObjects(params, function(err, data) {
    if (err) {
      console.log('Error querying S3', err);
      res.sendStatus(500);
    } else {
      var bucketContents = data.Contents;
      for (var i = 0; i < bucketContents.length; i++) {
        var key = bucketContents[i].Key;
        var urlParams = {Bucket: s3Bucket, Key: key};
        s3.getSignedUrl('getObject', urlParams, function(err, url) {
          images.push({url: url);
        });
      }
      res.send(images);
    }
  });

});

module.exports = router;
