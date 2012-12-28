var app = app || {};
//http://lostechies.com/derickbailey/2012/02/03/get-a-model-from-a-backbone-collection-without-knowing-if-the-collection-is-loaded/
app.CmsPageListView= Backbone.View.extend({  
  tagName : "div",  
  className: "page-container",  
  
  render: function() {
    $(this.el).append(new app.CmsPageView({model:link}).render().el);
    return this;
  }
});