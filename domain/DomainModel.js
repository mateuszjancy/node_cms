var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CmsUser = new Schema({
  username: String, 
  password: String, 
  mail: String
});

var CmsPage = new Schema({
  pageUrl: String,
  h1:String,
  p:String,
  imagePath:String,
  order: Number,
  large: Boolean
});

var CmsLink = new Schema({
		label:String, 
		pageUrl: String,
		order: Number
});

var CmsImage = new Schema({
  name: String,
  imagePath: String
});

CmsLink.statics.findAll = function (callback) {
  return this.find(callback);
}

CmsPage.statics.findByPageUrl = function (pageUrl, callback) {
  return this.find({ pageUrl: pageUrl}, callback).sort('-order');
}

exports.CmsLink = mongoose.model("CmsLink", CmsLink);
exports.CmsPage = mongoose.model("CmsPage", CmsPage);
exports.CmsImage = mongoose.model("CmsImage", CmsImage);
exports.CmsUser = mongoose.model("CmsUser", CmsUser);