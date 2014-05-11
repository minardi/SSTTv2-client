/* ProductBacklog */

(function(module) {

    module.ModelView = Backbone.View.extend({

        model: module.Model,

        tagName: "div",

        className: "story-box",
		
		selected: false,

        template: JST['app/scripts/ProductBacklog/ProductBacklogTpl.ejs'],

        events: {
           "dblclick" : "moveToSprint",
           "click": "storySelected",
        },

        subscriptions: {
		   "DashBoard:Configure": "edit",
		   "DashBoard:Delete": "removeStory",
           "DashBoard:Back": "deselectAll",
		   "module:UnitSelected": "deselectAll"
        },

        initialize: function(init_data) {
            this.permission = init_data["permission"];
            this.model.on("change", this.render, this);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$story_delete_btn = this.$(".story-delete-btn");

            return this;
        },

        moveToSprint: function() {
            if (this.permission) {
                mediator.pub("ProductBacklog:MovedStory", this.model);
                this.remove();
            }
        },

        edit: function() {		
			if (this.selected) {
				mediator.pub("ProductBacklog:EditStory", this.model);
			}			
        },

        storySelected: function() {
			mediator.pub("ProductBacklog:SelectedStory");
			mediator.pub("module:UnitSelected");

			this.selected = true;
            this.$el.addClass('selected');
        },

        removeStory: function() {		
			if (this.selected) {
            this.model.destroy();
            this.remove();
			}
        },
		
		deselectAll: function() {
			this.selected = false;
            this.$el.removeClass('selected');
		}

    });

})(app.ProductBacklog);
