var app = app || {};

app.LinkListEditView = Backbone.View.extend({
  tagName: "div",
  //className: "nav",

  events: {
    "click #add-menu-item": "addMenuItem"
  },
  
  initialize: function() {
    this.model.bind("remove", this.removeLink, this);
    this.model.bind("add", this.addLink, this);
  },

  addLink: function(){
    console.log("-> LinkListEditView addLink");
    $(this.el).html("");
    this.render();
  },


  addMenuItem: function(){
    console.log("->addMenuItem");
  },


  removeLink: function(){
    console.log("-> LinkListEditView removeLink");
    $(this.el).html("");
    this.render();
  },

  render: function() {    
    $(this.el).html("");
    _.each(this.model.models, function (link) {
      $(this.el).append(new app.CmsLinkEditView({model:link}).render().el);
    }, this);
    return this;
  }
});