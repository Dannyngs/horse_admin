(function() {
  'use strict';

  angular
    .module('horseAdmin')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/view/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        authRequired:true
      })
    .state('login', {
        url: '/login',
        templateUrl: 'app/view/login.html',
        controller: 'LoginController',
        controllerAs: 'login',
        authRequired:false
      })
    .state('member', {
        url: '/member',
        templateUrl: 'app/view/member.html',
        controller: 'MemberController',
        controllerAs: 'member',
        authRequired:true,
      })
     .state('multiple', {
        url: '/multiple',
        templateUrl: 'app/view/multiple.html',
        controller: 'MultipleController',
        controllerAs: 'multiple',
        authRequired:true
      })
        .state('account', {
        url: '/accounting',
        templateUrl: 'app/view/account.html',
        controller: 'AccountController',
        controllerAs: 'account',
        authRequired:true
      });

    $urlRouterProvider.otherwise('/');
  }

})();
