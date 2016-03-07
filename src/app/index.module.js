(function() {
  'use strict';

  angular
    .module('horseAdmin', ['ngResource', 'ui.router', 'ui.bootstrap', 'toastr'])

     .constant('backendURL', 'http://racingprohk.ap-southeast-1.elasticbeanstalk.com/admin')
  //.constant('backendURL', 'http://localhost/admin')
      .factory('AuthService',function(){
      var currentUser=null;
      var curentToken=null;
      var AuthService= {
          
          login:function(user,token){
              currentUser=user;
              curentToken=token;
             
          },
          logout:function(){
              currentUser=null;
             curentToken=null;

              
          },
          isLogined:function(){
              if(!curentToken)
              return false;
              return true;
          },
          getCurrentUser:function(){
          
          return currentUser;
            
            },
          getCurentToken:function(){
          
          return curentToken;
            
            }
          
          
      }
      
      return AuthService;
      
      
  })
        .factory('authInterceptor', function ($rootScope, $q, $window,AuthService) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if (AuthService.getCurentToken()) {
        config.headers.token = AuthService.getCurentToken();
      }
      return config;
    }
  }
  
});;

})();
