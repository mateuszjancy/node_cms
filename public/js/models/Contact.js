var app = app || {};

app.CmsContact = Backbone.Model.extend({  
    defaults: {  
      motto: "",
      mail:"",
      companyName: "",
      displayName: "",
      git: "",
      linked: "",
      stack: "",
      order: 0
    },

    idAttribute: '_id',
    urlRoot: '/contact'
});