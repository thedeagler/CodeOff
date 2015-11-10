angular.module('codeOff.services', [])
.factory('Player',['$http', function($http) {
  var ready = function(playerData) {
    return $http({
      method: 'POST',
      url: '/game/join',
      data: playerData
    });
  };

  return {
    ready: ready
  };
}])
// Get some factories bruh
// .factory('Links', function ($http) {
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