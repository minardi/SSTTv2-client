/* ProductBacklog */

(function(module) {

    module.ModelView = Backbone.View.extend({

        model: module.Model,

        tagName: "div",

        className: "story-box",
		
		selected: false,

        template: JST['app/scripts/ProductBacklog/ProductBacklogTpl.ejs'],

        events: {
           "dblclick": "moveToSprint",
           "click": "storySelected"
        },

        subscriptions: {
		   "ContextMenu:Configure": "edit",
		   "ContextMenu:Delete": "showConfirm",
           "ContextMenu:Back": "deselectAll",
		   "ContextMenu:Team": "deselectAll",
		   "module:UnitSelected": "deselectAll",
		   "module:deselectAllUnits": "deselectAll"
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
				mediator.pub("module:deselectAllUnits");
                this.remove();
            }
        },

        edit: function() {		
			if (this.selected) {
				mediator.pub("ProductBacklog:EditStory", this.model);
			}			
        },

        storySelected: function(e) {
			mediator.pub("module:UnitSelected", this.model, "backlog_item");
			mediator.pub("ProductBacklog:SelectedStory");

			this.selected = true;
            this.$el.addClass('selected');
			
			e.stopPropagation();
        },

        removeStory: function() {	
		
			if (this.selected) {
                this.model.destroy();
                this.remove();
			}
			
			sstt.confirmation.popup({
					message: "Story has been removed."
				});

        },
		
		deselectAll: function() {
			this.selected = false;
            this.$el.removeClass('selected');
		},

        showConfirm: function() {
		
			if (this.selected) {
				sstt.confirmation.confirm({
						title: "Delete Story?",
						message: "Are You sure You want to delete Story??",
						confirmCallback: (function(obj) {
							return function() {
								obj.removeStory();
							};
						})(this)
					});
			}
        }

    });

})(app.ProductBacklog);
