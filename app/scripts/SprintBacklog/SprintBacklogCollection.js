/* SprintBacklog */

/*(function(module) {

    module.Collection = Backbone.Collection.extend({

        model: module.Model 
         
    });

})(app.SprintBacklog);*/
app.SprintBacklog.Collection = app.BacklogItem.Collection.extend({
	model: app.SprintBacklog.Model,

	addItem: function (model) {
    	var model_without_parent = this.last();
    //	this.defineTypeOne(model_without_parent);
    }
		
});