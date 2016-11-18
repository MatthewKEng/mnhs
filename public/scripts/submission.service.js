angular.module('BrandImageManagerApp')
.service('SubmissionsService', SubmissionsService);

function SubmissionsService ($http) {
  //do get resquest to querry the submissions table
  this.submissions = function () {
    return $http({
      method: 'GET',
      url: '/submissions'
    }).then(function successCallback(response) {
        console.log('whats the submissions data', response);
        return response.data;
      }, function errorCallback(response) {
        console.log('Error in Call back');
      });//end of get
  };



}
