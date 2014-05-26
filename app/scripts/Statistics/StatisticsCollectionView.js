/* Statistics */

(function(module) {
        
     module.CollectionView = Backbone.View.extend({
        
        template: {
            statisticsLayout: JST['app/scripts/Statistics/StatisticsCollectionTpl.ejs'],
            statisticsTable: JST['app/scripts/Statistics/StatisticsTableTpl.ejs'],
            statisticsTableRow: JST['app/scripts/Statistics/StatisticsTableRowTpl.ejs']
        },

        events: {
            "change .sprint-list": "selectSprint"
        },

        subscriptions: {
            "ScrumPage:StatBoardSelected": "initStatistics"
        },

        stories: [],
        data_for_chart: [],
        total_estimation: [],

        initStatistics: function(elem) {
            this.setElement(elem);
            this.render();
            this.$sprint_list = this.$(".sprint-list");
            this.$burndown_chart = this.$(".burndown-chart");
            this.$sprint_statistics = this.$(".sprint-statistics");
            
            this.sprints = new module.Collection([], {
                    item_type: "sprint",
                    status: "done",
                    parent_id: sstt.current_project
                });

            this.sprints.on("add", this.renderSprint, this)
                .fetch();
        },

        render: function() {
            this.$el.html(this.template["statisticsLayout"]());

            return this;
        },

        renderSprint: function(sprint) {
            var view = new module.ModelView({
                    model: sprint
                });

            this.$sprint_list.append(view.render().el);
        },

        selectSprint: function() {
            this.$sprint_statistics.html(this.template["statisticsTable"]());
            this.$sprint_statistics_table = this.$(".sprint-statistics .table");

            this.current_sprint_id = this.$sprint_list.val();
            
            if(this.data_for_chart[this.current_sprint_id]){
                this.drawBurnDownChart(this.data_for_chart[this.current_sprint_id], this.total_estimation[this.current_sprint_id]);
                this.fillStatisticsTable(this.stories[this.current_sprint_id]);
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
            this.stories[this.current_sprint_id] = stories;
            this.total_estimation[this.current_sprint_id] = 0;
            this.data_for_chart[this.current_sprint_id] = [];

            stories.forEach(function(story){
                this.total_estimation[this.current_sprint_id] += Number(story.get("estimation"));
                this.data_for_chart[this.current_sprint_id].push([Date.parse(story.get("end")), story.get("estimation")]);
            }, this);

            this.drawBurnDownChart(this.data_for_chart[this.current_sprint_id], this.total_estimation[this.current_sprint_id]);

            this.fillStatisticsTable(stories);
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
        },

        fillStatisticsTable: function(stories) {
            var table_data = {},
                sprint;
            sprint = this.sprints.get(this.current_sprint_id)
            
            table_data = {
                date: sprint.get("start"),
                title: "Sprint `<i>" + sprint.get("title") + "`</i> start",
                type: "sprint",
                status: sprint.get("status"),
                estimation: this.total_estimation[this.current_sprint_id],
                css_class: "warning"
            };

            this.$sprint_statistics_table.append(this.template["statisticsTableRow"](table_data));

            stories.forEach(function(story) {
                table_data = {
                    date: story.get("end"),
                    title: story.get("title"),
                    type: "story",
                    status: story.get("status"),
                    estimation: -(story.get("estimation")),
                    css_class: "success"
                };

                this.$sprint_statistics_table.append(this.template["statisticsTableRow"](table_data));
            }, this);

            table_data = {
                date: sprint.get("end"),
                title: "Sprint `<i>" + sprint.get("title") + "`</i> end",
                type: "sprint",
                status: sprint.get("status"),
                estimation: 0,
                css_class: "warning"
            };

            this.$sprint_statistics_table.append(this.template["statisticsTableRow"](table_data));
        }

    });

})(app.Statistics);

