angular.module('BrandImageManagerApp', ['ngRoute'])
       .contoroller('PhotoController', PhotoController);

function PhotoController(Upload) {
  var photo = this;

  photo.uploadPicture = function(form) {
    if (form.$invalid) {
      return;
    }

    Upload.upload({
      url: '/image',
      method: 'POST',
      data: admin.upload,
    });
  };

}
