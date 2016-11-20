angular.module('BrandImageManagerApp').controller('NavController', function(AuthFactory, $window) {

    console.log('NavController loading!')
    var nav = this;
    var authFactory = AuthFactory;
    nav.displayLogout = false;
    nav.message = {
        text: false,
        type: 'info',
    };

    authFactory.isLoggedIn()
        .then(function(response) {
                console.log('nav controller response ', response);
                if (response.data.status) {
                    nav.displayLogout = true;
                    authFactory.setLoggedIn(true);
                    nav.username = response.data.name;
                } else { // is not logged in on server
                    nav.displayLogout = false;
                    authFactory.setLoggedIn(false);
                }
            },

            function() {
                nav.message.text = 'Unable to properly authenticate user';
                nav.message.type = 'error';
            });

    nav.logout = function() {
        authFactory.logout()
            .then(function(response) { // success
              console.log('inside nav controller');
                    authFactory.setLoggedIn(false);
                    nav.username = '';
                    // $window.location.href = '/'; // forces a page reload which will update our NavController

                },

                function(response) { // error
                    nav.message.text = 'Unable to logout';
                    nav.message.type = 'error';
                });
    };

});
