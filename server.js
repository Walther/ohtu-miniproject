// verbose-pancake server side

// imports
var express    = require('express');
var fs         = require('fs');
var dotenv     = require('dotenv');
var shortid    = require('shortid');
var bodyParser = require('body-parser')


// inits
var app     = express();
app.use(express.static(__dirname + '/static'));
app.use("/data", express.static(__dirname + '/data'));
var urlencodedParser = bodyParser.urlencoded({ extended: false })
dotenv.load();
var PORT    = process.env.PORT || 8080;
var DATADIR = __dirname + "/data/";

// Form handling
app.post('/submit', urlencodedParser, function (req, res) {
  // Creating a new Citation
  console.log("Creating new Citation");
  var id      = shortid.generate();
  var content = {
    "id"     : id,
    "author" : req.body.Author,
    "title"  : req.body.Title,
    "journal": req.body.Journal,
    "volume" : req.body.Volume,
    "year"   : req.body.Year,
    "pages"  : req.body.Pages
  };

  filePath = DATADIR + id;

  fs.writeFile(filePath, JSON.stringify(content), function(err) {
    if(err) {
      return console.log(err);
    }
    res.sendStatus(200);
  });
});

// Data listing
app.get('/list', function (req, res) {
  var filelist = [];
  fs.readdir(DATADIR, function (err, files) {
    if (err) {
      return console.log(err);
    }
    files.forEach(function (filename) {
      if(! /^\..*/.test(filename)) {
        filelist.push(filename);
      }
    })
    res.send(JSON.stringify(filelist));
  });
});

// Start server!
app.listen(PORT, function () {
  console.log('Running verbose pancake on port ' + PORT);
});
