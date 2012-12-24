var app = app || {};
//http://lostechies.com/derickbailey/2012/02/03/get-a-model-from-a-backbone-collection-without-knowing-if-the-collection-is-loaded/
app.CmsPageListView= Backbone.View.extend({  
  tagName : "div",  
  className: "page-container",  

  initialize: function() {
   	this.model.bind("reset", this.render, this);
  },
  
  render: function() {
    
    _.each(this.model.models, function (link) {
      $(this.el).append(new app.CmsPageView({model:link}).render().el);
    }, this);
    return this;
  }
});