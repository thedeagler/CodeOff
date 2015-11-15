angular.module('codeOff.select', [])

.controller('selectCtrl', ['$rootScope', '$scope', '$location', 'Player', 'ColorPicker',
function ($rootScope, $scope, $location, Player, ColorPicker) {
  $scope.colorHex = '';
  $scope.username = '';
  $scope.room;

  ColorPicker.ColorPicker(
    document.getElementById('slide'),
    document.getElementById('picker'),
    function(hex, hsv, rgb) {
      $scope.colorHex = hex;
      $scope.$apply();
      document.getElementById('player-color').style.color = hex;
      document.getElementById('submit').style.color = hex;
  });

  $scope.play = function() {
    var playerData = {
      user: $scope.username,
      color: $scope.colorHex,
      room: $scope.room
    };

    Player.register(playerData)
    .then(function(sample) {
      $rootScope.myColor = $scope.colorHex;
      $rootScope.sample = sample;
      $rootScope.myUsername = $scope.username;
      $location.path('/play');
    })
    .catch(function(err) {
      console.error(err);
    })
  };
}]);
