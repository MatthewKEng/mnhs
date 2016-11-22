angular.module('BrandImageManagerApp')
.service('AccessService', AccessService);

function AccessService ($http) {
  //do get resquest to querry the access table
  this.accesses = function () {
    return $http({
      method: 'GET',
      url: '/access'
    }).then(function successCallback(response) {
        //console.log('whats the access data', response);
        return response.data;
      }, function errorCallback(response) {
        console.log('Error in Call back');
      });
  };//end of get

  // do PUT request to SQL DB to update an entry
  this.updateAccess = function (accessObj) {
    return $http({
      method: 'PUT',
      url: '/access',
      data: accessObj
    }).then(function successCallback(response) {
        console.log('whats the access update data', response);
        return response.data;
      }, function errorCallback(response) {
        console.log('Error in Call back');
      });//end of get
  };


}
