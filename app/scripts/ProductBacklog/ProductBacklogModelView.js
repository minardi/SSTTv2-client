/* ProductBacklog */

(function(module) {

    module.ModelView = Backbone.View.extend({

        model: module.Model,

        tagName: "div",

        className: "story-box",

        template: JST['app/scripts/ProductBacklog/ProductBacklogTpl.ejs'],

        events: {
           "dblclick" : "moveToSprint",
           "contextmenu" : "edit",
           "click": "storySelected",
           "click .story-delete-btn": "removeStory"
        },

        subscriptions: {
            "ProductBacklog:SelectedStory": "hideDeleteBtn"
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
            event.preventDefault();

            mediator.pub("ProductBacklog:MoveSprintBacklog", this.model);
            this.$el.remove();
        },

        edit: function() {
            event.preventDefault();

            mediator.pub("ProductBacklog:editStory", this.model);
        },

        storySelected: function() {
            mediator.pub("ProductBacklog:SelectedStory");
            this.$story_delete_btn.removeClass('hidden');
        },

        hideDeleteBtn: function() {
            this.$story_delete_btn.addClass("hidden");
        },

        removeStory: function(){
            this.model.destroy();
            this.remove();
        }

    });

})(app.ProductBacklog);
