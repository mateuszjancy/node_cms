var app = app || {};
//http://lostechies.com/derickbailey/2012/02/03/get-a-model-from-a-backbone-collection-without-knowing-if-the-collection-is-loaded/
app.CmsPageListView= Backbone.View.extend({  
  tagName : "div",  
  className: "page-container",  

  initialize: function() {
    this.model.bind("reset", this.render, this);
    this.model.bind("remove", this.render, this);
    this.model.bind("add", this.render, this);
  },
  
  render: function() {
    console.log("->model:page", this.model.models);
    $(this.el).html("");
    _.each(this.model.models, function (page) {
      $(this.el).append(new app.CmsPageView({model:page}).render().el);
    }, this);
    return this;
  }
});