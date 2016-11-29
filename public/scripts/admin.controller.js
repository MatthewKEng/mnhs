angular.module('BrandImageManagerApp')
    .controller('AdminController', AdminController);

function AdminController($http, $location, AccessService, SubmissionsService, Upload) {
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

  //ng-show variables onload
  admin.accessControlsDisplay = false;
  admin.pendingGalleryDisplay = true;
  admin.approvedGalleryDisplay = false;
  admin.revisionGalleryDisplay = false;
  admin.brandsConsoleDisplay = false;

  //function to display access
  admin.showAccess = function () {
    admin.getUsersAccesses();
    admin.accessControlsDisplay = true;
    admin.brandsConsoleDisplay = false;
    admin.pendingGalleryDisplay = false;
    admin.approvedGalleryDisplay = false;
    admin.revisionGalleryDisplay = false;
  }
  //function to display brands
  admin.showBrands = function () {
    admin.accessControlsDisplay = false;
    admin.brandsConsoleDisplay = true;
    admin.pendingGalleryDisplay = false;
    admin.approvedGalleryDisplay = false;
    admin.revisionGalleryDisplay = false;
  }
  //functions to display gallery
  //display pending gallery
  admin.showPendingGallery = function () {
    admin.accessControlsDisplay = false;
    admin.brandsConsoleDisplay = false;
    admin.pendingGalleryDisplay = true;
    admin.approvedGalleryDisplay = false;
    admin.revisionGalleryDisplay = false;
  }
  //display approved gallery
  admin.showApprovedGallery = function () {
    admin.accessControlsDisplay = false;
    admin.brandsConsoleDisplay = false;
    admin.pendingGalleryDisplay = false;
    admin.approvedGalleryDisplay = true;
    admin.revisionGalleryDisplay = false;
  }
  //display revision gallery
  admin.showRevisionGallery = function () {
    admin.accessControlsDisplay = false;
    admin.brandsConsoleDisplay = false;
    admin.pendingGalleryDisplay = false;
    admin.approvedGalleryDisplay = false;
    admin.revisionGalleryDisplay = true;
  }
  //function for truthy value for access accordion
  admin.truthiness = function (index) {
    //for loop that takes current index of button clicked turns proberty of index true and
    //all other properties in the admin.showUserAccess array false
    for (var i = 0; i < admin.allUserAccess.length; i++) {
      if (i == index) {
        admin.showUserAccess[i] = !admin.showUserAccess[i];

        admin.plus[i] = !admin.plus[i];
        admin.minus[i] = !admin.minus[i];
        admin.showAddEmployee = false;
        admin.empPlus = true;
         //console.log('whats the truth ',admin.showUserAccess);
       }
       else{
        admin.showUserAccess[i] = false;
        admin.plus[i] = true;
        admin.minus[i] = false;
        admin.showAddEmployee = false;
        admin.empPlus = true;
         //console.log('whats the truth ',admin.showUserAccess);
      }
    }
  }
  //function to show or hide add employee
  admin.addEmployeeTruthiness = function () {
    //for loop that makes everything false if button is clicked
    for (var i = 0; i < admin.allUserAccess.length; i++) {
      admin.showUserAccess[i] = false;
      admin.plus[i] = true;
      admin.minus[i] = false;
      }
    // if else stament to set the boolean value of admin.showAddEmployee for ngShow
    if (admin.showAddEmployee == false) {
        admin.showAddEmployee = true;
        admin.empPlus = false;
        //console.log('whats the plus truth ',admin.empPlus);
    }else{
        admin.showAddEmployee = false;
        admin.empPlus = true;
        //console.log('whats the minus truth ',admin.empPlus);
    }
  }

  //apply correct checkbox truthiness value for if it shows for ng-show

admin.checkboxesTruthiness = function (index) {
  for (var i = 0; i < admin.allUsersSubmissions.length; i++) {
    if (admin.showCheckboxes[i] == false) {
      admin.showCheckboxes[i] = true;
    }else{
      admin.showCheckboxes[i] = false;

      }
    }
  }

  //make the key pretty function
  admin.pretty = function (key) {
    var prettyKey = key.replace(/_/g, " ").toLocaleUpperCase();
    return prettyKey;
  }
  //call to service to get all data from submissions table
  admin.getSubmissions = function () {
    SubmissionsService.getAllSubmissions().then(function(response){
      admin.allUsersSubmissions = response;
      console.log('whats the submissions response', admin.allUsersSubmissions);
      // for loop to push arrays of objects into specific arrays
      //and to count number of statuses based on the status
      for (var i = 0; i < admin.allUsersSubmissions.length; i++) {
        if (admin.allUsersSubmissions[i].status == 'approved') {
            //count the number under this status
            admin.approvedCount++;
            //console.log('whats the approved count',admin.approvedCount);
            admin.aprroved.push(angular.copy(admin.allUsersSubmissions[i]));
            console.log('whats the aprroved array', admin.aprroved);
        }else if (admin.allUsersSubmissions[i].status == 'pending') {
          //count the number under this status
          admin.pendingCount++;
          //console.log('whats the pending count',admin.pendingCount);
          admin.pending.push(angular.copy(admin.allUsersSubmissions[i]));
          console.log('whats the pending array', admin.pending);
        }else if (admin.allUsersSubmissions[i].status == 'revision') {
          //count the number under this status
          admin.revisionCount++;
          //console.log('whats the revision count',admin.revisionCount);
          admin.revision.push(angular.copy(admin.allUsersSubmissions[i]));
          console.log('whats the revision array', admin.revision);
        }
      }
    });
  }


  //function to get all user data from the user table for access controls
  admin.getUsersAccesses = function () {
    AccessService.accesses().then(function(response){
      admin.allUserAccess = response;
      //console.log('whats the access response', admin.allUserAccess);
    });
  }

  //update user access
  admin.updateUsersAccesses = function (user, site, val) {
    var accessObj = {email:user, department:site, accessBoolean:val };
    AccessService.updateAccess(accessObj).then(function(response){
      console.log('whats the update access response', response);
      //admin.getUsersAccesses();
    });
  }



  // //submit new user button
    admin.submitButton = function() {
      admin.newUser;
      console.log('newUser ', admin.newUser);
      $http.post('/access', {
        email: admin.newUser
      }).then(function(){
      admin.newUser = "";
  });
  }

//approve button for admin
  admin.approveButton = function(pending) {
    console.log('pending ', pending);
    var id = pending.id;
    pending.status = "approved";
    console.log('status ', pending.status);
    $http.put('/submissions/'+id, {
      id: id,
      status: pending.status
    }).then(function(){
      $location.path('/admin'); //on click of button needs to refresh and not on page load
    });
  }


//delete button for all users
  admin.deleteButton = function(pending) {
    console.log('pending ', pending);
    var id = pending.id;
    $http.delete('/submissions/'+id, {
    }).then(function(){
      $location.path('/admin'); //on click of button needs to refresh and not on page load
    })
  }

//revise button under pending, will pop up the modal
  admin.reviseButton = function(image) {
    console.log('revise working');
    console.log('image', image);
    imageData = image; //setting image data equal to the current image
    reviseClass = false; //for ng-show/ng-hide to hide delete and approve button on modal
    reviseInput = true; //to show input for comments
    admin.viewButton();

  }

  //popup modal revise button to submit comment for ADMIN
  admin.subReviseButton = function() {
    console.log('image info ', imageData); //using same image data to target image id
    admin.closeModal();
    reviseClass = true; //should revert buttons back for view
    reviseInput = false; //should get rid of input and allow to see comment
    admin.reviseComment;
    console.log('comment ', admin.reviseComment);
    //updates comments and posts to DB
    $http.put('/submissions/'+imageData.id, {
      status: "pending",
      admin_comment: admin.reviseComment,
      id: imageData.id
    }).then(function(){
      //clears comment input field
    admin.reviseComment = "";
    //resets image data to an empty object
    imageData = {};
});
}


  //modal controlls
  //image src for modal
  admin.modalImage = {};
  //user comment for modal
  admin.modalUserComment = {};
  // Get the modal
  var modal = document.getElementById('adminModal');

  // When the user clicks the button, open the modal
  admin.viewButton = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  admin.closeModal = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  admin.deptNames = AccessService.departmentNames;
  admin.prettyDeptName = function(name) {
    return name.replace(/_/g, ' ').toUpperCase()
  }

  // Uploads brand to S3 if one is selected.  Also sends brand url to SQL db
  // with department_id.
  admin.uploadBrand = function(form) {
    if (form.$invalid) {
      return;
    }
    admin.upload.deptId = parseInt(admin.upload.deptId);
    console.log('admin.controller', admin.upload);
    Upload.upload({
      url: '/image/brand',
      method: 'POST',
      data: admin.upload,
    });
  };

}//end of AdminController function
