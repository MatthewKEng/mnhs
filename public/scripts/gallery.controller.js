angular.module('BrandImageManagerApp')
  .controller('GalleryController', GalleryController);

 function GalleryController(AuthFactory, AccessService, ImageService) {

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
        }

          ctrl.addNotApprov = function() {
            console.log('populating not approved images');

          }
          
        }
