var server = require('../server.js');
var assert = require('assert');
var http   = require('http');

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
    http.get('http://localhost:5000', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
