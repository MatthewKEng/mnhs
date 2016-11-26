angular.module('BrandImageManagerApp')
       .controller('PhotoController', PhotoController);

function PhotoController(Upload, AccessService) {

  console.log('PhotoController loaded');
  var photo = this;

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
    console.log('photo.controller', photo.upload);
    Upload.upload({
      url: '/image',
      method: 'POST',
      data: photo.upload,
    });
  };

  // Function to determine all department names that the user has access to.
  // Data is stored in access.service.js file.
  photo.findUser = function() {
    photo.userDepts = AccessService.userDepts;
    console.log('PhotoController', photo.userDepts);
  };

}
