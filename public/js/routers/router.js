//http://stackoverflow.com/questions/6262444/get-collection-id-in-backbone-without-loading-the-entire-collection
var app = app || {};

app.AppRouter = Backbone.Router.extend({
	routes: {
		"":"list",
		"page/:id":"pageDetails"
	},

	list: function(){
		app.linkListView  = new app.LinkListView({model: app.cmsLinkCollection});
		app.cmsLinkCollection.fetch();

		$("#menu-container").html(app.linkListView.render().el);
	},

	pageDetails: function(pUrl){
		app.cmsPageListView  = new app.CmsPageListView({model: app.cmsPageCollection});
		app.cmsPageCollection.reset();
		app.cmsPageCollection.fetch({data: { id:pUrl } });

		$('#page-container').html(app.cmsPageListView.render().el);
	}
});