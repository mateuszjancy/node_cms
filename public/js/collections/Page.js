var app = app || {};

app.PageCollection = Backbone.Collection.extend({  
	model : app.Page,
	url: '/page/:id'
});