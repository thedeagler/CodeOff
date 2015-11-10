angular.module('codeOff', [
  'codeOff.services',
  'codeOff.game',
  'codeOff.select',
  'ngRoute'
])
.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/play', {
      templateUrl: 'app/game/game.html',
      controller: 'gameCtrl'
    })
    .when('/select', {
      templateUrl: 'app/select/select.html',
      controller: 'selectCtrl'
    })
    .otherwise({
      redirectTo: '/select'
    });
    
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    // $httpProvider.interceptors.push('AttachTokens');
}])