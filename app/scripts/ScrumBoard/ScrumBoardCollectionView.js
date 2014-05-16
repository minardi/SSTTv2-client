/* ScrumBoard */

(function (module, sstt) {

    module.CollectionView = Backbone.View.extend({

        template: JST["app/scripts/ScrumBoard/ScrumBoardCollectionTpl.ejs"],
        
        subscriptions: {
            "ScrumPage:ScrumBoardSelected": "initCollection",
            "ScrumBoard:TaskMoved": "renderOne",
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
            if (this.compareDates(today, this.sprint.get("end"))) {
                this.stopSprint();
            }
        },

        compareDates: function (today, endSprint) {
            var out_of_date = false;
            
            endSprint = endSprint.split('/');
            endSprint = new Date(endSprint[2], (endSprint[1] - 1), endSprint[0]);

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
            if(this.done_count === this.collection.length) {
                this.sprint.save({status: "done"});
                this.render();
            }
        },

        stopSprint: function() {
            this.sprint.save({status: "failed"})
            mediator.pub("ScrumBoard:SprintWasStoped");
            this.render();
        },

    });

})(app.ScrumBoard, sstt);
