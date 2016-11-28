angular.module('BrandImageManagerApp').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'NavController as nav',
    controller: 'LoginController as login'
  }).when('/gallery', {
    templateUrl: 'views/gallery.html'
    // controller: 'GalleryController as gallery'
  }).when('/editor', {
    templateUrl: 'views/editor.html',
    controller: 'EditorController as editor'
  }).when('/admin', {
    templateUrl: 'views/admin.html',
    controller: 'AdminController as admin'
  }).when('/photoUploader', {
    templateUrl: 'views/photoUploader.html',
    controller: 'PhotoController as photo'
  }).otherwise({
    templateUrl: 'views/login.html',
  });
});
