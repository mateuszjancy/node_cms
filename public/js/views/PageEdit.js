var app = app || {};
//http://lostechies.com/derickbailey/2012/02/03/get-a-model-from-a-backbone-collection-without-knowing-if-the-collection-is-loaded/

//http://stackoverflow.com/questions/9853039/loops-in-underscore-js-template
app.CmsPageEditView= Backbone.View.extend({  
  tagName : "div",  
  className: "page",  
  template: $('#edit-page-template').html(),
 
  events: {
    "change input": "fieldChanged"
  },

  fieldChanged: function(e){
    var field = $(e.currentTarget);
    var data = {};

    data[field.attr('id')] = 
        (field.attr('type')==="checkbox")
          ? (field.attr('checked')==='checked')? true: false
          : field.val();

    console.log("->e ", e);
    console.log("->data ", data);

    this.model.set(data);
    this.model.save();
  },
  
  render: function() {
    var templ = _.template(this.template);
    this.$el.html(templ(this.model.toJSON()));
    return this;
  }

});
