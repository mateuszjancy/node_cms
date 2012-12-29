var app = app || {};

app.CmsLinkView= Backbone.View.extend({  
  tagName: "li",

  //className: "menu-item nav",
  
  template: $('#menu-item-template').html(),

  initialize: function() {
    this.model.bind("change", this.modelChange, this);
  },

  modelChange: function(){
    console.log("->modelChange");
    this.render();
  },

  render: function() {
    var templ = _.template(this.template);
    console.log("model to json: ", this.model.toJSON());
    this.$el.html(templ(this.model.toJSON()));
    return this;
  }
});