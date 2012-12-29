var app = app || {};

app.LinkListView = Backbone.View.extend({
  tagName: "ul",
  className: "nav",
  
  initialize: function() {
    this.model.bind("reset", this.render, this);
    this.model.bind("remove", this.render, this);
    this.model.bind("add", this.render, this);
  },

  render: function() {    
    $(this.el).html("");
    _.each(this.model.models, function (link) {
      $(this.el).append(new app.CmsLinkView({model:link}).render().el);
    }, this);
    return this;
  }
});