/* ProductBacklog*/

/*(function(module) {

    module.Collection = Backbone.Collection.extend({});

})(app.ProductBacklog);*/

app.ProductBacklog.Collection = app.BacklogItem.Collection.extend({
    model: app.ProductBacklog.Model
});