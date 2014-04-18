/* BacklogItem */

(function(module) {
        
    module.Collection = Backbone.Collection.extend({	     
        model: module.Model,

        initialize: function(type, project_id) {
		
			//type must be 'stories' || 'tasks' || 'sprints'
			
			this.url = type + '/for-project/' + project_id;
			this.type = type;
			this.on("sync", this.defineTypeAll, this);
        },
		
		// this is tmp kostyl for giving the model type like if it was given by server
		
		defineTypeAll: function() {
			this.each(this.defineTypeOne, this);
		},
		
		defineTypeOne: function(model) {
			var types = {
				"stories" : getParent(),
				"tasks" : model.get("story_id"),
				"sprints" : model.get("project_id")
			};
			
			// if story is in ProdBckLog it's parent is project, but Sprint was started - parent is Sprint
			function getParent() {
				var parent_id;
													
				if (model.get("status") === "Product") {
					parent_id = model.get("project_id");
				} else {
					parent_id = model.get("sprint_id");
				}
													
				return parent_id;
			}
			
			model.set("type",  this.type);
			model.set("parent_id", types[this.type]);
		}

    });

})(app.BacklogItem);

