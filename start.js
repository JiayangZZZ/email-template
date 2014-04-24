/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , requirejs = require('requirejs')
  , fs = require('fs')
  , acceptLanguage = require('accept-language');

/**
 * Express app.
 */

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname));

/**
 * RequireJS
 */

requirejs.config({
  baseUrl : __dirname,
  nodeRequire : require
});

/**
 * Template
 */

var tmpl = requirejs("template/tmpl.js");
/**
 * Set language properties
 */

acceptLanguage.default({
  code : 'en',
  region : 'US'
});
acceptLanguage.codes(['en', 'zh']);

app.get('/', function(req, res) {
  var language = acceptLanguage.parse(req.get('Accept-Language'));
  res.send(tmpl.html());
});

http.createServer(app).listen(app.get('port'),function() {
  console.log('Server started on port: ' + app.get('port'));
});



