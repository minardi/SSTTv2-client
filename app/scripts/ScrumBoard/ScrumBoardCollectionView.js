/* ScrumBoard */

(function (module, sstt) {

    module.CollectionView = Backbone.View.extend({

        template: JST["app/scripts/ScrumBoard/ScrumBoardCollectionTpl.ejs"],
        
        subscriptions: {   
            "ScrumPage:ScrumBoardSelected": "initCollection",
            "ScrumBoard:TaskMoved": "renderOne",
            "BacklogItemEdit:AccessToStopSprint": "pretermStopSprint"
        },        

        events: {
            "click .stop-sprint": "pretermStopSprint"
        },

        roles: ["developer", "techlead"],

        initialize: function() {
            var today = new Date();
                day = this.normalize(today.getDate());
                mounth = this.normalize(today.getMonth() + 1);
                year = this.normalize(today.getFullYear());

            this.date = mounth + '/' + day + '/' + year;

            this.sprint = new module.Model();
        },

        normalize: function(time_value) {
            if (time_value < 10) {
                time_value = "0" + time_value;
            }

            return time_value;  
        },

        initCollection: function(content_el, project_id) {
            var role = sstt.user.getRoleInProject();
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

        initTasks: function() {
            this.sprint = this.sprints.last();
            this.collection = new module.Collection();
            this.collection.url = "backlog_items/get_tasks/" + this.sprint.id;

            this.collection.once("add", this.checkEndOfSprint, this);
            this.collection.on("add", this.renderOne, this);
            this.collection.fetch();
        },

        checkEndOfSprint: function() {
            var sprint_settings = {
                sprint: {
                    status: "done"
                },
                story: {}
            };

            if(this.compareDates(this.date, this.sprint.get("end_date"))) {
                this.collection.each(function(item){
                    if(item.get("status") !== "done") {
                        sprint_settings.sprint["status"] = "failed";
                        sprint_settings.story["status"] = "product";
                        sprint_settings.story["parent_id"]= this.project_id
                    }
                });

                this.stopSprint(sprint_settings);
            }
        },

        compareDates: function(today, endSprint) {
            var timeout = false;

            today = today.split('/');
            endSprint = endSprint.split('/');

            today = new Date(today[2], (today[0] - 1), today[1]);
            endSprint = new Date(endSprint[2], (endSprint[0] - 1), endSprint[1]);

            if (today > endSprint) {
                timeout = true;
            }

            return timeout;
        },

        setAccess: function(role) {
            return (_.indexOf(role, this.roles) !== -1)? true: false;
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
			if(this.sprint.get("status") === "active") {
                this.status[task.get("status")].append(task_view.render().el); 
            }            
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
        }

    });

})(app.ScrumBoard, sstt);
