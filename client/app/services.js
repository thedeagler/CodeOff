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
      url: '/sample',
      data: playerData
    })
    .then(function (sample) {
      // process sample to a stringthing
      return sample;
    });
  };

  return {
    ready: ready,
    register: register
  };
}])