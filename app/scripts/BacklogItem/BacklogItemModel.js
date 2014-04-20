/* BacklogItem */

(function(module) {
        
    module.Model = Backbone.Model.extend({	     
		 
        defaults: {
		
			"title": "",
			"description": "",
			"estimation": "",
			"parent_id": "",
			"status": "",
			"item_type": ""
        }		 

    });

})(app.BacklogItem);
