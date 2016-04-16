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
      $scope.itemsPerPage=100;

  $rootScope.setPage=function(pnum)
  {
       $scope.currentPage = pnum;
  }

  $scope.pageChanged = function() {
    $rootScope.getMembers(($scope.currentPage-1)*$scope.itemsPerPage);
  };

    if($rootScope.navText=='Dream Project'){
          
          $rootScope.dp_background=true;
      }
     
      
      
      $scope.showpass=function(){

           $scope.showpassword=!$scope.showpassword;

      }

     
      
      
      
     

      $rootScope.getMembers=function(prows){
      $http.get($rootScope.backendURL+'/api/users/'+prows+'/'+$scope.itemsPerPage).then(function(res){
          
         
          $rootScope.users=res.data.users;
         $scope.totalItems=res.data.total_count;

      })
     
     

  }
      $rootScope.searchMember=function(keyword){
        
          $http.get($rootScope.backendURL+'/api/users/'+keyword).then(function(res){
          
         
            $rootScope.users=res.data;
            $scope.totalItems=res.data;
            if(res.data.length>100)
                {
                    alert("We can only present 100 rows of result for you !")
                }

      })   
      }





        $rootScope.getMembers(0);




 $scope.deleteMember=function(id){
     if(confirm("Sure to delete?")){
     $http.delete($rootScope.backendURL+'/api/users/'+id).then(function(res){
         toastr.success("Success");
         console.log(res.data)
          $rootScope.users=res.data;
          $rootScope.setPage(1);
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
