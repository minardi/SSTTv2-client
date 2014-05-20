/* Statistics */

(function(module) {
        
     module.CollectionView = Backbone.View.extend({
        
        template: JST['app/scripts/Statistics/StatisticsCollectionTpl.ejs'],

        events: {
            "change .sprint-list": "selectSprint",
            "plothover .burndown-chart": "showTooltip"
        },

        subscriptions: {
            "ScrumPage:StatBoardSelected": "initStatistics"
        },

        collection: {},

        current_sprint_id: undefined,

        initStatistics: function(elem) {
            this.setElement(elem);
            this.render();
            this.$sprint_list = this.$(".sprint-list");
            this.$burndow_chart = this.$(".burndown-chart");
            this.$tooltip = this.$(".burndown-chart-tooltip");
            
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
                this.drawBurnDownChart(this.collection[this.current_sprint_id]);
            } else {
                this.initStories();
            }
        },

        initStories: function() {
            this.collection[this.current_sprint_id] = new module.Collection();
            
            this.collection[this.current_sprint_id].comparator = function(story) {
                return Date.parse(story.get("end"));
            };

            this.collection[this.current_sprint_id].url = "backlog_items/get_stories/" + this.current_sprint_id;
            this.collection[this.current_sprint_id].on("sync", this.addStoriesToCollection, this)
                .fetch();
        },

        addStoriesToCollection: function() {
            this.drawBurnDownChart(this.collection[this.current_sprint_id]);
        },

        drawBurnDownChart: function(stories) {
            var raw_data = [],
                total_estimation = 0;

            stories.forEach(function(story){
                total_estimation += Number(story.get("estimation"));
                raw_data.push([Date.parse(story.get("end")), story.get("estimation")])
            }, this);

            sstt.chart.burndownChart(this.$burndow_chart, raw_data, {
                start_date: Date.parse(this.sprints.get(this.current_sprint_id).get("start")),
                end_date: Date.parse(this.sprints.get(this.current_sprint_id).get("end")),
                max_y: total_estimation
            });
        },

        showTooltip: function (event, pos, item) {
            var x,
                y,
                tooltip_text = "";

            if (item) {
                x = item.datapoint[0];
                y = item.datapoint[1];

                if(item.series.label === "ideal") {
                    if(x === this.start_date) {
                        tooltip_text = "Sprint start";
                    } else {
                        tooltip_text = "Sprint end";
                    }
                } else {
                    if(item.dataIndex % 2 === 0) {
                        tooltip_text = "Issue completed<br>Story Points -" + item.series.data[item.dataIndex][2];
                    }
                }

                this.$tooltip.html(tooltip_text)
                    .css({top: item.pageY-50, left: item.pageX-50})
                    .fadeIn(200);
            } else {
                this.$tooltip.hide();
            }
        }

    });

})(app.Statistics);

