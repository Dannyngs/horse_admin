(function() {
  'use strict';

  angular
    .module('horseAdmin')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($http, $scope,toastr,AuthService,$location) {

 $scope.user={
     id:'wsh',
     password:'wsh'
 }

 $scope.adminLogin=function(user){

     $http.post('http://localhost/admin/login',{id:user.id,password:user.password}).then(function(res){
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
