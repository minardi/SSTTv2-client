/* ScrumBoard */

(function (module, sstt) {

    module.CollectionView = Backbone.View.extend({

        template: JST["app/scripts/ScrumBoard/ScrumBoardCollectionTpl.ejs"],
        
        subscriptions: {
            /*"ProjectPage:ProjectSelected": "initCollection",*/
            "ScrumPage:ScrumBoardSelected": "initCollection",
            "PlanningBoard:StartSprint": "initCollection",
            "ScrumBoard:TaskMoved": "renderOne",
            "BacklogItemEdit:AccessToStopSprint": "pretermStopSprint",
            "ScrumBoard:TaskLeftDone": "doneCountDec"
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

        initCollection: function(project_id, content_el) {
            var role = sstt.user.getRoleInProject();
            this.access_moving = this.setAccess(role);         

            this.project_id = project_id;

            this.sprints = new module.Collection([], {
                    "item_type": "sprint",
                    "status": "active",
                    "parent_id": project_id
                });

            this.sprints.on("add", this.getLast, this);
            this.sprints.fetch();
            
            if(content_el) {
                this.setElement(content_el); 
                this.render();
            }
        },

        setAccess: function(role) {
            return (_.indexOf(this.roles, role) !== -1)? true: false;
        },

        getLast: function(sprint) {
            this.sprint = sprint;
            this.initTasks();
        },

        initTasks: function() {
            this.collection = new module.Collection();
            this.collection.url = "backlog_items/get_tasks/" + this.sprint.id;

            this.collection.once("add", this.checkEndOfSprint, this);
            this.collection.on("add", this.renderOne, this);
            this.done_count = 0;
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
            var task_view;

            if(task.get("status") === "done") {
                this.done_count++;
                this.autoStop();
            }

            if(this.status) {
                task_view= new module.ModelView({
                    model: task,
                    permission: this.access_moving
                });	

    			if(this.sprint.get("status") === "active") {
                    this.status[task.get("status")].append(task_view.render().el); 
                }
            }
        },

        doneCountDec: function() {
            this.done_count--;
        },

        autoStop: function() {
            if(this.collection.length === this.done_count) {
                this.stopSprint({
                    sprint: {
                        status: "done"
                    },
                    story: {
                        status: "done",
                        parent_id: this.sprint.id
                    }
                });
            }
        },

        pretermStopSprint: function() {
            //if(this.collection){
                this.stopSprint({
                    sprint: {
                        status: "failed"
                    },
                    story: {
                        status: "product",
                        parent_id: this.project_id
                    }
                });
            //} else {
            //    this.initTasks();
            //}
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

            mediator.pub("ScrumBoard:SprintStoped");
        },

        resetStatus: function(story) {
            story.set("status", this.sprint_settings.story.status);
            story.set("parent_id", this.sprint_settings.story.project_id);
            story.save();
        }

    });

})(app.ScrumBoard, sstt);
