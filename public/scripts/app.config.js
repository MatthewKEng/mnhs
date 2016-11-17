angular.module('BrandImageManagerApp').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/gallery', {
    templateUrl: 'views/gallery.html',
    controller: 'GalleryController as gallery'
  }).when('/editor', {
    templateUrl: 'views/editor.html',
    controller: 'EditorController as editor'
  }).when('/admin', {
    templateUrl: 'views/admin.html',
    controller: 'AdminController as admin'
  }).otherwise({
    templateUrl: 'views/login.html',
    controller: 'LoginController as login'
  });
});
