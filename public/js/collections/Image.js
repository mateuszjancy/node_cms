var app = app || {};

app.CmsImageCollection = Backbone.Collection.extend({
	model:  app.CmsImage,
	url: "/images"
});