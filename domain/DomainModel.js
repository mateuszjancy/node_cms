var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CmsUser = new Schema({
  username: String, 
  password: String, 
  mail: String,
  companyName: String,
  displayName: String,
  git: String,
  linked: String,
  stack: String
});

var CmsContact = new Schema({
  mail: String,
  companyName: String,
  displayName: String,
  git: String,
  linked: String,
  stack: String
});

var CmsPage = new Schema({
  pageUrl: String,
  h1:String,
  p:String,
  imagePath:String,
  order: Number,
  large: Boolean,
  before: Boolean
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
exports.CmsContact = mongoose.model("CmsContact", CmsContact);