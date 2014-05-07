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
		   "DashBoard:Delete": "removeStory",
		   "module:UnitSelected": "deselectAll"
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
			mediator.pub("ProductBacklog:SelectedStory");
			mediator.pub("module:UnitSelected");

			this.selected = "true";
			this.$story_delete_btn.removeClass('hidden');
        },

        removeStory: function() {
		
			if (this.selected === "true") {
            this.model.destroy();
            this.remove();
			}
        },
		
		deselectAll: function() {
			this.selected = "false";
			this.$story_delete_btn.addClass('hidden');
		}

    });

})(app.ProductBacklog);
