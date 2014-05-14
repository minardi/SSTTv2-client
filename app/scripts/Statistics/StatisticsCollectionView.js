/* Statistics */

(function(module) {
        
     module.CollectionView = Backbone.View.extend({
        
        template: JST['app/scripts/Statistics/StatisticsCollectionTpl.ejs'],

        events: {
            "click .sprint-list": "drawBurnDownChart"
        },

        subscriptions: {
            "ScrumPage:StatBoardSelected": "initStatistics"
        },

        collection: {},

        initStatistics: function(elem, project_id) {
            //this.project_id = project_id;
            this.setElement(elem);
            this.render();
            this.$sprint_list = this.$(".sprint-list");
            
            this.sprints = new module.Collection([], {
                    item_type: "sprint",
                    status: "done",
                    parent_id: project_id
                });

            this.sprints.on("add", this.initTasks, this)
                .on("add", this.renderSprint, this)
                .fetch();
        },

        render: function() {
            this.$el.html(this.template());

            return this;
        },

        initTasks: function(sprint) {
            var tasks = new module.Collection();
            tasks.url = "backlog_items/get_tasks/" + sprint.id;
            tasks.on("reset", this.addTasksToCollection, this)
                .reset();
        },

        renderSprint: function(sprint) {
            var view = new module.ModelView({
                    model: sprint
                });

            this.$sprint_list.append(view.render().el);
        },

        addTasksToCollection: function(tasks) {
            if(!tasks.isEmpty()){
                console.log(tasks.first().get("parent_id"));
                this.collection[tasks.first().get("parent_id")] = tasks;
            }
        },

        drawBurnDownChart: function() {
            console.log(this.collection);
            //console.log(this.collection[this.$sprint_list.val()]);
        }

    });

})(app.Statistics);

