(function() {
  'use strict';

  angular
    .module('horseAdmin')
    .controller('AccountController', AccountController);

  /** @ngInject */
  function AccountController($http, $scope,$rootScope,toastr,AuthService,$location) {

 
 
$scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };


  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };
      
      
      
 $scope.adminLogin=function(user){

     $http.post( $rootScope.backendURL+'/api/login',{id:user.id,password:user.password}).then(function(res){
        toastr.success("Login Successfully!!")

        AuthService.login(user,res.data.token);
         $location.path("/")


      },function(err){
                    console.log(err);
         toastr.error("Auth Failed!")

      })



  }

$scope.getRange=function(from,to){
    if(!from||!to)
        return toastr.error('Please select a date range first.')
        
    $http.get( $rootScope.backendURL+'/api/rangetotal/'+from+'/'+to).then(function(res){
        
$scope.rangetotal=res.data.totalcost;    
$scope.totalusers=res.data.users;


      },function(err){
                    console.log(err);
         toastr.error("Auth Failed!")

      })
    
    
    
}

 
function getTotal(){
    $http.get( $rootScope.backendURL+'/api/daytotal').then(function(res){
        
$scope.daytotal=res.data.daytotal;    
        


      },function(err){
                    console.log(err);
         toastr.error("Auth Failed!")

      })
    
    $http.get($rootScope.backendURL+'/api/monthtotal').then(function(res){
        
$scope.monthtotal=res.data.monthtotal;    
        


      },function(err){
                    console.log(err);
         toastr.error("Auth Failed!")

      })
    
}

getTotal();

  }
})();
