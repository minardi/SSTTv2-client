/* BacklogItem */

(function(module) {
        
    module.Collection = Backbone.Collection.extend({	     
        model: module.Model,

        initialize: function(item_type, status, parent_id) {
			
			this.url = 'backlog_items/get_items/' + item_type + '/' + status + '/' + parent_id;
			
        }
		
    });

})(app.BacklogItem);

