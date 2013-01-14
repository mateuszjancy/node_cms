var app = app || {};

app.CmsContactView = Backbone.View.extend({
	tagName: "div",
	className: "contact",
	template: $("#contact-template").html(),

	initialize: function(){
		this.model.bind("change", this.render, this);
	},

	render: function(){
		var templ = _.template(this.template);
    	this.$el.html(templ({
      		contact: this.model.toJSON(),
    	}));
    	return this;
	}
});