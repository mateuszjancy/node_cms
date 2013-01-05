
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' , isAuthenticated: req.isAuthenticated()});
};

exports.indexRedirect = function(req, res){
  res.redirect('/');
};