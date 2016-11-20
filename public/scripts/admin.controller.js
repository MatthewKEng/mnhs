angular.module('BrandImageManagerApp')
    .controller('AdminController', AdminController);

function AdminController($location, AccessService, SubmissionsService) {
    var admin = this;


    //call to service to get status of all submissions
    //push statuses into specific arrays to count number of statuses based on array


    //modal controlls
    // Get the modal
    var modal = document.getElementById('adminModal');

    // // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");
    //
    // // Get the <span> element that closes the modal
    // var span = document.getElementsByClassName("close")[0];

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
