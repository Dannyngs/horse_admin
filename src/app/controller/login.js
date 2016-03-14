(function() {
  'use strict';

  angular
    .module('horseAdmin')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($http,$rootScope, $scope,toastr,AuthService,$location) {

 $scope.user={
     
 }

 
 
 
$scope.platform='Dream Project';
$rootScope.navText ='Admin Panel';
      
 $scope.adminLogin=function(user){

   
     
     if($scope.platform=='Racing Pro')
         {
        $rootScope.navText ='Racing Pro ';

         $rootScope.backendURL="http://racingprohk.ap-southeast-1.elasticbeanstalk.com/admin";    
         }
     else{
         
          $rootScope.backendURL="http://football-back-dev.ap-southeast-1.elasticbeanstalk.com/admin";
          $rootScope.navText ='Dream Project ';
     }
    
     
     $http.post($rootScope.backendURL+'/api/login',{id:user.id,password:user.password}).then(function(res){
        toastr.success("Login Successfully!!")

        AuthService.login(user,res.data.token);
         $location.path("/")


      },function(err){
                    console.log(err);
         toastr.error("Auth Failed!")

      })



  }






  }
})();
