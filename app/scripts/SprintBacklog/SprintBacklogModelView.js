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
		   //"ContextMenu:Configure": "edit",
		   //"ContextMenu:Delete": "showConfirm",
           //"ContextMenu:Back": "deselectAll",
		   //"ContextMenu:Team": "deselectAll",
		   "module:UnitSelected": "deselectAll",
		   "BacklogItemEdit:TaskCreated": "renderTask",			
        },

        events: {
        	"dblclick": "restoreToProduct",
			"click .add-new-task": "openEditor",
			"click": "storySelected"
        },

        restoreToProduct: function() {
        	this.remove();
        	mediator.pub("SprintBacklog:RestoreStory", this.model);
        },
		
		openEditor: function() {		    
			mediator.pub ("SprintBacklog:CreateTask", {item_type: "task", status: "todo", parent_id: this.model.get("id")});
		},
		
		 storySelected: function() {
			//mediator.pub("SprintBacklog:SelectedStory");
			mediator.pub("module:UnitSelected", this.model, "backlog_item");

			this.selected = true;
            this.$el.addClass('selected');
        },
		
		deselectAll: function() {
			this.selected = false;
            this.$el.removeClass('selected');
		},

        render: function() {
		
				this.$el.append(this.template["story"](this.model.toJSON())); 
		
            return this;
        },
		
		renderTask: function() {
			
			if (this.selected) {
				this.$el.append(this.template["task"](this.model.toJSON()));
			}
		}

    });

})(app.SprintBacklog);