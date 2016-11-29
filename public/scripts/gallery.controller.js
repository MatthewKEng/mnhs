angular.module('BrandImageManagerApp')
  .controller('GalleryController', GalleryController);

function GalleryController(AuthFactory, AccessService, ImageService, ImageTableService) {

  var authFactory = AuthFactory;

  console.log('GalleryController loaded');
  var ctrl = this;
  ctrl.userDepts = AccessService.userDepts;
  ctrl.notUserDepts = AccessService.notUserDepts;
  console.log('username', ctrl.username);
  console.log('user depts1', ctrl.userDepts);
  console.log('user depts2', ctrl.notUserDepts)
  authFactory.isLoggedIn()
    .then(function(response) {
      console.log('ctrl controller response ', response);
      if (response.data.status) {
        ctrl.displayLogout = true;
        authFactory.setLoggedIn(true);
        ctrl.username = response.data.name;
        console.log('username', ctrl.username);
      } else { // is not logged in on server
        ctrl.displayLogout = false;
        authFactory.setLoggedIn(false);
      }
    });

  ctrl.pretty = function (name) {
    var prettyUserDept = name.replace(/_/g, " ").toLocaleUpperCase();
    return prettyUserDept;
  };

  ctrl.showDept = function(index) {
    ImageTableService.getImages(index + 1).then(function(response) {
      ctrl.deptImages = response;
      console.log('deptImages', ctrl.deptImages);
    });

  };

  //call to service to get all data from submissions table
  ctrl.getImages = function () {
    SubmissionsService.getAllSubmissions().then(function(response){
      ctrl.allUsersSubmissions = response;
      console.log('whats the submissions response', ctrl.allUsersSubmissions);
      // for loop to push arrays of objects into specific arrays
      //and to count number of statuses based on the status
      for (var i = 0; i < ctrl.allUsersSubmissions.length; i++) {
        if (ctrl.allUsersSubmissions[i].status == 'approved') {
            //count the number under this status
            ctrl.approvedCount++;
            //console.log('whats the approved count',ctrl.approvedCount);
            ctrl.aprroved.push(angular.copy(ctrl.allUsersSubmissions[i]));
            console.log('whats the aprroved array', ctrl.aprroved);
        } else if (ctrl.allUsersSubmissions[i].status == 'pending') {
          //count the number under this status
          ctrl.pendingCount++;
          //console.log('whats the pending count',ctrl.pendingCount);
          ctrl.pending.push(angular.copy(ctrl.allUsersSubmissions[i]));
          console.log('whats the pending array', ctrl.pending);
        } else if (ctrl.allUsersSubmissions[i].status == 'revision') {
          //count the number under this status
          ctrl.revisionCount++;
          //console.log('whats the revision count',ctrl.revisionCount);
          ctrl.revision.push(angular.copy(ctrl.allUsersSubmissions[i]));
          console.log('whats the revision array', ctrl.revision);
        }
      }
    });
  }
  //function to attack image clicked url to the ImageService so the photoedit gets it
  ctrl.sendThisImage = function (image) {
    ImageService.image = image;
    console.log('did we get the image clicked', ImageService.image);
  }
}
