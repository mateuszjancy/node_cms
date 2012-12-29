var app = app || {};
//http://lostechies.com/derickbailey/2012/02/03/get-a-model-from-a-backbone-collection-without-knowing-if-the-collection-is-loaded/
app.CmsPageView= Backbone.View.extend({  
  tagName : "div",  
  className: "page",  
  template: $('#page-template').html(),

  initialize: function() {
    this.model.bind("change", this.modelChange, this);
  },

  modelChange: function(){
    console.log("->modelChange");
    this.render();
  },
  
  render: function() {
    console.log("->page view " , this.model);
    var templ = _.template(this.template);
    this.$el.html(templ(this.model.toJSON()));
    return this;
  }

});
