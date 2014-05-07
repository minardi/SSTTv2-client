/* SprintBacklog */

(function(module) {
        
    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/SprintBacklog/SprintBacklogCollectionTpl.ejs'],  

        subscriptions: {
            "ProductBacklog:MoveSprintBacklog": "addBacklogItem",
            "Sprint:SprintWasSaved": "saveAllStory",
            "PlanningBoard:InitSprintBacklog": "initSprintBacklog",
            "SprintBacklog:RestoreStory": "removeStory",
            "BacklogItemEdit:TryToCreateSprint": "findActiveSprint",
            "BacklogItemEdit:AccessToStopSprint": "stopSprint",
            "BacklogItemEdit:SavedChanges": "setSprint"
        },

        initialize: function() {
            this.sprint = new module.Model();
        },

        initSprintBacklog: function (el, project_id) {
            this.setElement(el);
            this.$el.append(this.template());
            this.$list = this.$(".sprintstory-list");

            _.bindAll(this, "storyBindToSprint");
            this.collection = new module.Collection();

            this.collection.on("add", this.checkFilling, this);
            this.collection.on("remove", this.checkFilling, this);

            this.sprints = new module.Collection([], {
                "item_type": "sprint",
                "status": "active",
                "parent_id": project_id
            });

            this.sprints.on("add", this.initSprint, this);
            this.sprints.fetch();

            this.render();
        },

        initSprint: function() {
            this.sprint = this.sprints.last();
        },

        stopSprint: function(sprint) {
            this.sprint.set("status", "failed");
        },

        setSprint: function(sprint) {
            this.sprint = sprint;
            mediator.pub("SprintBacklog:SprintWasReplaced", this.sprint);
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
        },

        findActiveSprint: function(attributes) {
            console.log(this.sprint);
            if(this.sprint.get("status") === "active") {
                mediator.pub("SprintBacklog:ActiveSprintWasFound", this.sprint);
            } else {
                mediator.pub("SprintBacklog:NoActiveSprints", attributes);
            }
        }
    });

})(app.SprintBacklog);