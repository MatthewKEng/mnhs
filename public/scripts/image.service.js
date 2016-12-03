angular.module('BrandImageManagerApp')
.service('ImageService', ImageService);

function ImageService () {
         var src = '';
         var brandSrc = '';
         return{image:src, brand:brandSrc, deptId:src, imageId:src};
       }
