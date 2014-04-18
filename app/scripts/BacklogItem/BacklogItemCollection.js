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
			model.set("type",  this.type);
			if (this.type === "stories") {
				model.set("parent_id", model.get("sprint_id"));
			} else if (this.type === "tasks") {
				model.set("parent_id", model.get("story_id"));
			} else if (this.type === "sprints") {
				model.set("parent_id", model.get("project_id"));
			}
		}

    });

})(app.BacklogItem);

