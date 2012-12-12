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

exports.Link = mongoose.model("Link", Link);
exports.Page = mongoose.model("Page", Page);