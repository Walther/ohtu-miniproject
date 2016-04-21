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
  var format  = req.body.Format;
  var content;


  if (format == "article") {
    content = {
      "id"     : id,
      "format" : "article",
      "author" : req.body.Author,
      "title"  : req.body.Title,
      "journal": req.body.Journal,
      "volume" : req.body.Volume,
      "year"   : req.body.Year,
      "pages"  : req.body.Pages
    };
  }

  else if (format == "book") {
    content = {
      "id"        : id,
      "format"    : "book",
      "author"    : req.body.Author,
      "title"     : req.body.Title,
      "publisher" : req.body.Publisher,
      "year"      : req.body.Year,
    };
  }

  else if (format == "inproceedings") {
    content = {
      "id"        : id,
      "format"    : "inproceedings",
      "author"    : req.body.Author,
      "title"     : req.body.Title,
      "booktitle" : req.body.Booktitle,
      "year"      : req.body.Year,
    };
  }

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
    });
    res.send(JSON.stringify(filelist));
  });
});

//BibTex Output
app.get('/bibtex-list', function(req, res) {
  fs.readdir(DATADIR, function (err, files) {
    if (err) {
      return console.log(err);
    }
    var arg = "";
    files.forEach(function (filename) {
        arg += (filename + ",");
    });
    arg = arg.substring(0, arg.length-1);
    var spawn = require('child_process').spawn;
    var process = spawn('python', ["./bibtexify.py",arg]);
    console.log("BibTeX generated from list to bibtex-list.txt");
    process.stdout.on('data', function(data) {
      res.send(data);
    });
  });
});

// Start server!
app.listen(PORT, function () {
  console.log('Running verbose pancake on port ' + PORT);
});
