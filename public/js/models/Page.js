var app = app || {};

app.CmsPage = Backbone.Model.extend({  
    defaults: {  
      	pageUrl:"", 
		h1: "",
		p: "",
		img: "",
		order: 0,
		large: false
    },

    url: function() {
    	return '/page/'+this.pageUrl;
  	}
});