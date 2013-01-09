//http://stackoverflow.com/questions/6262444/get-collection-id-in-backbone-without-loading-the-entire-collection
//http://coenraets.org/blog/2011/12/backbone-js-wine-cellar-tutorial-part-1-getting-started/
var app = app || {};
var PAGE_URL = "";

app.AppRouter = Backbone.Router.extend({
	routes: {
		"":"list",
		"main": "main", 
		"pageByUrl/:id":"pageByUrlDetails",
		"create/page":"createPage",
		"manage/page/:id": "managePage",
		"remove/page/:id": "removePage",
		//Links
		"manage/menu":"manageMenu",
		"add/menu": "addMenu",
		"remove/menu/:id": "removeMenu",
		//Image
		"manage/image": "manageImage",
		"remove/image/:id": "removeImage",

	},

	main: function(){

	},

	list: function(){
		app.cmsLinkCollection.fetch({
			success: function(){
				if(app.cmsLinkCollection.models.length>0){
					PAGE_URL = app.cmsLinkCollection.models[0].get('pageUrl');
					app.cmsPageListView  = new app.CmsPageListView({model: app.cmsPageCollection});
					app.cmsPageCollection.reset();
					app.cmsPageCollection.fetch({data: { pageUrl:PAGE_URL}, url: 'pageByUrl'});

					$('#page-container').html(app.cmsPageListView.render().el);
				}
			}
		});

		$('#edit-page-container').html("");
		$("#menu-container").html(app.linkListView.render().el);
	},

	//z 8/36 a
	pageByUrlDetails: function(pUrl){
		app.cmsPageCollection.reset();
		PAGE_URL = pUrl;
		app.cmsPageCollection.fetch({data: { pageUrl:PAGE_URL }, url: 'pageByUrl'});

		$('#page-container').html(app.cmsPageListView.render().el);
	},

	createPage: function(){
		app.cmsPageCollection.add(new app.CmsPage({h1:"new article", pageUrl: PAGE_URL}));
	},

	manageMenu: function(){
		console.log("->manageMenu");
		$("#menu-management-container").html(app.linkListEditView.render().el);
		$('#menu-managemant').modal();
		this.navigate("#main", {trigger: false, replace: true});
	},

	addMenu: function(){
		app.cmsLinkCollection.add(new app.CmsLink({label: "new link"}));
		this.navigate("#main", {trigger: false, replace: true});
	},

	removeMenu: function(id){
		var linkModel = app.cmsLinkCollection.get(id)	
		app.cmsLinkCollection.remove(id);
	 	linkModel.destroy();
	},

	managePage: function(id){
		app.cmsImageCollection.fetch({
			success: function(){
				var pageModel = app.cmsPageCollection.get(id);
				var pageView = new app.CmsPageEditView({model: pageModel});
				pageView.imagesModel = app.cmsImageCollection;
		

				$("#page-management-container").html(pageView.render().el);
				$('#page-managemant').modal();		
			}
		});
		
		this.navigate("#main", {trigger: false, replace: true});
	},

	removePage: function(id){
		var pageModel = app.cmsPageCollection.get(id);
		app.cmsPageCollection.remove(id);
		pageModel.destroy();
	},

	removeImage: function(id){
		console.log("->app.cmsImageCollection ", app.cmsImageCollection);
		var imageModel = app.cmsImageCollection.get(id);
		console.log("->imageModel ", imageModel);
		app.cmsImageCollection.remove(id);
		imageModel.destroy();
	},

	manageImage: function(){
		app.cmsImageCollection.fetch();
		$("#image-management-container").html(app.imageListView.render().el);

		$('#image-managemant').modal();
		$("#image-management-container-send").on("click", function() {
			console.log("-> image-management-container-send click");
			var form = $("#image-management-container-form");
    		$.ajax('/updaload/image', {
        		files: form.find(":file"),
        		iframe: true
    		}).complete(function(data) {
        		form.find(":file").val("");
        		var response = jQuery.parseJSON(data.responseText);
        		app.cmsImageCollection.add(new app.CmsImage(response));
    		});
		});
		this.navigate("#main", {trigger: false, replace: true});
	},
	/*
	createLink: function(){
		app.cmsLinkCollection.add(new app.CmsLink({label: "new link"}));
	},
	*/

	//------------------------------------------------------------------
	//TODO: example howto flush model from server
	editPage_old: function(id, pUrl){
		var pageModel = new app.CmsPage({_id: id, editMode:true});
		
		var editPage = new app.CmsPageView({
			model: pageModel, 
			currentPageUrl: PAGE_URL
		});

		pageModel.fetch({
			success: function(model, resp, options){
				//editPage.render();
				$('#page-container').html(editPage.render().el);
			}
		});
	},


	
});