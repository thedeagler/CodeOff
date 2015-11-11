angular.module('codeOff.services', [])
.factory('Player',['$http', function($http) {
  var ready = function(playerData) {
    return $http({
      method: 'POST',
      url: '/game/join',
      data: playerData
    })
    .then(function (sample) {
      return sample;
    });
  };

  var register = function(playerData) {
    return $http({
      method: 'POST',
      url: '/join',
      data: playerData
    })
    .then(function (response) {
      // process sample to a stringthing
      return response.data;
    });
  };

  return {
    ready: ready,
    register: register
  };
}])