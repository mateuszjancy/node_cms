//Tutorial on 
//->http://addyosmani.github.com/backbone-fundamentals/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Page = new Schema({
  URL: String,
  h1:String,
  p:String,
  img:String,
  order: Number,
  large: Boolean
});

var Link = new Schema({
		label:String, 
		URL: String,
		order: Number
});

Link.statics.findAll = function (callback) {
  return this.find(callback);
}

Page.statics.findByUrl = function (url, callback) {
  return this.find({ URL: url}, callback);
}

var Link = mongoose.model("Link", Link);
var Page = mongoose.model("Page", Page);

//Connection
mongoose.connect('mongodb://localhost/my_database');

//UseCase
var link = new Link({label:"About", URL:"about", order: 1});
console.log(link.label);
link.save();


Link.find(function(err, links){
	if(!err) console.log(links);
});

var page = new Page({URL:"about", h1:"test h1"});
page.save();
Page.findByUrl(link.URL, function(err, pages){
	if(!err) console.log(pages);
});