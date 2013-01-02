
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , data = require('./routes/data')
  , user = require('./routes/user')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy
  , mongoose = require("mongoose");


mongoose.connect('mongodb://localhost/my_database');


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  user.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
      user.findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid data' }); }
        return done(null, user);
      })
    });
  }
));


var app = express();
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  //app.set("view options", {layout: false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({
    uploadDir:'./upload'
  }));
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  //Passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/** Design 
 - single side application
*/

//Bootstrap
user.createAdminUser();


//HTML Index request 

app.get('/', routes.index);

//HTML Partials reguests
app.get('/links', data.links);
//app.get('/links', function(req, res){res.send("ok")});
app.get('/pageByUrl', data.pageByUrl);
//app.get('/page/:_id', data.page);
app.put('/page/:_id', ensureAuthenticated, data.savePage);
app.delete('/page/:_id', ensureAuthenticated, data.deletePage);

//links
app.put('/link/:_id', ensureAuthenticated, data.saveLink);
app.delete('/link/:_id', ensureAuthenticated, data.deleteLink);

//Image
app.post('/updaload/image', ensureAuthenticated, data.saveImage);
app.get('/images', data.images);
app.post('/image/:_id', ensureAuthenticated, data.image);
app.delete('/image/:_id', ensureAuthenticated, data.deleteImage);

//User
app.get('/login', user.login);

app.post(
  '/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: false }),
  routes.indexRedirect
);

app.get('/logout', user.logout);

//JSON data requests

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  console.log("-> ensureAuthenticated", req);
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}