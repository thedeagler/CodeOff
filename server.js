var express = require('express');
var bodyParser = require('body-parser');

var port = 8080;

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

// configure our server with all the middleware and and routing
// require('./config/middleware.js')(app, express);

// app.get('/', function(req, res) {
//   res.end('hello');
// })

app.listen(port);
console.log('server listening on port:', port, 'at', new Date());

module.exports = app;