var app = app || {};

app.MenuView = Backbone.View.extend({
  el: $("#menu-container"),
  
  initialize: function() {
    that = this;
    this.collection = app.Links;
    app.Links.fetch().complete(function(){
      that.render();  
    });
  },

  render: function() {
    console.log("MenuView render");

    this.collection.each(function(item) {
      this.renderItem(item);
      app.Pages.pageByUrl(item.URL);
    }, this);
  },

  renderItem: function(item) {
    var itemView = new app.LinkView({ model: item });
    console.log("-itemView ", itemView.render());
    this.$el.append(itemView.render().el); 
  }
});