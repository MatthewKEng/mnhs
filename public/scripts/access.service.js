angular.module('BrandImageManagerApp')
.service('AccessService', AccessService);

function AccessService ($http) {
  //do get resquest based on user_id of user querrying the access table
  this.accesses = function () {
    return $http({
      method: 'GET',
      url: '/access'
    }).then(function successCallback(response) {
        console.log('whats the access data', response);
        return response.data;
      }, function errorCallback(response) {
        console.log('Error in Call back');
      });//end of get
  };
  //response data needed would be user_id's boolean value for each department


}
