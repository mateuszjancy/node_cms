var app = app || {};

app.LinkCollection = Backbone.Collection.extend({  
	model : app.Link,
	url: '/links'
});

app.Links = new app.LinkCollection();
app.Links.fetch();