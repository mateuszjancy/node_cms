var model = require('../domain/DomainModel');

exports.links = function(req, res){
	model.Link.findAll(function(err, links){
		if(!err) res.send(links);
	});
};

exports.page = function(req, res){
  	model.Page.findByUrl(req.params.url, function(err, page){
  		if(!err) res.send(page);
  	});

};