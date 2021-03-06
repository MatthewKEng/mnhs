angular.module('BrandImageManagerApp')
    .controller('AdminController', AdminController);

function AdminController($http, $location, AccessService, SubmissionsService, Upload, $timeout) {
  var admin = this;
  var reviseClass = true;
  var reviseInput = false;
  var imageData = {};
  //arrays to hold submissions bassed on status
  admin.aprroved = [];
  admin.pending = [];
  admin.revision = [];
  //variables to hold the number of items for each status
  admin.approvedCount = 0;
  admin.pendingCount = 0;
  admin.revisionCount = 0;

  admin.addEmployeeTruthiness

  //ng-show variables onload
  admin.accessControlsDisplay = false;
  admin.pendingGalleryDisplay = true;
  admin.approvedGalleryDisplay = false;
  admin.revisionGalleryDisplay = false;
  admin.brandsConsoleDisplay = false;
  admin.showEmpDepts = false;
  admin.showNotEmpDepts = false;
  admin.userAdded = false;
  admin.invalidHex = false;
  admin.brandSuccess = false;


  //function to display access
  admin.showAccess = function () {
    admin.getUsersAccesses();
    admin.accessControlsDisplay = true;
    admin.brandsConsoleDisplay = false;
    admin.pendingGalleryDisplay = false;
    admin.approvedGalleryDisplay = false;
    admin.revisionGalleryDisplay = false;
    admin.show
  };
  //function to display brands
  admin.showBrands = function () {
    admin.accessControlsDisplay = false;
    admin.brandsConsoleDisplay = true;
    admin.pendingGalleryDisplay = false;
    admin.approvedGalleryDisplay = false;
    admin.revisionGalleryDisplay = false;
  };
  //functions to display gallery
  //display pending gallery
  admin.showPendingGallery = function () {
    admin.accessControlsDisplay = false;
    admin.brandsConsoleDisplay = false;
    admin.pendingGalleryDisplay = true;
    admin.approvedGalleryDisplay = false;
    admin.revisionGalleryDisplay = false;
  };
  //display approved gallery
  admin.showApprovedGallery = function () {
    admin.accessControlsDisplay = false;
    admin.brandsConsoleDisplay = false;
    admin.pendingGalleryDisplay = false;
    admin.approvedGalleryDisplay = true;
    admin.revisionGalleryDisplay = false;
  };
  //display revision gallery
  admin.showRevisionGallery = function () {
    admin.accessControlsDisplay = false;
    admin.brandsConsoleDisplay = false;
    admin.pendingGalleryDisplay = false;
    admin.approvedGalleryDisplay = false;
    admin.revisionGalleryDisplay = true;
  };
  // display the access information for the currently selected user.
  admin.showUser = function (id) {
    // For loop determines which employee is selected
    for (i = 0; i < admin.allUserAccess.length; i++) {
      if (admin.allUserAccess[i].id == id) {
        admin.emp = admin.allUserAccess[i];
      }
    }
    admin.showEmpDepts = false;
    admin.showNotEmpDepts = false;
    admin.empDepts = [];
    admin.notEmpDepts = [];
    admin.admin = false;
    for (key in admin.emp) {
      if (admin.emp.admin == true) {
        admin.admin = true;
        admin.empDepts = ['admin'];
        break;
      }
      if (admin.emp[key] === true && key != 'admin' && key != 'id') {
        admin.empDepts.push(key);
      } else if (admin.emp[key] === false) {
        if (key != 'id' && key != 'first_name' && key != 'last_name' && key != 'email') {
          admin.notEmpDepts.push(key);
        }
      }
    }
  };

  //make the key pretty function
  admin.pretty = function (key) {
    var prettyKey = key //replace(/_/g, " ").toLocaleUpperCase();
    return prettyKey;
  };

  //call to service to get all data from submissions table
  admin.getSubmissions = function () {
    //reset to zero
    //arrays to hold submissions bassed on status
    admin.aprroved = [];
    admin.pending = [];
    admin.revision = [];
    //variables to hold the number of items for each status
    admin.approvedCount = 0;
    admin.pendingCount = 0;
    admin.revisionCount = 0;
    SubmissionsService.getAllSubmissions().then(function(response){
      admin.allUsersSubmissions = response;
      // console.log('whats the submissions response', admin.allUsersSubmissions);
      // for loop to push arrays of objects into specific arrays
      //and to count number of statuses based on the status
      for (var i = 0; i < admin.allUsersSubmissions.length; i++) {
        if (admin.allUsersSubmissions[i].status == 'approved') {
            //count the number under this status
            admin.approvedCount++;
            //console.log('whats the approved count',admin.approvedCount);
            admin.aprroved.push(angular.copy(admin.allUsersSubmissions[i]));
            // console.log('whats the aprroved array', admin.aprroved);
        }else if (admin.allUsersSubmissions[i].status == 'pending') {
          //count the number under this status
          admin.pendingCount++;
          //console.log('whats the pending count',admin.pendingCount);
          admin.pending.push(angular.copy(admin.allUsersSubmissions[i]));
          // console.log('whats the pending array', admin.pending);
        }else if (admin.allUsersSubmissions[i].status == 'revision') {
          //count the number under this status
          admin.revisionCount++;
          //console.log('whats the revision count',admin.revisionCount);
          admin.revision.push(angular.copy(admin.allUsersSubmissions[i]));
          // console.log('whats the revision array', admin.revision);
        }
      }
    });
  };

  admin.submitChanges = function() {
    var addOrDelete;
    // addOrDelete set to true if we are adding access.
    if (admin.showEmpDepts) {
      addOrDelete = false;
    } else if (admin.showNotEmpDepts) {
      addOrDelete = true;
    } else {
      console.log('No departments selected');
      return;
    }
    // console.log(admin.emp + ' ' + admin.emp.id);
    // console.log(admin.changeDepts);
    var accessObj = {
      id: admin.emp.id,
      departments: admin.changeDepts,
      accessBoolean: addOrDelete,
    };
    AccessService.updateAccess(accessObj).then(function(response){
      if (response == 'OK') {
        // console.log('whats the update access response', response);
        admin.getUsersAccesses();
      }
    });
  };

  //function to get all user data from the user table for access controls
  admin.getUsersAccesses = function () {
    AccessService.accesses().then(function(response){
      admin.allUserAccess = response;
      if (admin.emp != undefined) {
        admin.showUser(admin.emp.id);
        admin.clearDepts();
        admin.showEmpDepts = false;
        admin.showNotEmpDepts = false;
      }
      // console.log('whats the access response', admin.allUserAccess);
    });
  };

  admin.changeDepts = [];
  // Uncheck all update access checkboxes and clear admin.changeDepts array
  admin.clearDepts = function() {
    admin.changeDepts.forEach(function(dept) {
      admin[dept] = false;
    });
    admin.changeDepts = [];
  };

  // Update admin.changeDepts array to show what depts will be changed
  admin.updateUsersAccesses = function (dept) {
    var repeat = false;
    for (var i = 0; i < admin.changeDepts.length; i++) {
      if (dept == admin.changeDepts[i]) {
        repeat = true;
        admin.changeDepts.splice(i, 1)
      }
    }
    if (repeat == false) {
      admin.changeDepts.push(dept);
    }
    // console.log(admin.changeDepts);
  };

  // //submit new user button
  admin.submitButton = function(form) {
    // console.log('newUser ', admin.newUser);
    if (form.$invalid) {
      return;
    }
    $http.post('/access', {
      first_name: admin.firstName,
      last_name: admin.lastName,
      email: admin.newUser
    }).then(function(){
      admin.userAdded = true;
      admin.newUser = "";
      admin.firstName = "";
      admin.lastName = "";
      admin.getUsersAccesses();
      $timeout(function() {
        admin.userAdded = false;
      }, 2500);
    });
  };

  //add a new department
  admin.addDepartment = function() {
    admin.newDepartment;
    // console.log('department', admin.newDepartment);
    admin.newDepartment = admin.newDepartment.replace(/ /g, '_').toLowerCase();
    // console.log('create space');
    $http.post('/access/departments', {
      department: admin.newDepartment
    }).then(function(){
      //for below function
      admin.addColumnUsers();
      admin.siteAddSuccess = true;
      $timeout(function() {
        admin.siteAddSuccess = false;
      },2000);
      admin.newDepartment = "";
    });
  };

  admin.addColumnUsers = function(){
    // console.log('department');
    $http.post('/access/users', {
      department: admin.newDepartment
    }).then(function(){
      admin.newDepartment = "";
      admin.getDeptNames();
      // console.log('end of function');
    });
  };

//approve button for admin
  admin.approveButton = function(pending, adminComment) {
    // console.log('pending ', pending);
    var id = pending.id;
    pending.status = "approved";
    // console.log('status ', pending.status);
    $http.put('/submissions/'+id, {
      id: id,
      status: pending.status,
      admin_comment: adminComment
    }).then(function(){
      //$location.path('/admin'); //on click of button needs to refresh and not on page load
      //reload submissions data
      admin.getSubmissions();
      admin.reviseComment = '';
      modal.style.display = "none";
    });
  };


//delete button for all users (this function works when deleting only from sql but when s3 is included it doesn't work)
  admin.deleteButton = function(pending) {
    console.log('pending ', pending);
    var key = pending.saved_edit.replace('https://s3.amazonaws.com/mnhs/', '');
    $http.delete('/image/submissions/' + key, {
    }).then(function(){
      //$location.path('/admin'); //on click of button needs to refresh and not on page load
      //reload submissions data
      admin.getSubmissions();
      admin.closeModal();
    })
  }

//delete function for departments table
  admin.deleteDepartment = function (){
    if (confirm('Are you sure you want to delete ' + admin.prettyDeptName(admin.remove.department) + '?')) {
      console.log('remove', admin.remove); //admin.html line 176 ng-value, will target id with name.id, will target name with name.name
      $http.delete('/access/' + admin.remove.department+'/' + admin.remove.id, {
      }).then(function(){
        admin.deleteEachDepartment();
      });
    } else {
      return;
    }
  };

//delete function for each department in users table
  admin.deleteEachDepartment = function(){
    var id = admin.remove.id;
    // console.log('id in 2nd delete ', id);
    $http.delete('/access/users/' +id, {
    }).then(function() {
      admin.remove = "";
      admin.getDeptNames();
      admin.getSubmissions();
    })
  };

//revise button under pending, will pop up the modal
  admin.reviseButton = function(image) {
    // console.log('revise working');
    // console.log('image', image);
    imageData = image; //setting image data equal to the current image
    reviseClass = false; //for ng-show/ng-hide to hide delete and approve button on modal
    reviseInput = true; //to show input for comments
    admin.revisionButton(image.department_id);
  };

  //popup modal revise button to submit comment for ADMIN
  admin.subReviseButton = function(imageData) {
    // console.log('image info ', imageData); //using same image data to target image id
    admin.closeModal();
    reviseClass = true; //should revert buttons back for view
    reviseInput = false; //should get rid of input and allow to see comment
    admin.reviseComment;
    // console.log('comment ', admin.reviseComment);
    //updates comments and posts to DB
    $http.put('/submissions/'+imageData.id, {
      status: "revision",
      admin_comment: admin.reviseComment,
      id: imageData.id
    }).then(function(){
      //clears comment input field
    admin.reviseComment = '';
    //resets image data to an empty object
    imageData = {};
    //get submissions again
    admin.getSubmissions();
    });
  };


  //modal controlls
  //start shows as false
  admin.showApproved = false;
  admin.deleteShow = false;
  admin.showUserComment = false;
  admin.rivisionShow = false;
  admin.showInput = false;
  //image src for modal
  admin.modalImage = {};
  //user comment for modal
  admin.modalUserComment = {};
  // Get the modal
  var modal = document.getElementById('adminModal');

  // When the user clicks the button, open the modal
  admin.viewButton = function(department_id) {
    admin.departmentFinder(department_id);//function to find department name
    admin.showInput = true;
    admin.rivisionShow = true;
    admin.deleteShow = false;
    admin.showUserComment = true;
    admin.showApproved = true;
    modal.style.display = "block";
  };

  //when admin clicks the view button in the pending/approved section
  admin.viewButtonApproved = function(department_id) {
    admin.departmentFinder(department_id);//function to find department name
    admin.showInput = false;
    admin.rivisionShow = false;
    admin.showUserComment = true;
    admin.showApproved = false;
    admin.deleteShow = true;
    modal.style.display = "block";
  };

  //function to open model when revision is clicked
  admin.revisionButton = function(department_id) {
    admin.departmentFinder(department_id);//function to find department name
    admin.showInput = true;
    admin.rivisionShow = true;
    admin.deleteShow = false;
    admin.showUserComment = true;
    admin.showApproved = false;
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  admin.closeModal = function() {
    admin.showUserComment = false;
    admin.showApproved = false;
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      admin.showUserComment = false;
      admin.showApproved = false;
      modal.style.display = "none";
    }
  };

  //get list of deparments and thier ids from AccessService
  admin.deptNames = AccessService.departmentNames;

  // function to reload deptNames if it is undefined
  admin.getDeptNames = function() {
    AccessService.getDepartmentIds().then(function() {
      admin.deptNames = AccessService.departmentNames;
    });
  };
  admin.getDeptNames();

  //function to loop through and get department names based on department_id
  admin.departmentFinder = function (department_id) {
    if (admin.deptNames == undefined) {
      AccessService.getDepartmentIds().then(function() {
        for (var i = 0; i < admin.deptNames.length; i++) {
          if (department_id == admin.deptNames[i].id) {
            admin.departmentName = admin.deptNames[i].department;
            console.log('whats the department of selected', admin.departmentName);
          }
        }
      });
    } else {
      for (var i = 0; i < admin.deptNames.length; i++) {
        if (department_id == admin.deptNames[i].id) {
          admin.departmentName = admin.deptNames[i].department;
          console.log('whats the department of selected', admin.departmentName);
        }
      }
    }
  };

  //makes name pretty
  admin.prettyDeptName = function(name) {
    if (name == undefined) {
      return;
    }
    return name.replace(/_/g, ' ').toUpperCase()
  };

  // Uploads brand to S3 if one is selected.  Also sends brand url to SQL db
  // with department_id.
  admin.uploadBrand = function(form) {
    if (form.$invalid || admin.upload.file == undefined && admin.upload.color == undefined) {
      return;
    }
    if (admin.upload.color != undefined && admin.upload.color != '') {
      //check to see if hex code is undefined or needs a # at the beginning
      if (admin.upload.color.startsWith('#')) {
        // do nothing here
      } else {
        admin.upload.color = '#' + admin.upload.color;
      }
      // check if hex code is valid.  Alert if not.
      if (!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(admin.upload.color)) {
        admin.invalidHex = true;
        return;
      } else if (admin.upload.file == undefined) {
        // update only brand color
        return $http.post('/image/brandColor', admin.upload).then(function() {
          console.log('Color updated');
          admin.upload = '';
          admin.invalidHex = false;
          admin.brandSuccess = true;
          $timeout(function() {
            admin.brandSuccess = false;
          },2000);
        });
      } else {
        // update both brand color and logo like current upload.
        admin.upload.deptId = parseInt(admin.upload.deptId);
        console.log('admin.controller', admin.upload);
        Upload.upload({
          url: '/image/brand',
          method: 'POST',
          data: admin.upload,
        }).then(function(){
          admin.upload = '';
          admin.invalidHex = false;
          console.log('color and logo updated');
          admin.brandSuccess = true;
          $timeout(function() {
            admin.brandSuccess = false;
          },2000);
        });
      }
    } else {
      admin.upload.color = undefined;
      admin.invalidHex = false;
      // upload logo only
      admin.upload.deptId = parseInt(admin.upload.deptId);
      console.log('admin.controller', admin.upload);
      Upload.upload({
        url: '/image/brand',
        method: 'POST',
        data: admin.upload,
      }).then(function(){
        admin.upload = '';
        console.log('logo updated');
        admin.brandSuccess = true;
        $timeout(function() {
          admin.brandSuccess = false;
        },2000);
      });
    }
  };

};//end of AdminController function
