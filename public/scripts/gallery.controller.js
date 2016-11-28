angular.module('BrandImageManagerApp')
       .controller('GalleryController', GalleryController);

function GalleryController(AccessService) {
  console.log('GalleryController loaded');
  var ctrl = this;

  ctrl.userDepts = AccessService.userDepts;
  ctrl.notUserDepts = AccessService.notUserDepts;
  
};
