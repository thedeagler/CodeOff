var express = require('express');
var bodyParser = require('body-parser');

var port = 8080;

var app = express();

var samples = [
'// If typed letter is correct, add the letter to the "typed" array\nif(entered === $scope.current) {\n  console.log(\'gotem\');\n  $scope.typed.push($scope.current);\n  $scope.current = $scope.untyped.shift();\n}\n// If typed letter is incorrect\nelse {\n  console.log(\'nope\');\n  // Increment # of mistakes for accuracy calculation\n  mistakes++;\n  // Shake the cursor\n  if($scope.cursor.classList){\n    $scope.cursor.classList.remove(\'blink\');\n    $scope.cursor.classList.add(\'shake\');\n    window.setTimeout(function() {\n      $scope.cursor.classList.remove(\'shake\');\n      $scope.cursor.classList.add(\'blink\');\n    }, 150);\n  }\n}',
'function calc(time) {\n  $scope.stats.cpm = $scope.typed.length / (time - startTime) * 60000;\n  document.getElementById(\'cpm\').innerText = $scope.stats.cpm;\n  if(!!!$scope.untyped.length) {\n    window.cancelAnimationFrame(timer);\n    console.log(\'Done! Final characters per min:\', $scope.stats.cpm);\n  }\n  else {\n    window.requestAnimationFrame(calc);\n  }\n}',
'.factory(\'Links\', function ($http) {\n  var getAll = function () {\n    return $http({\n      method: \'GET\',\n      url: \'/api/links\'\n    })\n    .then(function (resp) {\n      return resp.data;\n    });\n  };\n\n  var addLink = function (link) {\n    return $http({\n      method: \'POST\',\n      url: \'/api/links\',\n      data: link\n    });\n  };\n\n  return {\n    getAll: getAll,\n    addLink: addLink\n  };\n})'
];

app.use(bodyParser.json());
// app.use(function(req, res, next) {
//   console.log('method:', req.method);
//   console.log('body:', req.body);
//   console.log('path:', req.path);

//   next();
// })
app.use(express.static(__dirname + '/client'));

app.post('/sample', function(req, res) {
  console.log('got a sweet request baby')
  res.end('hello post');
})

// configure our server with all the middleware and and routing
// require('./config/middleware.js')(app, express);

// app.get('/', function(req, res) {
//   res.end('hello');
// })

app.listen(port);
console.log('server listening on port:', port, 'at', (new Date()).getMinutes());

module.exports = app;