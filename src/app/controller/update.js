(function() {
  'use strict';

  angular
    .module('horseAdmin')
    .controller('UpdateController', UpdateController);

  /** @ngInject */
  function UpdateController($http, $scope,$rootScope,toastr,AuthService,$location, $uibModalInstance,selected_user) {

  $scope.update={};
     $scope.update._id=selected_user._id;
      $scope.update.note=selected_user.note;
           $scope.update.salePrice=selected_user.salePrice;
     $scope.update.password=selected_user.password;      
      
      
 $scope.updateMember = function(user){

     if(user.password=="")return toastr.warning("Password cannot be empty","Warning");
     $http.put($rootScope.backendURL+'/api/users/'+user._id,user).then(function(res){
          $rootScope.users=res.data;
         toastr.success("Success");
         $uibModalInstance.close();
         $rootScope.setPage(1);
     },function(res){
         toastr.error(res.data,"Error");

     })
 }


$scope.closeModel = function(){

      $uibModalInstance.dismiss('cancel');
    }


  }
})();
