/* SprintBacklog */

(function(module) {

    module.ModelView = Backbone.View.extend({

        className: "story-box",

        template: {
			"story": JST['app/scripts/SprintBacklog/SprintBacklogStoryTpl.ejs'],
			"task":  JST['app/scripts/SprintBacklog/SprintBacklogTaskTpl.ejs']
		},

        events: {
        	"dblclick": "restoreToProduct",
			"click .add-new-task": "openEditor"
        },
		
		subscriptions: {
			"BacklogItemEdit:TaskCreated": "renderTask"
		},

        restoreToProduct: function() {
        	this.remove();
        	mediator.pub("SprintBacklog:RestoreStory", this.model);
        },
		
		openEditor: function() {
			mediator.pub ("SprintBacklog:CreateTask", {item_type: "task", status: "todo", parent_id: this.model.get("id")});
		},
		
		renderTask: function(task_model) {
			console.log(task_model);
			this.$el.append(this.template["task"](task_model.toJSON()));
		},

        render: function() {
            this.$el.html(this.template["story"](this.model.toJSON()));
            
            return this;
        }

    });

})(app.SprintBacklog);