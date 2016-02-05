(function() {
  'use strict';

  angular
    .module('horseAdmin')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig,$httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 2000;
    toastrConfig.positionClass = 'toast-top-right';
       $httpProvider.interceptors.push('authInterceptor');
  }

})();
