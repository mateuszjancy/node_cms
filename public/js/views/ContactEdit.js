var app = app || {};
//http://lostechies.com/derickbailey/2012/02/03/get-a-model-from-a-backbone-collection-without-knowing-if-the-collection-is-loaded/

//http://stackoverflow.com/questions/9853039/loops-in-underscore-js-template
app.CmsContactEditView= Backbone.View.extend({  
  tagName : "div",  
  className: "contact",  
  template: $('#edit-contact-template').html(),
  
  events: {
    "change input": "fieldChanged"
  },

  initialize: function(){
    this.model.bind("change", this.render, this);
  },

  fieldChanged: function(e){
    var field = $(e.currentTarget);
    var data = {};
  
    data[field.attr('id')] = field.val();; 
   
    this.model.set(data);
    this.model.save();
  },
  
  render: function() {
    var templ = _.template(this.template);
    this.$el.html(templ({
      contact: this.model.toJSON()
    }));
    return this;
  }

});
