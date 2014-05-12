/* ScrumBoard */

(function (module, sstt) {

    module.CollectionView = Backbone.View.extend({

        template: JST["app/scripts/ScrumBoard/ScrumBoardCollectionTpl.ejs"],
        
        subscriptions: {
            "ScrumPage:ScrumBoardSelected": "initCollection",
            "PlanningBoard:StartSprint": "initCollection",
            "ScrumBoard:TaskMoved": "renderOne",
            "BacklogItemEdit:StopSprintConfirmed": "stopSprint",
            "ScrumBoard:TaskReturnedToVerify": "reduceCompletedTasksNumber"
        },

        events: {
            "click .stop-sprint": "stopSprint"
        },

        roles: ["developer", "techlead"],

        initialize: function() {                       
            this.sprint = new module.Model();
        },

        initCollection: function (content_el, project_id) {
            this.access_moving = sstt.user.checkRole(this.roles);        

            this.project_id = project_id;
            this.content_el = content_el;

            this.sprint = new module.Model();
            this.sprint.urlRoot = "backlog_items/get_active_sprint/" + project_id;
            this.sprint.on("change", this.sprintInit, this)
                .fetch();
            
            if (content_el) {
                this.setElement(content_el).render();
            }
        },

        sprintInit: function(model) {
            if (this.content_el) {
                this.setElement(this.content_el).render();
            }
            
            this.initTasks();
        },

        initTasks: function () {
            this.collection = new module.Collection();
            this.collection.url = "backlog_items/get_tasks/" + this.sprint.id;

            this.done_count = 0;
            this.collection.once("add", this.checkEndOfSprint, this)
                .on("add", this.increaseCompletedTasksNumber, this)
                .on("add", this.renderOne, this)
                .fetch();
        },

        checkEndOfSprint: function () {
            var today = new Date();

            if (this.compareDates(today, this.sprint.get("end_date"))) {
                this.stopSprint();
            }
        },

        compareDates: function (today, endSprint) {
            var out_of_date = false;

            endSprint = endSprint.split('/');
            endSprint = new Date(endSprint[2], (endSprint[0] - 1), endSprint[1]);

            if (today.valueOf() > endSprint.valueOf()) {
                out_of_date = true;
            }

            return out_of_date;
        },

        renderOne: function (task) {
            var task_view;

            if (task.get("status") === "done") {
                this.done_count++;
                this.autoStop();
            }

            if (this.status) {
                task_view = new module.ModelView({
                    model: task,
                    permission: this.access_moving
                });

    			if (this.sprint.get("status") === "active") {
                    this.status[task.get("status")].append(task_view.render().el); 
                }
            }
        },

        render: function () {
            this.$el.html(this.template({"sprint_status": this.sprint.get("status")}));

            this.status = {
                "todo": this.$(".todo"),
                "progress": this.$(".in-progress"),
                "verify": this.$(".to-verify"),
                "done": this.$(".done")
            };

            return this;
        },

        reduceCompletedTasksNumber: function() {
            this.done_count--;
        },

        autoStop: function() {
            if(this.collection.length === this.done_count) {
                this._stopSprint({
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

        stopSprint: function(without_render) {
            this._stopSprint({
                sprint: {
                    status: "failed"
                },
                story: {
                    status: "product",
                    parent_id: this.project_id
                }
            });

            if(!without_render) {
                this.render();
            }
        },

        _stopSprint: function(sprint_settings) {
            var sprint_stories;

            this.sprint_settings = sprint_settings;

            sprint_stories = new module.Collection([], {
                    "item_type": "story",
                    "status": "sprint",
                    "parent_id": this.sprint.id
                });

            sprint_stories.on("add", this.resetStatus, this)
                .fetch();

            this.collection.each(function (item) {
                    if (item.get("item_type") === "story") {
                        item.set("status", sprint_settings.story.status)
                            .set("parent_id", sprint_settings.story.parent_id)
                            .save();
                    }
                }, this);

            this.sprint.save({
                status: sprint_settings.sprint.status
            });

            mediator.pub("ScrumBoard:SprintWasStoped");
        },

        resetStatus: function(story) {
            story.set("status", this.sprint_settings.story.status)
                .set("parent_id", this.sprint_settings.story.project_id)
                .save();
        }

    });

})(app.ScrumBoard, sstt);
