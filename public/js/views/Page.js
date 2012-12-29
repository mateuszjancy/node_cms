var app = app || {};
//http://lostechies.com/derickbailey/2012/02/03/get-a-model-from-a-backbone-collection-without-knowing-if-the-collection-is-loaded/
app.CmsPageView= Backbone.View.extend({  
  tagName : "div",  
  className: "page",  
  template: $('#page-template').html(),
  id:"",

  events: {
    "click button.save-page-button": "savePage",
    "click button.cancel-page-button": "cancelPage",
    "click a.edit-page": "editPage",
	"click a.remove-page": "removePage"
  },
  
  render: function() {
  	console.log("->page view " , this.model);
    var templ = _.template(this.template);
    this.$el.html(templ(this.model.toJSON()));
    return this;
  },

  removePage: function(){
	app.cmsPageCollection.remove(this.model.id);
	this.model.destroy();
  },

  editPage: function(){
  	console.log("->setEdit");
  	$('#read-only-page-'+this.model.get('_id')).slideUp('slow');
  	$('#edit-page-'+this.model.get('_id')).slideDown('slow');
  },

  setReadOnly: function(){
  	console.log('->this.$el ', this.$el);
  	$('#read-only-page-'+this.model.get('_id')).fadeIn('fast');
  	$('#edit-page-'+this.model.get('_id')).fadeOut('slow');
  },

  savePage: function(e){
  	this.model.set({h1:this.$('input#h1').val()});
    this.model.set({p:this.$('input#p').val()});
  	this.model.set({pageUrl:this.$('input#pageUrl').val()});
    this.model.set({large: this.$('input#large').val()});

	  console.log("savePage ", this.model);
  	this.model.save();

  	this.render();
  	this.setReadOnly();
  },

  cancelPage: function(){
  	this.setReadOnly();
  }

});
