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

CmsPage.statics.findByPageUrl = function (pageUrl, callback) {
  return this.find({ pageUrl: pageUrl}, callback);
}

exports.CmsLink = mongoose.model("CmsLink", CmsLink);
exports.CmsPage = mongoose.model("CmsPage", CmsPage);