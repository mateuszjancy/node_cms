var app = app || {};

app.CmsContact = Backbone.Model.extend({  
    defaults: {  
      pageUrl:"", 
		  h1: "",
		  p: "",
		  imagePath: "",
		  order: 0,
		  large: false,
      _id: -1,
      before: false,
    },

    idAttribute: '_id',
    urlRoot: '/contact'
});