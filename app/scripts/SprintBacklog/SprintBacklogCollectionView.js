/* SprintBacklog */

(function(module) {
        
    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/SprintBacklog/SprintBacklogCollectionTpl.ejs'],  

        subscriptions: {
            "ProductBacklog:MoveSprintBacklog": "addBacklogItem",
            "Sprint:SprintWasSaved": "saveAllStory",
            "PlanningBoard:InitSprintBacklog": "initializeSprintBacklog",
            "SprintBacklog:RestoreStory": "removeStory"
        },

        initializeSprintBacklog: function (el, project_id) {
            this.setElement(el);
            this.$el.append(this.template());
            this.$list = this.$(".sprintstory-list");

            _.bindAll(this, "storyBindToSprint");
            this.collection = new module.Collection();

            this.collection.on("add", this.checkFilling, this);
            this.collection.on("remove", this.checkFilling, this);

            this.render();
        },

        saveAllStory: function (sprint) {
            var story_parent_id = sprint.get("id");
            
            this.collection.each(function (model) {
                model.set("parent_id", story_parent_id);
                model.set("status", "todo");
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

        checkFilling: function() {
            if(this.collection.isEmpty()) {
                mediator.pub("SprintBacklog:EmptySprintBacklog");
            } else {
                mediator.pub("SprintBacklog:FilledSprintBacklog");
            }
        }
    });

})(app.SprintBacklog);