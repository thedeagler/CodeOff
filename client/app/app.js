angular.module('codeOff', [
  'codeOff.game',
  'ngRoute'
])
.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/game', {
      templateUrl: 'app/game/game.html',
      controller: 'gameCtrl'
    })
    .otherwise({
      redirectTo: '/game'
    });
    
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    // $httpProvider.interceptors.push('AttachTokens');
}])