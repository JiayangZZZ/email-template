/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , requirejs = require('requirejs')
  , fs = require('fs')
  , acceptLanguage = require('accept-language')
  , tos = {
      'zh' : fs.readFileSync(__dirname + '/content/zh-CN/tos.html', 'utf8'),
      'en' : fs.readFileSync(__dirname + '/content/en-US/tos.html', 'utf8')
    };

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

global.tmpl = requirejs('./public/templates/tmpl');

/**
 * Set language properties
 */

acceptLanguage.default({
  code : 'en',
  region : 'US'
});
acceptLanguage.codes(['en', 'zh']);

app.get('/about/terms', function(req, res) {
  var language = acceptLanguage.parse(req.get('Accept-Language'));
  res.send(tmpl.html({
    title : gt('STREETSTYLE__INVALID_WEIBO_USERNAME'),
    locale : language[0].code,
    content : tos[language[0].code]
  }));
});

http.createServer(app).listen(app.get('port'),function() {
  console.log('Server started on port: ' + app.get('port'));
});
