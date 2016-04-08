// verbose-pancake server side

// imports
var express    = require('express');
var fs         = require('fs');
var dotenv     = require('dotenv');

// inits
var app        = express();
app.use(express.static(__dirname + '/static'));
dotenv.load();
var PORT = process.env.PORT || 8080;

// Start server!
app.listen(PORT, function () {
  console.log('Running verbose pancake on port ' + PORT);
});
