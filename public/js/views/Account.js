var app = app || {};

app.CmsAccountEditView = Backbone.View.extend({
	tagName: "div",
	className: "account",
	template: $("#edit-account-template").html(),

	events: {
    	"click #account-save": "save",
	    "change input": "fieldChanged"
  	},

  	fieldChanged: function(e){
    	var field = $(e.currentTarget);
    	var data = {};
  
    	data[field.attr('id')] = field.val();
    	this.model.set(data);
  	},

	save: function(){
		console.log("save");
		this.model.save();
	},

	render: function(){
		var templ = _.template(this.template);
    	this.$el.html(templ({
      		account: this.model.toJSON(),
    	}));
    	return this;
	}
});