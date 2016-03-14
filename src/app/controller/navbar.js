(function() {
  'use strict';

  angular
    .module('horseAdmin')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/view/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($rootScope,$scope,AuthService,toastr,$location) {
        
         $scope.navText=$rootScope.navText;
        $scope.logout=function(){
            
            if(confirm("Sure to Log out?")){
            toastr.success("Log out Successfully!!")
            AuthService.logout();
            $location.path("/login")
            }
        }

    }
  }

})();
