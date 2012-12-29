var app = app || {};
//http://lostechies.com/derickbailey/2012/02/03/get-a-model-from-a-backbone-collection-without-knowing-if-the-collection-is-loaded/
app.CmsPageListView= Backbone.View.extend({  
  tagName : "div",  
  className: "page-container",  

  initialize: function() {
    this.model.bind("reset", this.pageListReset, this);
   	this.model.bind("remove", this.removePage, this);
    this.model.bind("add", this.addPage, this);
  },

  addPage: function(){
    console.log("->Add page");
    $(this.el).html("");
    this.render();
  },

  removePage: function(){
    console.log("->remove");
    $(this.el).html("");
    this.render();
  },

  pageListReset: function(){
    console.log("->pageListReset");
    $(this.el).html("");
    this.render();
  },
  
  render: function() {
    _.each(this.model.models, function (page) {
      $(this.el).append(new app.CmsPageView({model:page}).render().el);
    }, this);
    return this;
  }
});