
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , data = require('./routes/data');

var mongoose = require("mongoose");
var app = express();

mongoose.connect('mongodb://localhost/my_database');

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  //app.set("view options", {layout: false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/** Design 
 - single side application
 - 
*/

//HTML Index request 
app.get('/', routes.index);

//HTML Partials reguests
app.get('/links', data.links);
app.get('/pageByUrl', data.pageByUrl);
app.get('/page/:_id', data.page);
app.put('/page/:_id', data.savePage)
app.delete('/page/:_id', data.deletePage)
//JSON data requests

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
