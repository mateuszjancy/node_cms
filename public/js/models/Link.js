var app = app || {};

app.CmsLink = Backbone.Model.extend({  
	defaults: {  
      	label:"", 
		pageUrl: "",
		order: 0,
		_id: -1,
    },
    idAttribute: '_id',
    urlRoot: '/link'
}); 