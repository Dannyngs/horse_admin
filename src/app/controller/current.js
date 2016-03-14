(function() {
  'use strict';

  angular
    .module('horseAdmin')
    .controller('CurrentController', CurrentController);

  /** @ngInject */
  function CurrentController($http,$scope,$rootScope,toastr,AuthService) {



function getOnlineMembers(){


      $http.get($rootScope.backendURL+'/api/onlineusers').then(function(res){
          $scope.onlineusers=res.data;


      },function(){

      })

  }





     getOnlineMembers();



 $scope.refreshOnlineMembers=getOnlineMembers;





  $scope.takeoffline=function(id){

     $http.delete($rootScope.backendURL+'/api/onlineusers/'+id).then(function(res){
         toastr.success(res.data);
         getOnlineMembers();
     },function(err){})
 }



  }
})();
