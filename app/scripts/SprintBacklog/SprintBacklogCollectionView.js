/* SprintBacklog */

(function(module) {
        
    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/SprintBacklog/SprintBacklogCollectionTpl.ejs'],  

        subscriptions: {
            "ProductBacklog:MoveSprintBacklog": "addBacklogItem",
            "Spirnt:SprintWasSaved": "saveAllStory",
            "PlanningBoard:InitSprintBacklog": "initializeSprintBacklog",
            "SprintBacklog:RestoreStory": "removeStory"
        },

        initializeSprintBacklog: function (el, project_id) {
            this.setElement(el);
            this.$el.append(this.template());
            this.$list = this.$(".sprintstory-list");

            _.bindAll(this, "storyBindToSprint");
            this.collection = new module.Collection("story", "sprint", project_id);

            this.collection.on("add", this.isEmpty, this);
            this.collection.on("remove", this.isEmpty, this);

            this.render();
        },

        saveAllStory: function (story) {
            var story_parent_id = story.get("id");

            this.collection.each(function (model) {
                model.set("parent_id", story_parent_id);
                model.save(null,{
                    success: this.storyBindToSprint
                });
            }, this);

            this.$list.empty();
        },

        storyBindToSprint: function (model) {
            this.collection.remove(model);
        },

        addBacklogItem: function(story) {
            this.collection.add(story);
            this.renderOne(story);
        },

        renderOne: function (backlogItem) {
            var backlogItemView = new module.ModelView({
                model: backlogItem
            });

            this.$list.append(backlogItemView.render().el);
        },

        removeStory: function(story) {
            this.collection.remove(story);
        },

        isEmpty: function() {
            if(this.collection.length == 2) {
                mediator.pub("SprintBacklog:FilledSprintBacklog");
            } else if(this.collection.length == 1){
                mediator.pub("SprintBacklog:EmptySprintBacklog");
            }
        }
    });

})(app.SprintBacklog);