var app = app || {};
var ENTER_KEY = 13;
//http://www.adobe.com/devnet/html5/articles/backbone-cellar-pt2.html
$(function() {
    //_.templateSettings.interpolate = /\{\{(.+?)\}\}/g;

    _.templateSettings = {
        evaluate: /\{\{(.+?)\}\}/g,
        interpolate: /\{\{=(.+?)\}\}/g
    };

    app.cmsLinkCollection = new app.CmsLinkCollection();
    app.cmsPageCollection = new app.CmsPageCollection();
    app.cmsImageCollection = new app.CmsImageCollection();

	app.linkListView  = new app.LinkListView({model: app.cmsLinkCollection});
	app.linkListEditView  = new app.LinkListEditView({model: app.cmsLinkCollection});
	app.cmsPageListView  = new app.CmsPageListView({model: app.cmsPageCollection});
    app.imageListView = new app.CmsImageListView({model: app.cmsImageCollection});
    
	var appRouter = new app.AppRouter();
	Backbone.history.start();
});