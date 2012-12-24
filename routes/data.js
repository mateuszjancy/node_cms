var model = require('../domain/DomainModel');

exports.links = function(req, res){
	model.CmsLink.findAll(function(err, links){
		if(!err) res.send(links);
	});
};

exports.page = function(req, res){
	console.log(req.query.id);
  	model.CmsPage.findByPageUrl(req.query.id, function(err, page){
  		if(!err) res.send(page);
  	});

};