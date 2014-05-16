/* DashBoard */

(function(module) {

    module.Collection = Backbone.Collection.extend({

        model: module.Model,
		
		url: "dash_buttons",
	
	});

})(app.DashBoard);