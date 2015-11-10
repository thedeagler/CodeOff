angular.module('codeOff.select', [])

.controller('selectCtrl', ['$scope', '$document', 
function ($scope, $document) { 
  console.log('hello');

  new ColorPicker(
    document.getElementById('slide'),
    document.getElementById('picker'),
    function(hex, hsv, rgb) {
      document.body.style.backgroundColor = hex;
  });
}]);

