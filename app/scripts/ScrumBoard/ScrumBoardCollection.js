/* ScrumBoard */

/*(function (module) {
    module.Collection = Backbone.Collection.extend({  
    });
})(app.ScrumBoard);*/

app.ScrumBoard.Collection = app.BacklogItem.Collection.extend({
	model: app.ScrumBoard.Model
});