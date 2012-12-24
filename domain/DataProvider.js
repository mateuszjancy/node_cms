//Tutorial on 
//->http://addyosmani.github.com/backbone-fundamentals/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var CmsPage = new Schema({
  pageUrl: String,
  h1:String,
  p:String,
  img:String,
  order: Number,
  large: Boolean
});

var CmsLink = new Schema({
		label:String, 
		pageUrl: String,
		order: Number
});

CmsLink.statics.findAll = function (callback) {
  return this.find(callback);
}

CmsPage.statics.findByUrl = function (pageUrl, callback) {
  return this.find({ pageUrl: pageUrl}, callback);
}

var CmsLink = mongoose.model("CmsLink", CmsLink);
var CmsPage = mongoose.model("CmsPage", CmsPage);

//Connection
mongoose.connect('mongodb://localhost/my_database');

//UseCase
var link = new CmsLink({label:"Contact", pageUrl:"contact", order: 1});
console.log(link.label);
link.save();


CmsLink.find(function(err, links){
	if(!err) console.log(links);
});

var page = new CmsPage({pageUrl:"contact", h1:"test contact h1", p:"test contact p"});
page.save();
CmsPage.findByUrl(link.pageUrl, function(err, pages){
	if(!err) console.log(pages);
});