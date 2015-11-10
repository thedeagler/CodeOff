angular.module('codeOff.game', [])

.controller('gameCtrl', ['$scope', '$document', function ($scope, $document) { 
  var text = 
'for(var i = 0; i < 10; i++) {\n\
  console.log(i);\n\
}';
  // var text = '--------------------------------------------------------------------------------';
  
  $scope.stats = {
    incorrect: {},
    cpm: 0,
    acc: 100
  };
  $scope.typed = [];
  $scope.untyped = text.split('');
  $scope.current = $scope.untyped.shift();

  $scope.cursor = document.getElementById('cursor');

  var startTime, timer;

  $document.on('keydown', function(e) {
    if(e.keyCode) {
      // Backspace
      if(e.keyCode === 8) {
        e.preventDefault();
      }
      // Super
      else if (e.keyCode === 93 || e.keyCode === 91) {
        e.preventDefault();
      }
    }
  });

  $scope.keyCheck = function(e) {
    if(!!!$scope.typed.length) {
      startTime = performance.now()
    }

    var entered = e.charCode === 13 ? '\n' : String.fromCharCode(e.charCode);
    // If typed letter is correct, add the letter to the "typed" array
    if(entered === $scope.current) {
      console.log('gotem');
      $scope.typed.push($scope.current);
      $scope.current = $scope.untyped.shift();
    }
    // If typed letter is incorrect, add it to the incorrectly typed letters object
    else {
      console.log('nope');
      if ($scope.cursor.classList){
        $scope.cursor.classList.remove('blink');
        $scope.cursor.classList.add('shake');
        window.setTimeout(function() {
          $scope.cursor.classList.remove('shake');
          $scope.cursor.classList.add('blink');
        }, 150);
      }
      else {
        $scope.cursor.className += ' ' + 'shake';
      }

      if(!!!$scope.stats.incorrect.hasOwnProperty($scope.current)) {
        $scope.stats.incorrect[$scope.current] = 1;
      }
      else {
        $scope.stats.incorrect[$scope.current]++;
      }
    }

    timer = window.requestAnimationFrame(calc);
  };

  function calc(time) {
    $scope.stats.cpm = $scope.typed.length / (time - startTime) * 60000;
    document.getElementById('cpm').innerText = $scope.stats.cpm;
    console.log($scope.stats.cpm);
    if(!!!$scope.untyped.length) {
      window.cancelAnimationFrame(timer);
      console.log('Done! Final characters per min:', $scope.stats.cpm);
    }
    else {
      window.requestAnimationFrame(calc);
    }
  }
}]);


    /*shift= 16
    ctrl = 17
    alt  = 18
    caps = 20
    tab  = 9
    enter= 13
    bksp = 8
    super= 91/93
    up   = 38
    down = 40
    left = 37
    right= 39
    del  = 46*/
// function keyDownEvent(e) {
//     var other = {};
//     var output= {};
//     output['meta'] = {};
//     var html = '';

//     e = (e) ? e : ((event) ? event : null);

//     if (e) {
//         output['keyCode']   = (e.keyCode) ? e.keyCode : 'N/A';
//         output['charCode'] = (e.charCode) ? e.charCode : 'N/A';
//         output['meta']['shift']     =   e.shiftKey  ? true : false;
//         output['meta']['ctrl']      =   e.ctrlKey   ? true : false;
//         output['meta']['alt']       =   e.altKey    ? true : false;
//         output['meta']['meta']      =   e.metaKey   ? true : false;

//         html = document.getElementById('output')
//         return html.innerHTML += '<pre>keyDown : ' + JSON.stringify(output) + '</pre>';
//     } else {
//         return 'error';
//     }
// }

// function keyPressEvent(e) {
//     var other = {};
//     var output= {};

//     e = (e) ? e : ((event) ? event : null);

//     if (e) {
//         output['keyCode']   = (e.keyCode) ? e.keyCode : 'N/A';
//         output['charCode'] = (e.charCode) ? e.charCode : 'N/A';

//         html = document.getElementById('output')
//         return html.innerHTML += '<pre>keyPress : ' + JSON.stringify(output) + ' Character : <strong>' +  String.fromCharCode(output['charCode']) + '</strong></pre><hr/>';
//     } else {
//         return 'error';
//     }
// }

// var test = document.getElementById('test');
// test.onkeydown = keyDownEvent;
// test.onkeypress = keyPressEvent;