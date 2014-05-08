/* SprintBacklog */

(function(module) {
        
    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/SprintBacklog/SprintBacklogCollectionTpl.ejs'],  

        subscriptions: {
            "ProductBacklog:MoveSprintBacklog": "addBacklogItem",
            "PlanningBoard:InitSprintBacklog": "initSprintBacklog",
            "SprintBacklog:RestoreStory": "restoreStory",
            "BacklogItemEdit:TryToCreateSprint": "findActiveSprint",
            "BacklogItemEdit:AccessToStopSprint": "stopSprint",
            "BacklogItemEdit:SavedChanges": "saveSprint",
            "ScrumBoard:SprintWasStoped" : "stopSprint"
        },

        initialize: function() {
            this.sprint = new module.Model();
        },

        initSprintBacklog: function (el, project_id) {
            this.setElement(el);
            this.$el.append(this.template());
            this.$list = this.$(".sprintstory-list");

            _.bindAll(this, "restoreStory");

            this.collection = new module.Collection();
            this.sprint_collection = new module.Collection();

            this.collection.on("add remove", this.checkFilling, this);

            this.sprints = new module.Collection([], {
                "item_type": "sprint",
                "status": "active",
                "parent_id": project_id
            });

            this.sprints.on("add", this.initSprint, this)
                .fetch();

            this.render();
        },

        initSprint: function(sprint) {
            this.sprint = sprint;
        },

        stopSprint: function(sprint) {
            this.sprint.set("status", "failed");
        },

        saveSprint: function(sprint) {
            this.sprints.add(sprint);
            mediator.pub("SprintBacklog:SprintWasReplaced", this.sprint);

            if (sprint.get("item_type") === 'sprint') {
                this.sprint_collection.add(sprint);                

                sprint.save()
                    .success(_.bind(this.sprintWasSaved, this));
            }
        },

        sprintWasSaved: function () {
            this.saveAllStory(this.sprint_collection.last());
        },

        saveAllStory: function (sprint) {
            var story_parent_id = sprint.get("id");
            
            this.collection.each(function (model) {
                model.set("parent_id", story_parent_id);
                model.set("status", "todo");
                model.save(null,{
                    success: _.bind(this.restoreStory, this)
                });
            }, this);

            this.$list.empty();
        },

        addBacklogItem: function (story) {
            this.collection.add(story);
            this.renderOne(story);
        },

        renderOne: function (backlogItem) {
            var backlogItemView = new module.ModelView({
                    model: backlogItem
                });

            this.$list.append(backlogItemView.render().el);
        },

        restoreStory: function(story) {
            this.collection.remove(story);
        },

        checkFilling: function() {
            var pub_map = {
                true: "SprintBacklog:EmptySprintBacklog",
                false: "SprintBacklog:FilledSprintBacklog"
            };

            mediator.pub(pub_map[this.collection.isEmpty()]);
        },

        findActiveSprint: function(attributes) {
            if (this.sprint.get("status") === "active") {
                mediator.pub("SprintBacklog:ActiveSprintWasFound", this.sprint);
            } else {
                mediator.pub("SprintBacklog:NoActiveSprints", attributes);
            }
        }

    });

})(app.SprintBacklog);