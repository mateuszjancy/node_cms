var app = app || {};

app.CmsPage = Backbone.Model.extend({  
    defaults: {  
      pageUrl:"", 
		  h1: "",
		  p: "",
		  img: "",
		  order: 0,
		  large: false,
      _id: -1,
      editMode: false
    },

    idAttribute: '_id',
    urlRoot: '/page'
});