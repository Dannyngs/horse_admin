(function() {
  'use strict';

  angular
    .module('horseAdmin')
    .controller('CreateController', CreateController);

  /** @ngInject */
  function CreateController($http, $scope,toastr,AuthService,$location, $uibModalInstance,$rootScope,backendURL) {

      
      
$scope.addMember={};
$scope.addMember.role="member";
$scope.roles=[
          {label:"Member",value:"member"},
          {label:"Admin",value:"admin"}

      ]      
      
$scope.saveMember  = function(user){
    
      if(user.password==""||user.username=="")return toastr.warning("Username or Password cannot be empty","Warning");
    $http.post(backendURL+'/api/users',user).then(function(res){

         toastr.success("Success");
       $rootScope.users=res.data;
        user={};
     },function(res){
          toastr.error(res.data,"Error");
     })
 }


$scope.closeModel = function(){

      $uibModalInstance.dismiss('cancel');
    }


  }
})();
