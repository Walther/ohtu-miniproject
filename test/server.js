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

describe('when user submits article', function () {
  it('article is saved', function (done) {
    request.post('http://localhost:5000', {
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
    done();
  });
});

describe('when user submits book', function () {
  it('book is saved', function (done) {
    request.post('http://localhost:5000', {
      form:{
        Format:'book',
        Author:'TestAuthor',
        Title:'TestTitle',
        Publisher:'TestPublisher',
        Year:'2016'
      }}, function(err,res,body){
        res.should.equal(200);
      });
    done();
  });
});

describe('when user submits inproceedings', function () {
  it('inproceedings is saved', function (done) {
    request.post('http://localhost:5000', {
      form:{
        Format:'inproceedings',
        Author:'TestAuthor',
        Title:'TestTitle',
        Booktitle:'TestBooktitle',
        Year:'2016'
      }}, function(err,res,body){
        res.should.equal(200);
      });
    done();
  });
});


describe('when user requests bibtex file', function () {
  it('bibtex file is provided', function (done) {
    request.post('http://localhost:5000', {
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
    request.get('http://localhost:5000/references.bib', function (err, res, body) {
      res.statusCode.should.equal(200);
      body.should.containEql("article");
      body.should.containEql("TestTitle");
      body.should.containEql("TestJournal");
    });
    done();
  });
});