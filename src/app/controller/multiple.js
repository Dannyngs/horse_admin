(function() {
  'use strict';

  angular
    .module('horseAdmin')
    .controller('MultipleController', MultipleController);

  /** @ngInject */
  function MultipleController($http, $scope,toastr) {
         
   
 
 
      function getMultipleLogin(){
         
          $http.get('http://localhost/admin/api/multiplelogin').then(function(res){
             
                var lastUser=null;
              var multiples=[];
              var multipleCount = 0;
              for(var i=0;i<res.data.length;i++)
                  {
                      var user =res.data[i];
                      if(user.username!=lastUser)           
                      {
                          user.count = 1;
                          lastUser=user.username;
                          multiples.push(user);
                         
                          
                      }else
                          {
                             multiples[(multiples.length-1)].count++; 
                              multiples[(multiples.length-1)].date=user.date;
                              
                          }
                     
                     
                     
                        
                  }
              
              
              
              
              $scope.multiplelogin  = multiples;
          },function(res){
              toastr.error(res.data)
          })
      }
      
      
  
 
   
      
      getMultipleLogin();
    
  
 
 
 $scope.emptyRecords = function(){
     
     $http.delete('http://localhost/admin/api/multiplelogin/').then(function(res){
         toastr.success(res.data,"Success");
         getMultipleLogin();
     },function(res){})
 }

  
  }
})();
