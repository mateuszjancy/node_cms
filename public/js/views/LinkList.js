var app = app || {};

app.LinkListView = Backbone.View.extend({
  tagName: "ul",
  className: "nav",
  
  initialize: function() {
    this.model.bind("reset", this.resetLink, this);
    this.model.bind("add", this.renderAdd, this);
  },

  renderAdd: function(){
    console.log("-> renderAdd");
    $(this.el).html("");
    this.render();
  },


  resetLink: function(){
    console.log("-> resetLink");
    $(this.el).html("");
    this.render();
  },

  render: function() {    
    _.each(this.model.models, function (link) {
      $(this.el).append(new app.CmsLinkView({model:link}).render().el);
    }, this);
    return this;
  }
});