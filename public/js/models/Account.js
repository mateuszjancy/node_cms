var app = app || {};

app.CmsAccount = Backbone.Model.extend({  
    defaults: {  
      username: "", 
      password: "", 
      oldPassword: "", 
      mail: ""
    },

    idAttribute: '_id',
    urlRoot: '/account'
});