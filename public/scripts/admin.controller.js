angular.module('BrandImageManagerApp')
    .controller('AdminController', AdminController);

function AdminController($location, AccessService, SubmissionsService) {
    var admin = this;

    //ng-show variables onload
    admin.accessControlsDisplay = false;
    admin.pendingGalleryDisplay = true;
    admin.approvedGalleryDisplay = false;
    admin.revisionGalleryDisplay = false;

    //function to display access
    admin.showAccess = function () {
      admin.getUsersAccesses();
      admin.accessControlsDisplay = true;
      admin.pendingGalleryDisplay = false;
      admin.approvedGalleryDisplay = false;
      admin.revisionGalleryDisplay = false;
    }
    //functions to display gallery
    //display pending gallery
    admin.showPendingGallery = function () {
      admin.accessControlsDisplay = false;
      admin.pendingGalleryDisplay = true;
      admin.approvedGalleryDisplay = false;
      admin.revisionGalleryDisplay = false;
    }
    //display approved gallery
    admin.showApprovedGallery = function () {
      admin.accessControlsDisplay = false;
      admin.pendingGalleryDisplay = false;
      admin.approvedGalleryDisplay = true;
      admin.revisionGalleryDisplay = false;
    }
    //display revision gallery
    admin.showRevisionGallery = function () {
      admin.accessControlsDisplay = false;
      admin.pendingGalleryDisplay = false;
      admin.approvedGalleryDisplay = false;
      admin.revisionGalleryDisplay = true;
    }
    //function for truthy value of button clicked
    admin.truthiness = function (boolean) {
      function currentbutton() {};
      var showMe = new currentbutton()
      if (boolean == true) {
         admin.showUserAcess = false;
         console.log('whats the truth ',admin.showUserAcess);
      }else{
         admin.showUserAcess = true;
         console.log('whats the truth ',admin.showUserAcess);
      }
    }
    //call to service to get status of all submissions
    //push statuses into specific arrays to count number of statuses based on array

    //function to get all user data from the user table for access controls
    admin.getUsersAccesses = function () {
      AccessService.accesses().then(function(response){
        admin.allUserAccess = response
        console.log('whats the access response', admin.allUserAccess);
      });
    }


    //modal controlls
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
}//end of AdminController function
