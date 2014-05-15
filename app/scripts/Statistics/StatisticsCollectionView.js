/* Statistics */

(function(module) {
        
     module.CollectionView = Backbone.View.extend({
        
        template: JST['app/scripts/Statistics/StatisticsCollectionTpl.ejs'],

        events: {
            "click .sprint-list": "selectSprint"
        },

        subscriptions: {
            "ScrumPage:StatBoardSelected": "initStatistics"
        },

        collection: {},

        current_sprint_id: NaN,

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

            this.sprints.on("add", this.renderSprint, this)
                .fetch();
        },

        render: function() {
            this.$el.html(this.template());

            return this;
        },

        renderSprint: function(sprint) {
            var view = new module.ModelView({
                    model: sprint
                });

            this.$sprint_list.append(view.render().el);
        },

        /*initStories: function(sprint) {
            var stories = new module.Collection();
            stories.url = "backlog_items/get_stories/" + sprint.id;
            stories.on("sync", this.addStoriesToCollection, this)
                .fetch();
        },

        addTasksToCollection: function(tasks) {
            var sprint_id = tasks.url.replace("backlog_items/get_stories/", "");
            if(!tasks.isEmpty()) {
                this.collection[sprint_id] = tasks;
            }
        },*/

        selectSprint: function() {
            this.current_sprint_id = this.$sprint_list.val();
            
            if(!this.collection[this.current_sprint_id]){
                this.initStories();
            }

        },

        initStories: function() {
            var stories = new module.Collection();
            
            stories.url = "backlog_items/get_stories/" + this.current_sprint_id;
            stories.on("sync", this.addStoriesToCollection, this)
                .fetch();
        },

        addTasksToCollection: function(stories) {
            this.collection[this.current_sprint_id] = stories;

            this.drawBurnDownChart(stories);
        },

        drawBurnDownChart: function() {
            //
        }

    });

})(app.Statistics);

