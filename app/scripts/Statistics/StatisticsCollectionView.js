/* Statistics */

(function(module) {
        
     module.CollectionView = Backbone.View.extend({
        
        template: JST['app/scripts/Statistics/StatisticsCollectionTpl.ejs'],

        events: {
            "change .sprint-list": "selectSprint"
        },

        subscriptions: {
            "ScrumPage:StatBoardSelected": "initStatistics"
        },

        collection: [],
        total_estimation: [],

        initStatistics: function(elem) {
            this.setElement(elem);
            this.render();
            this.$sprint_list = this.$(".sprint-list");
            this.$burndown_chart = this.$(".burndown-chart");
            
            this.sprints = new module.Collection([], {
                    item_type: "sprint",
                    status: "done",
                    parent_id: sstt.current_project
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

        selectSprint: function() {
            this.current_sprint_id = this.$sprint_list.val();
            
            if(this.collection[this.current_sprint_id]){
                this.drawBurnDownChart(this.collection[this.current_sprint_id], this.total_estimation[this.current_sprint_id]);
            } else {
                this.initStories();
            }
        },

        initStories: function() {
            var stories = new module.Collection();
            
            stories.comparator = function(story) {
                return Date.parse(story.get("end"));
            };

            stories.url = "backlog_items/get_stories/" + this.current_sprint_id;
            stories.once("sync", this.initDataForChart, this)
                .fetch();
        },

        initDataForChart: function(stories) {
            this.total_estimation[this.current_sprint_id] = 0;
            this.collection[this.current_sprint_id] = [];

            stories.forEach(function(story){
                this.total_estimation[this.current_sprint_id] += Number(story.get("estimation"));
                this.collection[this.current_sprint_id].push([Date.parse(story.get("end")), story.get("estimation")]);
            }, this);

            this.drawBurnDownChart(this.collection[this.current_sprint_id], this.total_estimation[this.current_sprint_id]);
        },

        drawBurnDownChart: function(raw_data, total_estimation) {
            sstt.chart.burndownChart(this.$burndown_chart, raw_data, this.additionalData(total_estimation));
        },

        additionalData: function(total_estimation) {
            return {
                start_date: Date.parse(this.sprints.get(this.current_sprint_id).get("start")),
                end_date: Date.parse(this.sprints.get(this.current_sprint_id).get("end")),
                max_y: total_estimation
            };
        }

    });

})(app.Statistics);

