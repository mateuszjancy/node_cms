var app = app || {};

app.LinkView= Backbone.View.extend({  
	tagName:  'li',

    template: _.template( $('#manu-item-template').html() ),

    events: {
      'click label': 'gotoPage'
    },

    initialize: function() {
    	_.bindAll(this,"render");
    	console.log(this.model);
      	this.model.on( 'change', this.render, this );
    },

    gotoPage: function(e){
    	console.log('->goto');
    },

	render: function() {
		console.log("render: " + this.model.toJSON());
      	this.$el.html(this.template(this.model.toJSON()));
      	return this;
    }
});