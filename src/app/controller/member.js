(function() {
  'use strict';

  angular
    .module('horseAdmin')
    .controller('MemberController', MemberController);

  /** @ngInject */
  function MemberController($http, $scope,$rootScope,toastr,$uibModal) {

    var updateModel,createModel;

      $scope.user={};
      $scope.showpassword=false;
       
        /** @pagination */

      
        $scope.currentPage = 1;
      $scope.itemsPerPage=200;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    $rootScope.getMembers(($scope.currentPage-1)*$scope.itemsPerPage,$scope.itemsPerPage);
  };

  
  
              /** @pagination */

      
      
      
      if($rootScope.navText=='Dream Project'){
          
          $rootScope.dp_background=true;
      }




      $scope.showpass=function(){

           $scope.showpassword=!$scope.showpassword;

      }

      function getMemberCount(){
         
          $http.get($rootScope.backendURL+'/api/usercount/').then(function(res){
        $scope.totalItems=res.data.count;
        
           
      },function(){

      })
      }

      $rootScope.getMembers=function(pnum,count){
          
      $http.get($rootScope.backendURL+'/api/users/'+pnum+'/'+count).then(function(res){
          
         
          $rootScope.users=res.data;
         

      })

  }





        $rootScope.getMembers($scope.currentPage,$scope.itemsPerPage);
        getMemberCount();




 $scope.deleteMember=function(id){
     if(confirm("Sure to delete?")){
     $http.delete($rootScope.backendURL+'/api/users/'+id).then(function(res){
         toastr.success("Success");
         console.log(res.data)
          $rootScope.users=res.data;
     },function(err){})
     }
 }

 
  $scope.showAddMember = function(id){

     $('#addModel').modal('show');
     $scope.addMember={};
      $scope.addMember.role="member";
     $scope.roles=[
          {label:"Member",value:"member"},
          {label:"Admin",value:"admin"}

      ]

     console.log($scope.roles);
 }


 $scope.showUpdateMember = function(user){

     $('#updateModel').modal('show');
     $scope.update={};
     $scope.update._id=user._id;
      $scope.update.note=user.note;
           $scope.update.salePrice=user.salePrice;
     $scope.update.password=user.password;

 }


 
  $scope.openUpdate = function (user) {

    $uibModal.open({
      animation: true,
      templateUrl: 'app/view/updateModel.html',
      controller: 'UpdateController',

      resolve: {
        selected_user: function () {
          return user;
        }
      }
    });
 }

  
   $scope.openCreate = function () {

   $uibModal.open({
      animation: true,
      templateUrl: 'app/view/createModel.html',
      controller: 'CreateController',

      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
 }

 
  }
})();
