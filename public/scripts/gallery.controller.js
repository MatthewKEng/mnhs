
angular.module('BrandImageManagerApp').controller('GalleryController', function(AuthFactory) {


   var authFactory = AuthFactory;

         console.log('GalleryController loaded');
         var ctrl = this;
      console.log('username', ctrl.username);
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

     });
>>>>>>> e98b2902006a3d4ad4c1db6499ca5e6bf39ef46d
