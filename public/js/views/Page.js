var app = app || {};
//http://lostechies.com/derickbailey/2012/02/03/get-a-model-from-a-backbone-collection-without-knowing-if-the-collection-is-loaded/
app.CmsPageView= Backbone.View.extend({  
  tagName : "div",  
  className: "page",  

  template: $('#page-template').html(),
  
  render: function() {

    var templ = _.template(this.template);
    console.log("page ", this.model.toJSON());
    this.$el.html(templ(this.model.toJSON()));
    return this;
  }
});