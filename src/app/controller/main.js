(function() {
  'use strict';

  angular
    .module('horseAdmin')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($http, $scope,toastr,AuthService) {



function getOnlineMembers(){


      $http.get('http://localhost/admin/api/onlineusers').then(function(res){
          $scope.onlineusers=res.data;


      },function(){

      })

  }





     getOnlineMembers();



 $scope.refreshOnlineMembers=getOnlineMembers;





  $scope.takeoffline=function(id){

     $http.delete('http://localhost/api/onlineusers/'+id).then(function(res){
         toastr.success(res.data);
         getOnlineMembers();
     },function(err){})
 }



  }
})();
