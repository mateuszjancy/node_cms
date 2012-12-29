var app = app || {};

app.CmsImageListView = Backbone.View.extend({
	tagName: "div",

	initialize: function() {
    	this.model.bind("reset", this.render, this);
    	this.model.bind("add", this.render, this);
    	this.model.bind("remove", this.render, this);
  	},

  	render: function() { 
  		$(this.el).html("");   
	    _.each(this.model.models, function (image) {
	    	console.log("->image ", image);
      		$(this.el).append(new app.CmsImageView({model:image}).render().el);
    	}, this);
    	return this;
  }
});