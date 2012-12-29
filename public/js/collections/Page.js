var app = app || {};

app.CmsPageCollection = Backbone.Collection.extend({  
	model : app.CmsPage,
	url: '/page',

	comparator: function(page) {
  		return page.get("order");
  	}
});