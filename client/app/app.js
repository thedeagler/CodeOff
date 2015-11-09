angular.module('codeRacer', [
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
// Get some factories bruh
// .factory('Links', function ($http) {
//   // Your code here

//   var getAll = function () {
//     return $http({
//       method: 'GET',
//       url: '/api/links'
//     })
//     .then(function (resp) {
//       return resp.data;
//     });
//   };

//   var addLink = function (link) {
//     return $http({
//       method: 'POST',
//       url: '/api/links',
//       data: link
//     });
//   };

//   return {
//     getAll: getAll,
//     addLink: addLink
//   };
// })