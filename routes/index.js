
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.indexRedirect = function(req, res){
  res.redirect('index', { title: 'Express' });
};