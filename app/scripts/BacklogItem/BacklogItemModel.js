/* BacklogItem */

(function(module) {
        
    module.Model = Backbone.Model.extend({	     
		urlRoot: '/backlog_items',
		 
        defaults: {
		
			"title": "",
			"description": "",
			"estimation": "",
			"parent_id": "",
			"status": "",
			"item_type": "",
			"info": ""
        }

    });

})(app.BacklogItem);
