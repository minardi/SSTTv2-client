/* SprintBacklog */

(function(module) {

    module.ModelView = Backbone.View.extend({
	
		className: "story-wraper",
		
		selected: false,
		
        template: {
			"story": JST['app/scripts/SprintBacklog/SprintBacklogStoryTpl.ejs'],
			"task":  JST['app/scripts/SprintBacklog/SprintBacklogTaskTpl.ejs']
		},
		
		subscriptions: {
           "ContextMenu:Back": "deselect",
		   "ContextMenu:Team": "deselect",
		   "module:UnitSelected": "deselect",
		   "BacklogItemEdit:TaskCreated": "renderTask",			
        },
		
		events: {
        	"dblclick": "restoreToProduct",
			"click .add-new-task": "createTask",
			"click": "storySelected"
        },
		
        restoreToProduct: function() {
        	this.remove();
        	mediator.pub("SprintBacklog:RestoreStory", this.model);
        },
		
		createTask: function() {		    
			mediator.pub ("SprintBacklog:CreateTask", {item_type: "task", status: "todo", parent_id: this.model.get("id")});
		},
		
		 storySelected: function() {
			mediator.pub("module:UnitSelected", this.model, "backlog_item");

			this.selected = true;
            this.$el.addClass('selected');
        },
		
		deselect: function() {
			this.selected = false;
            this.$el.removeClass('selected');
		},

        render: function() {
		
				this.$el.append(this.template["story"](this.model.toJSON()));
		
            return this;
        },
		
		renderTask: function(task_model) {
			
			if (this.selected) {
				this.$el.append(this.template["task"](task_model.toJSON()));
			}
		}

    });

})(app.SprintBacklog);