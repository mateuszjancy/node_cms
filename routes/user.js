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
		if(!err && user===null){
			var adminUser = new model.CmsUser({
  				username: 'admin', 
	  			password: 'Pa$$w0rd', 
  				mail: 'cms@node.js'
			});
			console.log("-> admin user", adminUser);
			adminUser.save();
		}else{
			console.log("->err", err);
		}
	})
};


exports.createContactPage = function(){
	model.CmsContact.findOne(function(err, contact){
		if(!err && contact == null){
			var newContact = new model.CmsContact({
				motto: "I know how to walk... now I want to know how to fly",
  				mail: "mateusz.jancy@gmail.com",
  				companyName: "Mateusz Jancy Systems",
  				displayName: "Mateusz Jancy Systems",
  				git: "https://github.com/mateuszjancy/",
  				linked: "",
  				stack: "http://stackoverflow.com/users/1269826/matusz",
  				order: 0
			});
			newContact.save();
		}else{
			contact.motto = "I know how to walk... now I want to know how to fly",
  			contact.mail = "mateusz.jancy@gmail.com",
  			contact.companyName = "Mateusz Jancy Systems",
  			contact.displayName = "Mateusz Jancy Systems",
  			contact.git = "https://github.com/mateuszjancy/",
  			contact.linked = "",
  			contact.stack = "http://stackoverflow.com/users/1269826/matusz",
  			contact.order = 0
  			contact.save();
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
