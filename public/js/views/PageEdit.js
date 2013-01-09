var app = app || {};
//http://lostechies.com/derickbailey/2012/02/03/get-a-model-from-a-backbone-collection-without-knowing-if-the-collection-is-loaded/

//http://stackoverflow.com/questions/9853039/loops-in-underscore-js-template
app.CmsPageEditView= Backbone.View.extend({  
  tagName : "div",  
  className: "page",  
  template: $('#edit-page-template').html(),
  imagesModel: null, 

  events: {
    "change input": "fieldChanged",
    "change select": "selectChange",

  },

  selectChange: function(e){
    var field = $(e.currentTarget);
    $('#selected-'+field.attr('id')).attr('src', field.val());
    this.fieldChanged(e);
  },

  fieldChanged: function(e){
    var field = $(e.currentTarget);
    var data = {};
    var id = "";
    var value = "";

    console.log('->field', field);
    console.log('->field.attr()', field.attr('type'));

    if(field.attr('type')==="checkbox"){
      value = (field.attr('checked')==='checked')? true: false;
    }else{
      value = field.val();
    }

    data[field.attr('id')] = value; 
   
    this.model.set(data);
    this.model.save();
  },
  
  render: function() {
    console.log('->this.imagesModel', this.imagesModel);
    var templ = _.template(this.template);
    this.$el.html(templ({
      page: this.model.toJSON(),
      images: this.imagesModel
    }));
    return this;
  }

});
