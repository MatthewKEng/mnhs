angular.module('BrandImageManagerApp')
       .service('ImageTableService', ImageTableService);

function ImageTableService ($http) {
  var image = this;

  image.getImages = function(deptId) {
    return $http({
      method: 'GET',
      url: '/image/' + deptId,
    }).then(function successCalback(response) {
      return response.data;
    }, function errorCallback(response) {
      console.log('Error in callback', response);
    });
  };
}
