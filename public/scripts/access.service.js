angular.module('BrandImageManagerApp')
.service('AccessService', AccessService);

function AccessService ($http) {
 //do get resquest to querry the access table
 var access = this;

 // // set Admin access to false initially
 // access.admin = false;

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
  //  console.log(accessObj);
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
   access.user = user;
   access.userDepts = [];
   access.notUserDepts = [];
   for (key in user) {
     if (key == 'admin' && user[key] == true) {
       access.admin = true;
     }
     if (user[key] === true && key != 'admin') {
       access.userDepts.push(key);
     } else if (user[key] === false && key != 'admin') {
       access.notUserDepts.push(key);
     }
   }
  //  console.log(user);
  //  console.log('admin privilege ', user.admin);
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
     access.departmentNames = response.data;
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
