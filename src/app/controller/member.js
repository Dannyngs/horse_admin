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




      $scope.showpass=function(){

           $scope.showpassword=!$scope.showpassword;

      }



  $rootScope.getMembers=function(){

      $http.get('http://localhost/admin/api/users').then(function(res){
          var dailyIncome = 0;
          var monthlyIncome = 0;
          var today = new Date();
          console.log('todayis :'+today.getDate())
          for(var i=0;i<res.data.length;i++)
              {
                  var user = res.data[i];


                  if(user.registeredOn && user.salePrice){
                      var regDate = new Date(user.registeredOn)

                      if( regDate.getFullYear() == today.getFullYear() && regDate.getMonth() == today.getMonth() )
                          {
                              monthlyIncome += parseInt(user.salePrice)
                                if( regDate.getDate() == today.getDate() )
                                    dailyIncome += parseInt(user.salePrice)
                           }

                  }





              }
         //  console.log(dailyIncome)
          $rootScope.users=res.data;
          $scope.monthlyIncome = monthlyIncome
          $scope.dailyIncome = dailyIncome
      },function(){

      })

  }





   $rootScope.getMembers();





 $scope.deleteMember=function(id){
     if(confirm("Sure to delete?")){
     $http.delete('http://localhost/admin/api/users/'+id).then(function(res){
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




//
 
 
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
