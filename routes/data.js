var model = require('../domain/DomainModel');

exports.links = function(req, res){
	model.CmsLink.findAll(function(err, links){
		if(!err) res.send(links);
	});
};

exports.pageByUrl = function(req, res){
	console.log(req.query.pageUrl.toLowerCase());
  	model.CmsPage.findByPageUrl(req.query.pageUrl.toLowerCase(), function(err, page){
  		if(!err) res.send(page);
  	});
};

exports.page = function(req, res){
	console.log(req.params._id);
  	model.CmsPage.find({_id: req.params._id}, function(err, page){
  		if(!err) res.send(page[0]);
  	});
};

exports.savePage = function(req, res){
	if(req.params._id === '-1'){
		console.log("Save new page");
		var page = new model.CmsPage({pageUrl:req.body.pageUrl, h1:req.body.h1, p:req.body.p});
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
				p:req.body.p
			}, 
			function(err, page){
				if(!err) res.send(page);
			}
		);
	}
};

exports.deletePage = function(req, res){
	model.CmsPage.remove({_id: req.params._id}, function(err){
		if(!err) res.send("ok");
	});
}