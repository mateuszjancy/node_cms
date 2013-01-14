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
	  			password: 'Pa$$w0rd', 
  				mail: 'cms@node.js'
			});
			console.log("-> admin user", adminUser);
			adminUser.save();
		}	
	})
};


exports.createContactPage = function(){
	model.CmsContact.findOne(function(err, contact){
		console.log("->in createContactPage", contact);
		if(!err && contact == null){
			var newContact = new model.CmsContact({
				motto: "motto",
  				mail: "mail",
  				companyName: "companyName",
  				displayName: "displayName",
  				git: "git",
  				linked: "linked",
  				stack: "stack",
  				order: 0
			});
			console.log("-> newContact", newContact);
			newContact.save();
		}	
	})
};


exports.saveAccount = function(req, res){
	if(CREATE_USER_ALLOWED === true){
		model.CmsUser.findOne({username:'admin'}, function(err, user){
			if(!err && user != null && req.body.oldPassword === user.password){
  				user.username = req.body.username, 
	  			user.password = req.body.password, 
  				user.mail = req.body.mail
				user.save();
			}	
		});
	}
}
