//http://stackoverflow.com/questions/6262444/get-collection-id-in-backbone-without-loading-the-entire-collection
//http://coenraets.org/blog/2011/12/backbone-js-wine-cellar-tutorial-part-1-getting-started/
var app = app || {};

app.AppRouter = Backbone.Router.extend({
	routes: {
		"":"list",
		"page/:id":"pageDetails",
		"create/page":"createPage"
	},

	list: function(){
		app.linkListView  = new app.LinkListView({model: app.cmsLinkCollection});
		app.cmsLinkCollection.fetch();

		$("#menu-container").html(app.linkListView.render().el);
	},

	pageDetails: function(pUrl){
		app.cmsPageListView  = new app.CmsPageListView({model: app.cmsPageCollection});
		app.cmsPageCollection.reset();
		//TODO: cannot find good way for REST
		app.cmsPageCollection.fetch({data: { id:pUrl } });

		$('#page-container').html(app.cmsPageListView.render().el);
	}

	createPage: function(){

	}
});