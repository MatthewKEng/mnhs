angular.module('BrandImageManagerApp')
       .controller('EditPhotoController', EditPhotoController);

function EditPhotoController(Upload, AccessService) {

  console.log('PhotoController loaded');
  var photo = this;
  var canvas = document.getElementById('canvas');
  photo.canvas = document.getElementById('canvas');

  // Uploads Image to S3 if one is selected.  Also sends image url to SQL db
  // with department_id.
  photo.uploadPicture = function(form) {
    if (form.$invalid) {
      return;
    }
    // This only uploads to the first department the user has access to.  Need
    // to update with the correct Dept ID for the user.
    var deptName = AccessService.userDepts[0];
    var deptId = AccessService.departmentIds[deptName];
    photo.upload.department = deptId;
    Upload.upload({
      url: '/image/submission',
      method: 'POST',
      data: photo.upload,
    });
}
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
