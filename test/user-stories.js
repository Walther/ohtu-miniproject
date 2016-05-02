var server  = require('../server.js');
var assert  = require('assert');
var http    = require('http');
var request = require("request");
var should  = require("should");
var fs      = require("fs");
var DATADIR = __dirname + "/../data/";

describe('server', function () {
  before(function () {
    server.listen(5000);
  });

  after(function () {
    server.close();
  });
});

describe('after server has started', function() {
  it('data directory should be clean', function(done) {
    server.cleanDataDir("error", "data");
    fs.readdir(DATADIR, function(err,files) {
      if(err) {
        console.log(err);
      }
      files.length.should.equal(1); //.gitignore file
    });
    done();
  });
});

describe('when user goes to front page', function () {
  it('should return 200', function (done) {
      request.get('http://localhost:5000', function (err, res, body) {
      res.statusCode.should.equal(200);
      done();
    });
  });
});

describe('when user goes to front page', function () {
  it('should contain citation lists', function (done) {
    request.get('http://localhost:5000', function (err, res, body) {
      body.should.containEql("List of articles");
      body.should.containEql("List of books");
      body.should.containEql("List of inproceedings");
      body.should.containEql("List of incollection");
      body.should.containEql("List of inbook");
      body.should.containEql("List of masterstheses");
      body.should.containEql("List of phdtheses");
	  body.should.containEql("List of techreports");
      body.should.containEql("List of conferences");
      body.should.containEql("List of unpublished");
      body.should.containEql("List of proceedings");
      body.should.containEql("List of booklets");
      body.should.containEql("List of manuals");
	  body.should.containEql("List of misc citations");
      done();
    });
  });
});

describe('when user requests bibtex file', function () {
  it('bibtex file is provided', function () {
    request.get('http://localhost:5000/references.bib', function (err, res, body) {
      res.statusCode.should.equal(200);
    });
  });
});

//Tests for article
describe('when user submits article', function () {
  it('server responds OK', function () {
    request.post('http://localhost:5000/submit', {
      form:{
        Format:'article',
        Author:'TestAuthor',
        Title:'TestTitle',
        Journal:'TestJournal',
        Volume:'1',
        Year:'2016',
        Pages:'12',
        Tags: "foo"
      }}, function(err,res,body){
        res.should.equal(200);
      });
  });
  it('article is saved into a file', function () {
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
      filelist.length.should.equal(1);
    });
  });
  it('article is found in listing', function() {
    request.get('http://localhost:5000/list', function(err, res, body) {
      body.should.containEql("article");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("volume");
      body.should.containEql("year");
      body.should.containEql("pages");
      body.should.containEql("tags");
    });
  });
  it('bibtex will have article', function() {
    request.get('http://localhost:5000/references.bib', function (err, res, body) {
      res.statusCode.should.equal(200);
      body.should.containEql("id");
      body.should.containEql("article");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("volume");
      body.should.containEql("year");
      body.should.containEql("pages");
    });
  });
});

//Tests for book
describe('when user submits book', function () {
  it('book is saved', function () {
    request.post('http://localhost:5000/submit', {
      form:{
        Format:'book',
        Author:'TestAuthor',
        Title:'TestTitle',
        Publisher:'TestPublisher',
        Year:'2016',
        Tags: "foo"
      }}, function(err,res,body){
        res.should.equal(200);
      });
  });
  it('book is saved into a file', function () {
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
      filelist.length.should.equal(1);
    });
  });
  it('book is found in listing', function() {
    request.get('http://localhost:5000/list', function(err, res, body) {
      body.should.containEql("book");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("publisher");
      body.should.containEql("year");
      body.should.containEql("tags");
    });
  });
  it('bibtex will have book', function() {
    request.get('http://localhost:5000/references.bib', function (err, res, body) {
      res.statusCode.should.equal(200);
      body.should.containEql("id");
      body.should.containEql("book");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("publisher");
      body.should.containEql("year");
    });
  });
});

//Tests for inproceedings
describe('when user submits inproceedings', function () {
  it('inproceedings is saved', function () {
    request.post('http://localhost:5000/submit', {
      form:{
        Format:'inproceedings',
        Author:'TestAuthor',
        Title:'TestTitle',
        Booktitle:'TestBooktitle',
        Year:'2016',
        Tags: "foo"
      }}, function(err,res,body){
        res.should.equal(200);
      });
  });
  it('inproceeding is saved into a file', function () {
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
      filelist.length.should.equal(1);
    });
  });
  it('inproceeding is found in listing', function() {
    request.get('http://localhost:5000/list', function(err, res, body) {
      body.should.containEql("inproceeding");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("booktitle");
      body.should.containEql("year");
      body.should.containEql("tags");
    });
  });
  it('bibtex will have inproceedings', function() {
    request.get('http://localhost:5000/references.bib', function (err, res, body) {
      res.statusCode.should.equal(200);
      body.should.containEql("id");
      body.should.containEql("inproceedings");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("booktitle");
      body.should.containEql("year");
    });
  });
});

//Tests for incollection
describe('when user submits incollection', function () {
  it('incollection is saved', function () {
    request.post('http://localhost:5000/submit', {
      form:{
        Format:'incollection',
        Author:'TestAuthor',
        Title:'TestTitle',
        Booktitle:'TestBooktitle',
	Publisher:'TestPublisher',
        Year:'2016',
        Tags: "foo"
      }}, function(err,res,body){
        res.should.equal(200);
      });
  });
  it('incollection is saved into a file', function () {
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
      filelist.length.should.equal(1);
    });
  });
  it('incollection is found in listing', function() {
    request.get('http://localhost:5000/list', function(err, res, body) {
      body.should.containEql("incollection");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("booktitle");
      body.should.containEql("publisher");
      body.should.containEql("year");
      body.should.containEql("tags");
    });
  });
  it('bibtex will have incollection', function() {
    request.get('http://localhost:5000/references.bib', function (err, res, body) {
      res.statusCode.should.equal(200);
      body.should.containEql("id");
      body.should.containEql("incollection");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.cońtainEql("booktitle");
      body.should.containEql("publisher");
      body.should.containEql("year");
    });
  });
});

//Tests for inbook
describe('when user submits inbook', function () {
  it('server responds OK', function () {
    request.post('http://localhost:5000/submit', {
      form:{
        Format:'inbook',
        Author:'TestAuthor',
        Title:'TestTitle',
        Publisher:'TestPublisher',
        Year:'2016',
        Pages:'12',
        Tags: "foo"
      }}, function(err,res,body){
        res.should.equal(200);
      });
  });
  it('inbook is saved into a file', function () {
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
      filelist.length.should.equal(1);
    });
  });
  it('inbook is found in listing', function() {
    request.get('http://localhost:5000/list', function(err, res, body) {
      body.should.containEql("inbook");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("publisher");
      body.should.containEql("year");
      body.should.containEql("pages");
      body.should.containEql("tags");
    });
  });
  it('bibtex will have article', function() {
    request.get('http://localhost:5000/references.bib', function (err, res, body) {
      res.statusCode.should.equal(200);
      body.should.containEql("id");
      body.should.containEql("inbook");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("publisher");
      body.should.containEql("year");
      body.should.containEql("pages");
    });
  });
});

//Tests for masterthesis
describe('when user submits mastersthesis', function () {
  it('server responds OK', function () {
    request.post('http://localhost:5000/submit', {
      form:{
        Format:'mastersthesis',
        Author:'TestAuthor',
        Title:'TestTitle',
        School:'TestSchool',
        Year:'2016',
        Tags: "foo"
      }}, function(err,res,body){
        res.should.equal(200);
      });
  });
  it('mastersthesis is saved into a file', function () {
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
      filelist.length.should.equal(1);
    });
  });
  it('mastersthesis is found in listing', function() {
    request.get('http://localhost:5000/list', function(err, res, body) {
      body.should.containEql("mastersthesis");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("school");
      body.should.containEql("year");
      body.should.containEql("tags");
    });
  });
  it('bibtex will have mastersthesis', function() {
    request.get('http://localhost:5000/references.bib', function (err, res, body) {
      res.statusCode.should.equal(200);
      body.should.containEql("id");
      body.should.containEql("mastersthesis");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("school");
      body.should.containEql("year");
    });
  });
});

//Tests for phdthesis
describe('when user submits phdthesis', function () {
  it('server responds OK', function () {
    request.post('http://localhost:5000/submit', {
      form:{
        Format:'phdthesis',
        Author:'TestAuthor',
        Title:'TestTitle',
        School:'TestSchool',
        Year:'2016',
        Tags: "foo"
      }}, function(err,res,body){
        res.should.equal(200);
      });
  });
  it('phdthesis is saved into a file', function () {
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
      filelist.length.should.equal(1);
    });
  });
  it('phdthesis is found in listing', function() {
    request.get('http://localhost:5000/list', function(err, res, body) {
      body.should.containEql("phdthesis");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("school");
      body.should.containEql("year");
      body.should.containEql("tags");
    });
  });
  it('bibtex will have phdthesis', function() {
    request.get('http://localhost:5000/references.bib', function (err, res, body) {
      res.statusCode.should.equal(200);
      body.should.containEql("id");
      body.should.containEql("phdthesis");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("school");
      body.should.containEql("year");
    });
  });
});

//Tests for techreport
describe('when user submits techreport', function () {
  it('server responds OK', function () {
    request.post('http://localhost:5000/submit', {
      form:{
        Format:'techreport',
        Author:'TestAuthor',
        Title:'TestTitle',
        Institution:'TestInstitution',
        Year:'2016',
        Tags: "foo"
      }}, function(err,res,body){
        res.should.equal(200);
      });
  });
  it('techreport is saved into a file', function () {
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
      filelist.length.should.equal(1);
    });
  });
  it('techreport is found in listing', function() {
    request.get('http://localhost:5000/list', function(err, res, body) {
      body.should.containEql("techreport");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("institution");
      body.should.containEql("year");
      body.should.containEql("tags");
    });
  });
  it('bibtex will have techreport', function() {
    request.get('http://localhost:5000/references.bib', function (err, res, body) {
      res.statusCode.should.equal(200);
      body.should.containEql("id");
      body.should.containEql("techreport");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("institution");
      body.should.containEql("year");
    });
  });
});

//Tests for conference
describe('when user submits conference', function () {
  it('server responds OK', function () {
    request.post('http://localhost:5000/submit', {
      form:{
        Format:'conference',
        Author:'TestAuthor',
        Title:'TestTitle',
        Booktitle:'TestBooktitle',
        Year:'2016',
        Tags: "foo"
      }}, function(err,res,body){
        res.should.equal(200);
      });
  });
  it('conference is saved into a file', function () {
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
      filelist.length.should.equal(1);
    });
  });
  it('conference is found in listing', function() {
    request.get('http://localhost:5000/list', function(err, res, body) {
      body.should.containEql("conference");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("booktitle");
      body.should.containEql("year");
      body.should.containEql("tags");
    });
  });
  it('bibtex will have conference', function() {
    request.get('http://localhost:5000/references.bib', function (err, res, body) {
      res.statusCode.should.equal(200);
      body.should.containEql("id");
      body.should.containEql("conference");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("booktitle");
      body.should.containEql("year");
    });
  });
});

//Tests for unpublished
describe('when user submits unpublished', function () {
  it('server responds OK', function () {
    request.post('http://localhost:5000/submit', {
      form:{
        Format:'unpublished',
        Author:'TestAuthor',
        Title:'TestTitle',
        Note:'TestNote',
        Tags: "foo"
      }}, function(err,res,body){
        res.should.equal(200);
      });
  });
  it('unpublished is saved into a file', function () {
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
      filelist.length.should.equal(1);
    });
  });
  it('unpublished is found in listing', function() {
    request.get('http://localhost:5000/list', function(err, res, body) {
      body.should.containEql("unpublished");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("note");
      body.should.containEql("tags");
    });
  });
  it('bibtex will have unpublished', function() {
    request.get('http://localhost:5000/references.bib', function (err, res, body) {
      res.statusCode.should.equal(200);
      body.should.containEql("id");
      body.should.containEql("unpublished");
      body.should.containEql("author");
      body.should.containEql("title");
      body.should.containEql("note");
    });
  });
});

//Tests for proceedings
describe('when user submits proceedings', function () {
  it('server responds OK', function () {
    request.post('http://localhost:5000/submit', {
      form:{
        Format:'proceedings',
        Title:'TestTitle',
        Year:'2016',
        Tags: "foo"
      }}, function(err,res,body){
        res.should.equal(200);
      });
  });
  it('proceedings is saved into a file', function () {
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
      filelist.length.should.equal(1);
    });
  });
  it('proceedings is found in listing', function() {
    request.get('http://localhost:5000/list', function(err, res, body) {
      body.should.containEql("proceedings");
      body.should.containEql("title");
      body.should.containEql("year");
      body.should.containEql("tags");
    });
  });
  it('bibtex will have proceedings', function() {
    request.get('http://localhost:5000/references.bib', function (err, res, body) {
      res.statusCode.should.equal(200);
      body.should.containEql("id");
      body.should.containEql("proceedings");
      body.should.containEql("title");
      body.should.containEql("year");
      body.should.containEql("note");
    });
  });
});

//Tests for booklet
describe('when user submits booklet', function () {
  it('server responds OK', function () {
    request.post('http://localhost:5000/submit', {
      form:{
        Format:'booklet',
        Title:'TestTitle',
        Tags: "foo"
      }}, function(err,res,body){
        res.should.equal(200);
      });
  });
  it('booklet is saved into a file', function () {
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
      filelist.length.should.equal(1);
    });
  });
  it('booklet is found in listing', function() {
    request.get('http://localhost:5000/list', function(err, res, body) {
      body.should.containEql("booklets");
      body.should.containEql("title");
      body.should.containEql("tags");
    });
  });
  it('bibtex will have booklet', function() {
    request.get('http://localhost:5000/references.bib', function (err, res, body) {
      res.statusCode.should.equal(200);
      body.should.containEql("id");
      body.should.containEql("booklet");
      body.should.containEql("title");
    });
  });
});

//Tests for manual
describe('when user submits manual', function () {
  it('server responds OK', function () {
    request.post('http://localhost:5000/submit', {
      form:{
        Format:'manual',
        Title:'TestTitle',
        Tags: "foo"
      }}, function(err,res,body){
        res.should.equal(200);
      });
  });
  it('manual is saved into a file', function () {
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
      filelist.length.should.equal(1);
    });
  });
  it('manual is found in listing', function() {
    request.get('http://localhost:5000/list', function(err, res, body) {
      body.should.containEql("manuals");
      body.should.containEql("title");
      body.should.containEql("tags");
    });
  });
  it('bibtex will have manual', function() {
    request.get('http://localhost:5000/references.bib', function (err, res, body) {
      res.statusCode.should.equal(200);
      body.should.containEql("id");
      body.should.containEql("manual");
      body.should.containEql("title");
    });
  });
});

//Tests for misc citation
describe('when user submits misc citation', function () {
  it('server responds OK', function () {
    request.post('http://localhost:5000/submit', {
      form:{
        Format:'misc',
        Tags: "foo"
      }}, function(err,res,body){
        res.should.equal(200);
      });
  });
  it('misc citation is saved into a file', function () {
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
      filelist.length.should.equal(1);
    });
  });
  it('misc citation is found in listing', function() {
    request.get('http://localhost:5000/list', function(err, res, body) {
      body.should.containEql("misc citation");
      body.should.containEql("tags");
    });
  });
  it('bibtex will have misc citation', function() {
    request.get('http://localhost:5000/references.bib', function (err, res, body) {
      res.statusCode.should.equal(200);
      body.should.containEql("id");
      body.should.containEql("misc");
    });
  });
});