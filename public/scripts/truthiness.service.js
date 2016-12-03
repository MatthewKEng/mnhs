angular.module('BrandImageManagerApp')
.service('TruthinessService', TruthinessService);

//provides boolean values that need to not change from controller to controller
function TruthinessService () {
         return{once:false};
       }
