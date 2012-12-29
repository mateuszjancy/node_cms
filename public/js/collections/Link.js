var app = app || {};

app.CmsLinkCollection = Backbone.Collection.extend({  
	model : app.CmsLink,
	url: '/links',

	comparator: function(link) {
  		return link.get("order");
  	}
});