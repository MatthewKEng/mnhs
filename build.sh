#!/bin/sh
mkdir -p public/vendors;

cp node_modules/angular/angular.min.js public/vendors;
cp node_modules/angular/angular.min.js.map public/vendors;

cp node_modules/bootstrap/dist/css/bootstrap.min.css public/vendors;
cp node_modules/bootstrap/dist/css/bootstrap.min.css.map public/vendors;
cp node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf public/vendors;

cp node_modules/angular-route/angular-route.min.js public/vendors;
cp node_modules/angular-route/angular-route.min.js.map public/vendors;

cp node_modules/ng-file-upload/dist/ng-file-upload.min.js public/vendors;
cp node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js public/vendors;
