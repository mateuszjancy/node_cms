var app = app || {};

app.CmsPageCollection = Backbone.Collection.extend({  
	model : app.CmsPage,
	url: '/page',

	findByUrl: function(pUrl, callback){
		that = this;
		app.pageModel = new app.CmsPage();
		app.pageModel.pageUrl = pUrl;
		return  app.pageModel.fetch();
	}
});