var app = app || {};

app.CmsLinkView= Backbone.View.extend({  
  tagName: "li",

  //className: "menu-item nav",
  
  template: $('#menu-item-template').html(),

   events: {
    "click button.save-link-button": "saveLink",
    "click button.cancel-link-button": "cancelLink",
    "click a.edit-link": "editLink"
  },

  cancelLink: function(){
  	console.log("-> cancel link");
  },

  saveLink: function(){
  	console.log("->save link");
  	this.model.set({label:this.$('input#label').val()});
  	this.model.save();

  	//this.render();
  	this.readOnlyLink();
  },

  editLink: function(){
  	console.log("->edit link");
  	
  	$('#read-only-link-'+this.model.get('_id')).slideUp('slow');
  	$('#edit-link-'+this.model.get('_id')).slideDown('slow');
  },

  readOnlyLink: function(){
  	console.log("->read only link");

  	$('#read-only-link-'+this.model.get('_id')).fadeIn('fast');
  	$('#edit-link-'+this.model.get('_id')).fadeOut('slow');	
  },

  render: function() {
    var templ = _.template(this.template);
    console.log("model to json: ", this.model.toJSON());
    this.$el.html(templ(this.model.toJSON()));
    return this;
  }
});