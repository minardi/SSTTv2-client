/* ProductBacklog*/

/*(function(module) {

    module.Collection = Backbone.Collection.extend({
    	model: module.Model
    });

})(app.ProductBacklog);*/

app.ProductBacklog.Collection = app.BacklogItem.Collection.extend({
    model: app.ProductBacklog.Model
});
