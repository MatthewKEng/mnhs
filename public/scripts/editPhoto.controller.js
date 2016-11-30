angular.module('BrandImageManagerApp')
       .controller('EditPhotoController', EditPhotoController);

function EditPhotoController(Upload, AccessService, ImageService, EditorService) {

  console.log('PhotoController loaded');
  var photo = this;


  //sets the image src onload based on the image clicked from the gallery.html
  photo.imageSrc = ImageService.image;
  console.log('did the image arrive from gallery', photo.imageSrc);

  //this function after images arrive to create the canvas
  photo.makeTheCavas = EditorService

  var canvas = document.getElementById('canvas');
  photo.canvas = document.getElementById('canvas');

  // Uploads Image to S3 if one is selected.  Also sends image url to SQL db
  // with department_id.
    photo.downloadCanvas = function(canvas) {
        canvas = document.getElementById('canvas');

        // link.href = document.getElementById(canvasId).toDataURL();
        // link.download = filename;
        photo.submission = {};
        var theCanvas = canvas.toDataURL();
        console.log('so far so good');
        var blob = Upload.dataUrltoBlob(theCanvas, 'pic.png');
        // var blob = upload.dataUrltoBlob(dataurl, name);
        console.log('blob', blob);
        photo.submission.deptId = 1;
        Upload.upload({
            url: '/image/submissions',
            method: 'POST',
            data: {
                originalname : "ryan",
                file: blob
            }
        });
    }
}
