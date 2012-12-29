var app = app || {};

app.CmsImage = Backbone.Model.extend({
	defaults:{
		name: "",
		imagePath:""
	},
	idAttribute: '_id',
	urlRoot: "/image"
})