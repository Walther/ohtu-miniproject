// verbose-pancake server side

// imports
var express    = require('express');
var http    = require('http');
var fs         = require('fs');
var dotenv     = require('dotenv');
var shortid    = require('shortid');
var bodyParser = require('body-parser');
var rmdir = require('rimraf');

// inits
var app     = express();
app.use(express.static(__dirname + '/static'));
app.use("/data", express.static(__dirname + '/data'));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
dotenv.load();
var PORT    = process.env.PORT || 8080;
var DATADIR = __dirname + "/data/";
var toedit = "";

// Functions

//Should clean given directory
function cleanDataDir(directory) {
  rmdir(('./' + directory + '/*'), function(error){
    if(error) {
      console.log(error);
    } else {
      console.log("Cleaned /data directory");
    }
  });
}
module.exports.cleanDataDir = function(error, directory) {
  cleanDataDir(error, directory);
};

app.get('/edit', function(req,res) {
  var id = req.url.split("=")[1];
  console.log(id);
  res.setHeader('Content-Type', 'application/json');
  fs.readFile(DATADIR + id, function(error, data) {
    if (error) console.log(error);
    toedit = JSON.parse(data);
    fs.readFile('./edit.html', function (err, html) {
      if (err) throw err;
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(html);
      res.end();
    });
  });
});
// Form handling
app.post('/submit', urlencodedParser, function (req, res) {
  // Creating a new Citation
  var id      = shortid.generate();
  var format  = req.body.Format;
  var content;

  switch (format) {
    case "article":
      content = {
        "id"     : id,
        "format" : "article",
        "author" : req.body.Author,
        "title"  : req.body.Title,
        "journal": req.body.Journal,
        "volume" : req.body.Volume,
        "year"   : req.body.Year,
        "pages"  : req.body.Pages,
        "tags"   : req.body.Tags
      };
      break;
    case "book":
      content = {
        "id"        : id,
        "format"    : "book",
        "author"    : req.body.Author,
        "title"     : req.body.Title,
        "publisher" : req.body.Publisher,
        "year"      : req.body.Year,
        "tags"      : req.body.Tags
      };
      break;
    case "inproceedings":
      content = {
        "id"        : id,
        "format"    : "inproceedings",
        "author"    : req.body.Author,
        "title"     : req.body.Title,
        "booktitle" : req.body.Booktitle,
        "year"      : req.body.Year,
        "tags"      : req.body.Tags
      };
	  break;
	case "incollection":
      content = {
        "id"        : id,
        "format"    : "incollection",
        "author"    : req.body.Author,
        "title"     : req.body.Title,
        "booktitle" : req.body.Booktitle,
		"publisher" : req.body.Publisher,
        "year"      : req.body.Year,
        "tags"      : req.body.Tags
      };
	  break;
	case "inbook":
      content = {
        "id"        : id,
        "format"    : "inbook",
        "author"    : req.body.Author,
        "title"     : req.body.Title,
        "pages"   	: req.body.Pages,
		"publisher" : req.body.Publisher,
        "year"      : req.body.Year,
        "tags"      : req.body.Tags
      };
      break;
	case "mastersthesis":
      content = {
        "id"        : id,
        "format"    : "mastersthesis",
        "author"    : req.body.Author,
        "title"     : req.body.Title,
		"school" 	  : req.body.School,
        "year"      : req.body.Year,
        "tags"      : req.body.Tags
      };
      break;
	case "phdthesis":
      content = {
        "id"        : id,
        "format"    : "phdthesis",
        "author"    : req.body.Author,
        "title"     : req.body.Title,
		"school" 	  : req.body.School,
        "year"      : req.body.Year,
        "tags"      : req.body.Tags
      };
      break;
	case "techreport":
      content = {
        "id"        	: id,
        "format"    	: "techreport",
        "author"    	: req.body.Author,
        "title"     	: req.body.Title,
		"institution"	: req.body.Institution,
        "year"     	 	: req.body.Year,
        "tags"          : req.body.Tags
      };
      break;
	  case "conference":
      content = {
        "id"        	: id,
        "format"    	: "conference",
        "author"    	: req.body.Author,
        "title"     	: req.body.Title,
		"booktitle"		: req.body.Booktitle,
        "year"     	 	: req.body.Year,
        "tags"          : req.body.Tags
      };
      break;
	  case "unpublished":
      content = {
        "id"        	: id,
        "format"    	: "unpublished",
        "author"    	: req.body.Author,
        "title"     	: req.body.Title,
        "note"     	 	: req.body.Note,
        "tags"          : req.body.Tags
      };
      break;
	  case "proceedings":
      content = {
        "id"        	: id,
        "format"    	: "proceedings",
        "title"     	: req.body.Title,
        "year"     	 	: req.body.Year,
        "tags"          : req.body.Tags
      };
      break;
	  case "booklet":
      content = {
        "id"        	: id,
        "format"    	: "booklet",
        "title"     	: req.body.Title,
        "tags"          : req.body.Tags
      };
      break;
	  case "manual":
      content = {
        "id"        	: id,
        "format"    	: "manual",
        "title"     	: req.body.Title,
        "tags"          : req.body.Tags
      };
      break;
	  case "misc":
      content = {
        "id"        	: id,
        "format"    	: "misc",
        "tags"          : req.body.Tags
      };
      break;
    default:
      return;
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
app.get('/references.bib', function(req, res) {
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
    process.stdout.on('data', function(data) {
      res.send(data);
    });
  });
});

// Start server!
app.listen(PORT, function () {
  cleanDataDir('data');
  console.log('Running verbose pancake on port ' + PORT);
});
