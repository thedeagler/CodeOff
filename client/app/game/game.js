angular.module('codeOff.game', [])

.controller('gameCtrl', ['$rootScope', '$scope', '$document', 'Player',
function ($rootScope, $scope, $document, Player) { 
  // Controller vars
  var gameTime = 60000;
  var sample = $rootScope.sample;
  var startTime, timer, mistakes = 0;
  var cursor = document.getElementById('cursor');
  
  // Scope vars
    // Game vars
  $scope.gameOver = false;
  $scope.stats = {
    incorrect: {},
    cpm: 0,
    acc: 100
  };

    // Typing area
  $scope.typed = [];
  $scope.untyped = sample.split('');
  $scope.current;

  // Prevent defaults of special keys which interrupt gameplay
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
      // Tab
      else if (e.keyCode === 9) {
        e.preventDefault();
      }
    }
  });

  $scope.ready = function() {
    $scope.current = $scope.untyped.shift();
    // fire ready signal to server
  }

  // Game logic
  $scope.keyCheck = function(e) {
    if(!!!$scope.gameOver) {
      // Do on first keypress only
      if(!!!$scope.typed.length) {
        startTime = performance.now()
        timer = window.requestAnimationFrame(calc);
      }

      var entered = e.charCode === 13 ? '\n' : String.fromCharCode(e.charCode);
      // If typed letter is correct, add the letter to the "typed" array
      if(entered === $scope.current) {
        $scope.typed.push($scope.current);
        $scope.current = $scope.untyped.shift();
      }
      // If typed letter is incorrect
      else {
        // Increment # of mistakes for accuracy calculation
        mistakes++;
        // Shake the cursor
        if (cursor.classList){
          cursor.classList.remove('blink');
          cursor.classList.add('shake');
          window.setTimeout(function() {
            cursor.classList.remove('shake');
            cursor.classList.add('blink');
          }, 150);
        }
        else {
          cursor.className += ' ' + 'shake';
        }

        // Add the current character to the incorrectly typed letters object
        var wrong;
        switch($scope.current) {
          case ' ':
            wrong = '[space]';
            break;
          case '\n':
            wrong = '[return]';
            break;
          default:
            wrong = $scope.current;
            break;
        }
        if(!!!$scope.stats.incorrect.hasOwnProperty(wrong)) {
          $scope.stats.incorrect[wrong] = 1;
        }
        else {
          $scope.stats.incorrect[wrong]++;
        }
      }

      // Calculate accuraccy
      $scope.stats.acc = (($scope.typed.length - mistakes) / $scope.typed.length) * 100;
    }
  };

  // Redraw dashboard using animation frames
  function calc(time) {
    $scope.stats.cpm = $scope.typed.length / (time - startTime) * 60000;
    document.getElementById('cpm').innerText = $scope.stats.cpm;
    document.getElementById('timer').innerText = time >= gameTime ? 'finished!' : ((gameTime - time) / 1000).toFixed(3) + 's';

    // Game end condition ()
    if(time >= gameTime || $scope.typed.length === sample.length) {
      $scope.gameOver = true;
      window.cancelAnimationFrame(timer);
    }
    else {
      window.requestAnimationFrame(calc);
    }
  }
}]);
/*
shift= 16
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
del  = 46
*/
