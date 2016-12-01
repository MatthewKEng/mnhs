angular.module('BrandImageManagerApp')
  .controller('GalleryController', GalleryController);

function GalleryController(AuthFactory, SubmissionsService, AccessService, ImageService, BrandTableService, ImageTableService, Upload, $timeout) {

  var authFactory = AuthFactory;

  console.log('GalleryController loaded');
  var ctrl = this;
  ctrl.modalImage = {};
  // get the modal
  var modal = document.getElementById('adminModal');

  // When the user clicks the button, open the modal
  ctrl.viewButton = function() {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  ctrl.closeModal = function() {
    modal.style.display = "none";
  }
  // Store current user's access by department
  ctrl.userDepts = AccessService.userDepts;
  ctrl.notUserDepts = AccessService.notUserDepts;

  authFactory.isLoggedIn()
    .then(function(response) {
      if (response.data.status) {
        ctrl.displayLogout = true;
        authFactory.setLoggedIn(true);
        ctrl.username = response.data.name;
      } else { // is not logged in on server
        ctrl.displayLogout = false;
        authFactory.setLoggedIn(false);
      }
    });

  ctrl.pretty = function (name) {
    var prettyUserDept = name.replace(/_/g, " ").toLocaleUpperCase();
    return prettyUserDept;
  };

  ctrl.showDept = function(name) {
    var dept_id = AccessService.departmentIds[name];
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

  //function to attack image clicked url to the ImageService so the photoedit gets it
  ctrl.sendThisImage = function (image, department_id) {
    //function to get brand based on department_id and assign it to the ImageService.brand
    BrandTableService.getBrand(department_id).then(function(response){
        console.log('whats the brand url response', response[0].url_brand);
        ImageService.brand = response[0].url_brand;
      });
    ImageService.image = image;
    window.image = image;
    console.log('did we get the image clicked', ImageService.image);
  }

  ctrl.success = false;

  // Uploads Image to S3 if one is selected.  Also sends image url to SQL db
  // with department_id.
  ctrl.uploadPicture = function(form) {
    if (form.$invalid) {
      return;
    }
    // This only uploads to the first department the user has access to.  Need
    // to update with the correct Dept ID for the user.
    var deptName = AccessService.userDepts[0];
    var deptId = AccessService.departmentIds[deptName];
    ctrl.upload.department = deptId;
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
}
