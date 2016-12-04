angular.module('BrandImageManagerApp')
  .controller('GalleryController', GalleryController);

function GalleryController($http, $location, TruthinessService, BrandTableService, AuthFactory, SubmissionsService, AccessService, ImageService, ImageTableService, Upload, $timeout) {


  var authFactory = AuthFactory;

  console.log('GalleryController loaded');
  var ctrl = this;
  ctrl.addImage = false;

  ctrl.modalImage = {};
  // get the modal
  var modal = document.getElementById('adminModal');

  // When the user clicks the button, open the modal
  ctrl.viewButton = function() {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  ctrl.closeModal = function() {
    ctrl.showDept(ctrl.currentDeptName);
    ctrl.addImage = false;
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      ctrl.addImage = false;
      modal.style.display = "none";
    }
  }

  // Store current user's access by department
  ctrl.admin = AccessService.admin;
  // If user is an admin, all departments should fall in userDepts
  if (ctrl.admin) {
    ctrl.userDepts = AccessService.userDepts.concat(AccessService.notUserDepts).sort();
    ctrl.notUserDepts = [];
  } else {
    ctrl.userDepts = AccessService.userDepts.sort();
    ctrl.notUserDepts = AccessService.notUserDepts.sort();
  }
  // console.log('what is this userDepts', ctrl.userDepts);
  // console.log('what is this notUserDepts', ctrl.notUserDepts);

  // starts true to runonce then turns false
  var runOnce = true;

  authFactory.isLoggedIn()
    .then(function(response) {
      if (response.data.status) {
        ctrl.displayLogout = true;
        authFactory.setLoggedIn(true);
        ctrl.username = response.data.name;
        console.log('whats the auth data', response.data.user.admin);
        var adminValue = response.data.user.admin;
        onceFunc(adminValue);
      } else { // is not logged in on server
        ctrl.displayLogout = false;
        authFactory.setLoggedIn(false);
      }
    });

  //if statment that redrect to admin if admin true
  function runRedirectOnce(adminValue) {
      if (adminValue == true) {
        $location.path('/admin');
      }
  }
  // function only runs once with closure
  var onceFunc = function func(adminValue){
     if( TruthinessService.once ) return;
     TruthinessService.once = true;
     runRedirectOnce(adminValue);
};

  ctrl.pretty = function (name) {
    if (name == undefined) {
      return '';
    }
    var prettyUserDept = name.replace(/_/g, " ").toLocaleUpperCase();
    return prettyUserDept;
  };

  ctrl.showDept = function(name) {
    var dept_id = AccessService.departmentIds[name];
    ctrl.currentDeptId = dept_id;
    ctrl.currentDeptName = name;
    console.log('dept_id', dept_id);
    ImageTableService.getImages(dept_id).then(function(response) {
      ctrl.deptImages = response;
    });
  };

  ctrl.disabled = function(dept) {
    if(dept == 0) {
      return 'disabled';
    } else {
      return '';
    }
  }

  //empty arrays to hold the data based on the status
  ctrl.revision = [];
  ctrl.approved = [];
  //start the count at zero for status counter
  ctrl.approvedCount = 0;
  ctrl.revisionCount = 0;
  //call to service to get all data from submissions table
  ctrl.getImages = function (name, dept) {
    if (dept == 0) {
      console.log('Not a user Dept');
      ctrl.disableButtons = true;
      ctrl.disabled(false);
    } else {
      console.log('User Dept');
      ctrl.disableButtons = false;
    }
    ctrl.disabled(dept);
    var dept_id = AccessService.departmentIds[name];
    //reset value on click
    ctrl.revision = [];
    ctrl.approved = [];
    ctrl.approvedCount = 0;
    ctrl.revisionCount = 0;
    SubmissionsService.getAllSubmissions().then(function(response){
      ctrl.allUsersSubmissions = response;
      // for loop to push arrays of objects into specific arrays
      //and to count number of statuses based on the status
      for (var i = 0; i < ctrl.allUsersSubmissions.length; i++) {
        if (ctrl.allUsersSubmissions[i].status == 'approved' && ctrl.allUsersSubmissions[i].department_id == dept_id) {
            //count the number under this status
            ctrl.approvedCount++;
            //console.log('whats the approved count',ctrl.approvedCount);
            ctrl.approved.push(angular.copy(ctrl.allUsersSubmissions[i]));
        } else if (ctrl.allUsersSubmissions[i].status == 'revision' && ctrl.allUsersSubmissions[i].department_id == dept_id) {
          //count the number under this status
          ctrl.revisionCount++;
          //console.log('whats the revision count',ctrl.revisionCount);
          ctrl.revision.push(angular.copy(ctrl.allUsersSubmissions[i]));
        }
      }
    });
  }

  // function to attach image clicked url to the ImageService so the photoedit gets it
  ctrl.sendThisImage = function (image) {
    //function to get brand based on department_id and assign it to the ImageService.brand
    BrandTableService.getBrand(image.department_id).then(function(response){
      ImageService.image = image.url_image || image.saved_edit;
      ImageService.deptId = image.department_id;
      if (image.url_image != undefined) {
        ImageService.imageId = image.id;
      } else {
        ImageService.imageId = image.image_id;
      }
      console.log('did we get the image clicked', ImageService.image);
      // console.log('whats the department_id', image.department_id);
        //console.log('whats the brand url response', response[0].url_brand);
        ImageService.brand = response[0].url_brand;
        ImageService.brandColor = response[0].brand_color;
        console.log('whats the brand color', ImageService.brandColor);
        $location.path('/photoedit');
      });
  }



  ctrl.success = false;

  // Uploads Image to S3 if one is selected.  Also sends image url to SQL db
  // with department_id.
  ctrl.uploadPicture = function(form) {
    if (form.$invalid) {
      return;
    }
    ctrl.upload.department = ctrl.currentDeptId;
    console.log('ctrl.controller', ctrl.upload);
    Upload.upload({
      url: '/image',
      method: 'POST',
      data: ctrl.upload,
    }).then(function() {
      console.log('Success!');
      ctrl.upload = undefined;
      ctrl.success = true;
      $timeout(function() {
        ctrl.success = false;
      }, 2500);
    });
  };

  ctrl.deleteThisImage = function (image) {
    console.log('image', image);
    if (image.url_image != undefined) {
      var key = image.url_image.replace('https://s3.amazonaws.com/mnhs/', '');
      console.log('deleting url_image from images');
      $http.delete('/image/images/' + key).then(function(response) {
        if (response.status==204) {
          ctrl.showDept(ctrl.currentDeptName);
          ctrl.success = true;
          $timeout(function() {
            ctrl.success = false;
            ctrl.closeModal();
          }, 2500);
        }
      });
    } else {
      var key = image.saved_edit.replace('https://s3.amazonaws.com/mnhs/', '');
      console.log('deleting saved_edit from submissions');
      $http.delete('/image/submissions/' + key).then(function(response) {
        if (response.status==204) {
          console.log('Success!');
          ctrl.success = true;
          ctrl.getImages(ctrl.currentDeptName, 1);
          $timeout(function() {
            ctrl.success = false;
            ctrl.closeModal();
          }, 2500);
        }
      });
    }
  };
}
