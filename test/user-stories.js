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
        Pages:'12'
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

describe('when user submits book', function () {
  it('book is saved', function () {
    request.post('http://localhost:5000/submit', {
      form:{
        Format:'book',
        Author:'TestAuthor',
        Title:'TestTitle',
        Publisher:'TestPublisher',
        Year:'2016'
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

describe('when user submits inproceedings', function () {
  it('inproceedings is saved', function () {
    request.post('http://localhost:5000/submit', {
      form:{
        Format:'inproceedings',
        Author:'TestAuthor',
        Title:'TestTitle',
        Booktitle:'TestBooktitle',
        Year:'2016'
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
