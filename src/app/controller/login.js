(function() {
  'use strict';

  angular
    .module('horseAdmin')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($http, $scope,toastr,AuthService,$location,backendURL) {

 $scope.user={
     
 }

 $scope.adminLogin=function(user){

     $http.post(backendURL+'/api/login',{id:user.id,password:user.password}).then(function(res){
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
