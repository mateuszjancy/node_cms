var app = app || {};

app.LinkListView = Backbone.View.extend({
  tagName: "ul",
  
  initialize: function() {
    this.model.bind("reset", this.render, this);
  },

  render: function() {
    _.each(this.model.models, function (link) {
      $(this.el).append(new app.CmsLinkView({model:link}).render().el);
    }, this);
    return this;
  }
});