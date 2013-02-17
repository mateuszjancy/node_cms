var fs = require('fs');
var model = require('../domain/DomainModel');

exports.links = function(req, res){
	console.log("-> in links");
	model.CmsLink.findAll(function(err, links){
		if(!err) res.send(links);
	});
};

exports.pageByUrl = function(req, res){
  	model.CmsPage.findByPageUrl(req.query.pageUrl, function(err, page){
  		if(!err) res.send(page);
  	});
};

exports.page = function(req, res){
  	model.CmsPage.find({_id: req.params._id}, function(err, page){
  		if(!err) res.send(page[0]);
  	});
};

exports.savePage = function(req, res){
	if(req.params._id === '-1'){
		console.log("Save new page");
		var page = new model.CmsPage({
			pageUrl:req.body.pageUrl, 
			h1:req.body.h1, 
			p:req.body.p, 
			large: req.body.large,
			order: req.body.order,
			imagePath: req.body.imagePath,
			before: req.body.before
		});
		
		page.save(function(err, page){
			if(!err) res.send(page);
		});
	}else{
		console.log("savePage: update");
		var page = model.CmsPage.findOneAndUpdate(
			{_id: req.params._id}, 
			{
				pageUrl:req.body.pageUrl, 
				h1:req.body.h1, 
				p:req.body.p, 
				large: req.body.large,
				order: req.body.order,
				imagePath: req.body.imagePath,
				before: req.body.before
			}, 
			function(err, page){
				if(!err) res.send(page);
			}
		);
	}
};

exports.deletePage = function(req, res){
	model.CmsPage.remove({_id: req.params._id});
	res.send("ok");
};

exports.contact = function(req, res){
	console.log("in contact");
	model.CmsContact.find({}, function(err, contact){
		console.log("in contact find", contact);
		if(!err) res.send(contact[0]);
		else res.send(err);
	});
};

exports.deleteContact = function(req, res){
	mode.CmsContact.remove({_id:req.params._id});
	res.send("ok");
};

exports.saveContact = function(req, res){
	if(req.params._id === '-1'){
		var contact = new mode.CmsContact({
			motto: req.body.motto, 
			mail: req.body.mail,
  			companyName: req.body.companyName,
  			displayName: req.body.displayName,
  			git: req.body.git,
  			linked: req.body.linked,
  			stack: req.body.stack,
  			order: req.body.order
		})

		contact.save(function(err, savedContact){
			if(!err) res.send(savedContact);
		});
	}else{
		model.CmsContact.findOneAndUpdate({_id:req.params._id}, {
			motto: req.body.motto, 
			mail: req.body.mail,
  			companyName: req.body.companyName,
  			displayName: req.body.displayName,
  			git: req.body.git,
  			linked: req.body.linked,
  			stack: req.body.stack,
  			order: req.body.order
		}, function(err, savedContact){
			if(!err) res.send(savedContact);
		})
	}
}

exports.saveLink = function(req, res){
	if(req.params._id === '-1'){
		console.log("Save new link");
		var link = new model.CmsLink({
			pageUrl:req.body.label, 
			label:req.body.label,
			order:req.body.order
		});
		
		link.save(function(err, page){
			if(!err) res.send(link);
		});
	}else{
		console.log("saveLink: update");
		model.CmsLink.findOneAndUpdate({_id: req.params._id}, {
			label:req.body.label,
			order:req.body.order
		}, function(err, link){
				if(!err) res.send(link);
			}
		);
	}
};

exports.deleteLink = function(req, res){
	model.CmsLink.findOne({_id: req.params._id}, function(linkErr, linkToRemove){
  		if(!linkErr){
  			console.log("-> linkToRemove ", linkToRemove);
  			model.CmsPage.findByPageUrl(linkToRemove.pageUrl.toLowerCase(), function(pageErr, pages){
  				if(!pageErr) {
  					var page = {};
  					for(var i = 0; i < pages.length;i++){
  						page = pages[i];
  						page.pageUrl = "about";
  						page.save();
  					}

  					linkToRemove.remove();
  				}
  			});
  		}
  	});

  	res.send("ok");
};

exports.deleteImage = function(req, res){
	model.CmsImage.findOne({_id:req.params._id}, function(imageErr, imageToRemove){
		if(!imageErr){
			console.log("->image to remove ", imageToRemove);
			model.CmsPage.find({imagePath: imageToRemove.imagePath}, function(pageErr, pages){
				if(!pageErr){
					var page = {};

					for(var i=0; i<pages.length; i++){
						page = pages[i];
						page.imagePath = "";
						page.save();
					}
					imageToRemove.remove();
				}
			})
		}
	});
	res.send("ok");
};

exports.images = function(req, res){
	model.CmsImage.find(function(err, images){
		if(!err) res.send(images);
	})
};

exports.image = function(req, res){
	model.CmsImage.findOne({_id: req.params._id}, function(err, image){
		if(!err) res.send(image);
	})
};

exports.saveImage = function(req, res){
	console.log("->saveImage");
    var tmpPath = req.files.customImage.path;
    var imageName = req.files.customImage.name;
    var imagePath = '/img/custom/' + imageName;
    var targetPath = './public' + imagePath;


    fs.rename(tmpPath, targetPath, function(err) {
        if (err) throw err;
        fs.unlink(tmpPath, function() {
            if (err) throw err;

            var image = new model.CmsImage({name:imageName, imagePath:imagePath});
			image.save(function(err, image){
				if(!err) res.send(image);
			});
        });
    });
};

