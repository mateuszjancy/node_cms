var app = app || {};

app.CmsImageView = Backbone.View.extend({
	tagName: "div",

	template: $('#image-template').html(),

	render: function() {
    	var templ = _.template(this.template);
    	console.log("model to json: ", this.model.toJSON());
    	this.$el.html(templ(this.model.toJSON()));
    	return this;
  	}

});