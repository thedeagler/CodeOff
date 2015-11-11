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
.factory('socket', ['$rootScope', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
}])