(function() {
  'use strict';

  angular
    .module('horseAdmin')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$rootScope,AuthService,$location) {

    $log.debug('runBlock end');



      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

          

            if(toState.authRequired){
                 if (!AuthService.isLogined()) {

                   return $location.path('/login')
                }

             }
            if (toState.templateUrl === 'app/view/login.html' && AuthService.isLogined()) {

                $location.path('/home')
            }




        });


  }

})();
