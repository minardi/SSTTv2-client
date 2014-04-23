/* SprintBacklog */

(function(module) {
        
    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/SprintBacklog/SprintBacklogCollectionTpl.ejs'],  

        subscriptions: {
            "ProductBacklog:MoveSprintBacklog": "addBacklogItem",
            "Spirnt:SprintWasSaved": "saveAllStory"
        },

        events: {
            "click .start-sprint": "startSprint"
        },

        initialize: function (options) {
            _.bindAll(this, "storyBindToSprint");
            this.collection = new module.Collection("story", "sprint", options.project_id);
            this.render();
        },

        startSprint: function () {
            var sprint = new module.Model();

            sprint.set("parent_id", this.collection.getParentId());
            mediator.pub("SprintBacklog:SaveSprint", sprint);
        },

        saveAllStory: function (story) {
            var story_parent_id = story.get("id");

            this.collection.each(function (model) {
                model.set("parent_id", story_parent_id);
                model.save({
                    success: this.storyBindToSprint
                });
            }, this);
        },

        storyBindToSprint: function (model) {
            this.collection.remove(model);
        },

        addBacklogItem: function(story) {
            this.collection.add(story);
            this.renderOne(story);
        },

        render: function() {
            this.$el.append(this.template());
            this.$list = this.$(".sprintstory-list");

            this.$(".start-sprint").on("click", this.addSprint);

            return this;
        },

        renderOne: function (backlogItem) {
            var backlogItemView = new module.ModelView({
                model: backlogItem
            });

            this.$list.append(backlogItemView.render().el);
        }
    });

})(app.SprintBacklog);