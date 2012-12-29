var app = app || {};

app.CmsLinkEditView= Backbone.View.extend({  
  tagName: "div",

  //className: "menu-item nav",

  events: {
    "change input": "fieldChanged"
  },

  fieldChanged: function(e){
    var field = $(e.currentTarget);
    var data = {};
    data[field.attr('id')] = field.val();
    this.model.set(data);
    this.model.save();
  },

  initialize: function() {
    this.model.bind("remove", this.removeLink, this);
    this.model.bind("add", this.addLink, this);
  },
    
  template: $('#edit-menu-item-template').html(),

  render: function() {
    var templ = _.template(this.template);
    console.log("model to json: ", this.model.toJSON());
    this.$el.html(templ(this.model.toJSON()));
    return this;
  }
});