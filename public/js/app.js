var app = app || {};
var ENTER_KEY = 13;
//http://www.adobe.com/devnet/html5/articles/backbone-cellar-pt2.html
$(function() {
    _.templateSettings.interpolate = /\{\{(.+?)\}\}/g;
    app.cmsLinkCollection = new app.CmsLinkCollection();
    app.cmsPageCollection = new app.CmsPageCollection();

	app.linkListView  = new app.LinkListView({model: app.cmsLinkCollection});
    app.cmsPageListView  = new app.CmsPageListView({model: app.cmsPageCollection});
    
	var appRouter = new app.AppRouter();
	Backbone.history.start();
});