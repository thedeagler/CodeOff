angular.module('codeOff.game', [])

.controller('gameCtrl', ['$scope', '$document', function ($scope, $document) { 
  // Controller vars
  var texts = [
'for(var i = 0; i < 10; i++) {\n\
  console.log(i);\n\
}',

'// If typed letter is correct, add the letter to the "typed" array\n\
if(entered === $scope.current) {\n\
  console.log(\'gotem\');\n\
  $scope.typed.push($scope.current);\n\
  $scope.current = $scope.untyped.shift();\n\
}\n\
// If typed letter is incorrect\n\
else {\n\
  console.log(\'nope\');\n\
  // Increment # of mistakes for accuracy calculation\n\
  mistakes++;\n\
  // Shake the cursor\n\
  if($scope.cursor.classList){\n\
    $scope.cursor.classList.remove(\'blink\');\n\
    $scope.cursor.classList.add(\'shake\');\n\
    window.setTimeout(function() {\n\
      $scope.cursor.classList.remove(\'shake\');\n\
      $scope.cursor.classList.add(\'blink\');\n\
    }, 150);\n\
  }\n\
}',

'function calc(time) {\n\
  $scope.stats.cpm = $scope.typed.length / (time - startTime) * 60000;\n\
  document.getElementById(\'cpm\').innerText = $scope.stats.cpm;\n\
  if(!!!$scope.untyped.length) {\n\
    window.cancelAnimationFrame(timer);\n\
    console.log(\'Done! Final characters per min:\', $scope.stats.cpm);\n\
  }\n\
  else {\n\
    window.requestAnimationFrame(calc);\n\
  }\n\
}',

'.factory(\'Links\', function ($http) {\n\
  var getAll = function () {\n\
    return $http({\n\
      method: \'GET\',\n\
      url: \'/api/links\'\n\
    })\n\
    .then(function (resp) {\n\
      return resp.data;\n\
    });\n\
  };\n\
\n\
  var addLink = function (link) {\n\
    return $http({\n\
      method: \'POST\',\n\
      url: \'/api/links\',\n\
      data: link\n\
    });\n\
  };\n\
\n\
  return {\n\
    getAll: getAll,\n\
    addLink: addLink\n\
  };\n\
})'
];
  var gameTime = 30000;
  // var sample = texts[Math.floor(Math.random() * 3)];
  var sample = texts[3];
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

  $scope.init = function() {
    $scope.current = $scope.untyped.shift();
    // fire ready signal to server
  }

  // Game logic
  $scope.keyCheck = function(e) {
    if(!!!$scope.gameOver) {
      console.log('textlength:', sample.length, 'typedlength:', $scope.typed.length);
      // Do on first keypress only
      if(!!!$scope.typed.length) {
        startTime = performance.now()
        timer = window.requestAnimationFrame(calc);
      }

      var entered = e.charCode === 13 ? '\n' : String.fromCharCode(e.charCode);
      // If typed letter is correct, add the letter to the "typed" array
      if(entered === $scope.current) {
        console.log('gotem');
        $scope.typed.push($scope.current);
        $scope.current = $scope.untyped.shift();
      }
      // If typed letter is incorrect
      else {
        console.log('nope');
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
    document.getElementById('timer').innerText = time > gameTime ? 'finished!' : ((gameTime - time) / 1000).toFixed(3) + 's';

    // Game end condition ()
    if(time >= gameTime) {
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
