angular.module('BrandImageManagerApp')
.service('ImageService', ImageService);

function ImageService () {
         var src = '';
         return{image:src, brand:src, deptId:src, imageId:src, brandColor:src};
       }
