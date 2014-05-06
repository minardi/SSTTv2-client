/* ScrumBoard */

(function (module, sstt) {

    module.CollectionView = Backbone.View.extend({

        template: JST["app/scripts/ScrumBoard/ScrumBoardCollectionTpl.ejs"],
        
        subscriptions: {   
            "ScrumPage:ScrumBoardSelected": "initCollection",
            "ScrumBoard:TaskMoved": "renderOne",
            "BacklogItemEdit:TryToCreateSprint": "findActiveSprint",
            "BacklogItemEdit:AccessToStopSprint": "pretermStopSprint"
        },        

        events: {
            "click .stop-sprint": "pretermStopSprint"
        },

        initialize: function() {
            this.sprint = new module.Model();
            this.date = new Date();
            console.log(this.date);
        },

        roles: ["developer", "techlead"],

        initCollection: function (content_el, project_id, role) {
            if (content_el) {
                this.setElement(content_el);
            }

            this.role = "developer";
            this.project_id = project_id;

            this.sprints = new module.Collection([], {
                    "item_type": "sprint",
                    "status": "active",
                    "parent_id": project_id
                });

            this.sprints.on("add", this.initTasks, this);
            this.sprints.fetch();
            this.render();
        },

        initTasks: function() {
            this.sprint = this.sprints.last();
            this.collection = new module.Collection();
            this.collection.url = "backlog_items/get_tasks/" + this.sprint.id;
            this.collection.on("add", this.renderOne, this);
            this.collection.fetch();
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        initCollection: function (content_el, project_id) {
            var role = sstt.user.getRoleInProject(project_id);
            this.access_moving = this.setAccess(role);  

            this.setElement(content_el);          

            this.project_id = project_id;

            this.sprints = new module.Collection([], {
                    "item_type": "sprint",
                    "status": "active",
                    "parent_id": project_id
                });

            this.sprints.on("add", this.initTasks, this);
            this.sprints.fetch();
            this.render();
        },

        setAccess: function(role) {
            return ($.inArray(role, this.roles) !== -1)? true: false;
        },

        initTasks: function() {
            this.sprint = this.sprints.last();
            this.collection = new module.Collection();
            this.collection.url = "backlog_items/get_tasks/" + this.sprint.id;
            this.collection.on("add", this.renderOne, this);
            this.collection.fetch();
        },

        render: function () {
            this.$el.html(this.template());
            this.status = {
                "todo": this.$(".todo"),
                "progress": this.$(".in-progress"),
                "verify": this.$(".to-verify"),
                "done": this.$(".done"),    
            };
            return this;
        },

        renderOne: function (task) {
            var task_view = new module.ModelView({
                    model: task,
                    permission: this.access_moving
                });	
			
            this.status[task.get("status")].append(task_view.render().el);            
        },

        pretermStopSprint: function() {
            this.stopSprint({
                sprint: {
                    status: "failed"
                },
                story: {
                    status: "product",
                    parent_id: this.project_id
                }
            });
        },

        stopSprint: function(sprint_settings) {
            var sprint_stories;
            this.sprint_settings = sprint_settings;

            sprint_stories = new module.Collection([], {
                    "item_type": "story",
                    "status": "sprint",
                    "parent_id": this.sprint.id
                });

            sprint_stories.on("add", this.resetStatus, this);
            sprint_stories.fetch();

            this.collection.each(function(item) {
                    if(item.get("item_type") === "story") {
                        item.set("status", sprint_settings.story.status);
                        item.set("parent_id", sprint_settings.story.parent_id);
                        item.save();
                    }
                }, this);

            this.sprint.set("status", sprint_settings.sprint.status);

            this.sprint.save();
        },

        resetStatus: function(story) {
            story.set("status", this.sprint_settings.story.status);
            story.set("parent_id", this.sprint_settings.story.project_id);
            story.save();
        },

        findActiveSprint: function(attributes) {
            if(this.sprint.get("status") === "active") {
                mediator.pub("ScrumBoard:ActiveSprintWasFound", this.sprint);
            } else {
                mediator.pub("ScrumBoard:NoActiveSprints", attributes);
            }
        },

        sprintTimeOut: function() {

        }

    });

})(app.ScrumBoard, sstt);
