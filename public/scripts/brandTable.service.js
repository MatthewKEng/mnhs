angular.module('BrandImageManagerApp')
.service('BrandTableService', BrandTableService);

function BrandTableService ($http) {
  var brand = this;

  brand.getBrand = function(deptId) {
    return $http({
      method: 'GET',
      url: '/brand/' + deptId,
    }).then(function successCalback(response) {
      return response.data;
    }, function errorCallback(response) {
      console.log('Error in callback', response);
    });
  };
}
