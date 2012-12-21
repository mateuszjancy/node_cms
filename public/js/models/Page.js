var app = app || {};

app.Page = Backbone.Model.extend({  
    initialize: function(){  
        console.log("->page initialize");  
    },  
    defaults: {  
      	URL:"", 
		h1: "",
		p: "",
		img: "",
		order: 0,
		large: false
    }  
});