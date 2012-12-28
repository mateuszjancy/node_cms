var app = app || {};
//http://stackoverflow.com/questions/11130856/saving-entries-to-database-relationship-many-to-many-table-from-a-backbone-pro
//http://stackoverflow.com/questions/4074636/can-i-bind-form-inputs-to-models-in-backbone-js-without-manually-tracking-blur-e
app.CmsEditPageView= Backbone.View.extend({  
  tagName : "div",  
  className: "edit-page",  
  
  template: $('#edit-page-template').html(),

  events: {
    "click button#save-page-button": "savePage"
  },

  initialize: function() {  
   	//this.model.bind("change", this.render, this);
  },

  modelChanged: function(){
  	console.log("->new model: ", this.model.toJSON());
  	return this.render();
  },

  savePage: function(e){
  	this.model.set({h1:this.$('input#h1').val()});
    this.model.set({p:this.$('input#p').val()});
  	this.model.set({pageUrl:this.$('input#pageUrl').val()});

	  console.log("savePage ", this.model);
  	this.model.save();

    this.$el.html("");
    
    $('#page-container').html("");
    app.cmsPageCollection.reset();
    app.cmsPageCollection.fetch({data: { pageUrl:this.model.get('pageUrl')}, url: 'pageByUrl'});

    return this;
  },
  
  render: function() {

    var templ = _.template(this.template);
    console.log("->render-edit-page ", this.model.toJSON());
    this.$el.html(templ(this.model.toJSON()));
    return this;
  }
});