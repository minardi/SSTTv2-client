/* ProductBacklog */

(function(module) {

    module.ModelView = Backbone.View.extend({

        model: module.Model,

        tagName: "div",

        className: "story-box",
		
		selected: "false",

        template: JST['app/scripts/ProductBacklog/ProductBacklogTpl.ejs'],

        events: {
           "dblclick" : "moveToSprint",
           "click": "storySelected",
        },

        subscriptions: {
		   "DashBoard:Configure": "edit",
		   "DashBoard:Delete": "removeStory"
        },

        initialize: function() {
            this.model.on("change", this.render, this);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$story_delete_btn = this.$(".story-delete-btn");

            return this;
        },

        moveToSprint: function() {
            mediator.pub("ProductBacklog:MoveSprintBacklog", this.model);
            this.remove();
        },

        edit: function() {
		
			if (this.selected === "true") {
				mediator.pub("ProductBacklog:EditStory", this.model);
			}
			
        },

        storySelected: function() {
	
			if (this.selected === "false") { 
				this.selected = "true";
				this.$story_delete_btn.removeClass('hidden');
				 mediator.pub("ProductBacklog:SelectedStory");
				 mediator.pub("module:UnitSelected");
			} else {
				this.selected = "false";
				this.$story_delete_btn.addClass('hidden');
				mediator.pub("module:UnitDeselected");
			}
			
        },

        removeStory: function() {
		
			if (this.selected === "true") {
            this.model.destroy();
            this.remove();
			}
        }

    });

})(app.ProductBacklog);
