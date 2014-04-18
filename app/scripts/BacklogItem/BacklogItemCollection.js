/* BacklogItem */

(function(module) {
        
    module.Collection = Backbone.Collection.extend({	     
        model: module.Model,

        initialize: function(type) {
		
			//type must be 'stories' || 'tasks' || 'sprints'
			
			if (!type === 'sprints') {
				this.url = type + '/for-project/:id';
			} else {
				this.url = type + '/';
			}
			
			this.fetch();
        }		 

    });

})(app.BacklogItem);

