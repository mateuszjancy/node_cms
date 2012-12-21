var app = app || {};

app.Link = Backbone.Model.extend({  
    initialize: function(){  
        console.log("->link initialize");  
    },  
    defaults: {  
      	label:"", 
		URL: "",
		order: 0
    }  
}); 