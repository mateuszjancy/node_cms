var app = app || {};

app.LinkListEditView = Backbone.View.extend({
  tagName: "div",
  //className: "nav",
  
  initialize: function() {
    this.model.bind("remove", this.render, this);
    this.model.bind("add", this.render, this);
  },
  
  render: function() {    
    $(this.el).html("");
    _.each(this.model.models, function (link) {
      $(this.el).append(new app.CmsLinkEditView({model:link}).render().el);
    }, this);
    return this;
  }
});