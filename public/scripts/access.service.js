angular.module('BrandImageManagerApp')
.service('AccessService', AccessService);

function AccessService ($http) {
  //do get resquest to querry the access table

  var access = this;
  access.accesses = function () {
    return $http({
      method: 'GET',
      url: '/access'
    }).then(function successCallback(response) {
        // console.log('whats the access data', response);
        return response.data;
      }, function errorCallback(response) {
        console.log('Error in Call back');
      });
  };//end of get

  // do PUT request to SQL DB to update an entry
  access.updateAccess = function (accessObj) {
    return $http({
      method: 'PUT',
      url: '/access',
      data: accessObj
    }).then(function successCallback(response) {
        //console.log('whats the access update data', response);
        return response.data;
      }, function errorCallback(response) {
        console.log('Error in Call back');
      });
  };//end of put

  // do put request to SQL DB to update all users
  access.updateAdminAccess = function (accessObj) {
    return $http({
      method: 'PUT',
      url: '/access',
      data: accessObj
    }).then(function successCallback(response) {
        //console.log('whats the access update data', response);
        return response.data;
      }, function errorCallback(response) {
        console.log('Error in Call back');
      });
  };//end of put

  access.storeUserAccess = function(user) {
    access.getDepartmentIds();
    access.userDepts = [];
    for (key in user) {
      if (user[key] == true && user[key].toString().length > 3) {
        access.userDepts.push(key);
      }
    }
  };

  // A check to see if User Departments runs correctly.
  access.getUserDepts = function() {
    console.log('User Departments:', access.userDepts);
  }

  // This matches department names to department_ids in access.departmentIds object
  access.getDepartmentIds = function() {
    return $http({
      method: 'GET',
      url: '/access/departments',
    }).then(function successCallback(response) {
      access.departmentIds = {};
      for (i = 0; i < response.data.length; i++) {
        var dept = response.data[i].department;
        access.departmentIds[dept] = response.data[i].id;
      }
    }, function errorCallback(response) {
      console.log('Error in Call back');
    });
  };
}
