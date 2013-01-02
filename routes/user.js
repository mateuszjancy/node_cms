var model = require('../domain/DomainModel');
var CREATE_USER_ALLOWED = true;

exports.login = function(req, res){
  res.render('login', { user: req.user, message: 'error' })
};

exports.logout = function(req, res){
	req.logout();
  	res.redirect('/');
};

exports.createUser = function(req, res){
  var model = new model.CmsUser({
  	username: req.body.username,
  	password: req.body.password
  })

  model.save(function(err, user){
  	if(!err) res.send(user);
  });
};

exports.findById = function(id, callback){
	model.CmsUser.findOne({_id:id}, function(err, user){
		if(!err){
			callback(null, user);	
		}else {
			callback(null, null);
		}
	})
};

exports.findByUsername = function(username, callback){
	model.CmsUser.find({username:username}, function(err, users){
		if(!err && users.length == 1){
			callback(null, users[0]);
		}else{
			callback(null, null);
		}
	})
};

exports.createAdminUser = function(){
	model.CmsUser.findOne({username:'admin'}, function(err, user){
		console.log("->in createAdminUser", user);
		if(!err && user == null){
			var adminUser = new model.CmsUser({
  				username: 'admin', 
	  			password: 'password', 
  				mail: 'mat@jan.it'
			});
			console.log("-> admin user", adminUser);
			adminUser.save();
		}	
	})
};