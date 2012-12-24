var app = app || {};

app.CmsLinkCollection = Backbone.Collection.extend({  
	model : app.CmsLink,
	url: '/links'
});