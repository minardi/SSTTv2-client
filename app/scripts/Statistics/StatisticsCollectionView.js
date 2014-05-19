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

        collection: {},

        current_sprint_id: NaN,

        initStatistics: function(elem, project_id) {
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
            
            this.collection[this.current_sprint_id].url = "backlog_items/get_stories/" + this.current_sprint_id;
            this.collection[this.current_sprint_id].on("sync", this.addStoriesToCollection, this)
                .fetch();
        },

        addStoriesToCollection: function() {
            this.drawBurnDownChart(this.collection[this.current_sprint_id]);
        },

        drawBurnDownChart: function(stories) {
            var plot,
                story_data_for_chart = [],
                chart_data = [],
                maxY = 0,
                start_date = Date.parse(this.sprints.get(this.current_sprint_id).get("start")),
                end_date = Date.parse(this.sprints.get(this.current_sprint_id).get("end")),
                current_x,
                current_y;

            stories.forEach(function(story){
                maxY += Number(story.get("estimation"));
                story_data_for_chart.push([Date.parse(story.get("end")), story.get("estimation")])
            }, this);

            current_x = start_date;
            current_y = maxY;

            chart_data.push([current_x, current_y]);
            
            _.each(story_data_for_chart, function(val) {
                current_x = val[0];
                chart_data.push([current_x, current_y, val[1]]);
                current_y -= val[1];
                chart_data.push([current_x, current_y, val[1]]);
            }, this);
            
            if(current_y === 0) {
                chart_data.push([end_date, 0]);
            }

            plot = $.plot(".burndown-chart",
                    [
                        { data: chart_data, label: "real"},
                        { data: [[start_date, maxY, 22],[end_date, 0, 32]], label: "ideal"}
                    ],
                    {
                        series: {
                            lines: {
                                show: true
                            },
                            points: {
                                show: true
                            },  
                            shadowSize: 5
                        },
                        xaxis: {
                            mode: "time",
                            min: start_date,
                            max: end_date,
                            timeformat: "%b %d"
                        },
                        yaxis: {
                            min: 0,
                            max: maxY
                        },
                        grid: {
                            borderWidth:{
                                top: 1,
                                right: 1,
                                bottom: 2,
                                left: 2
                            },
                            //markings: [ { xaxis: { from: 0, to: 0 }, yaxis: { from: 0, to: maxY }, color: "#bb0000" }],
                            borderColor: "rgb(3,92,64)",
                            backgroundColor: "rgb(228,237,237)",
                            hoverable: true,
                            clickable: true
                        }
                    }
                );

            $("<div id='tooltip'></div>").css({
                position: "absolute",
                display: "none",
                border: "1px solid #fdd",
                padding: "2px",
                "background-color": "#fee",
                opacity: 0.80
            }).appendTo("body");

            $(".burndown-chart").bind("plothover", function (event, pos, item) {
                var x,
                    y,
                    tooltip_text = "";

                if (item) {
                    x = item.datapoint[0];
                    y = item.datapoint[1];

                    if(item.series.label === "ideal") {
                        if(x === start_date) {
                            tooltip_text = "Sprint start"
                        } else {
                            tooltip_text = "Sprint end"
                        }
                    } else {
                        if(item.dataIndex % 2 === 0) {
                            tooltip_text = "Issue completed<br>Story Points -" + item.series.data[item.dataIndex][2];
                        }
                    }

                    $("#tooltip").html(tooltip_text)
                        .css({top: item.pageY+5, left: item.pageX+5})
                        .fadeIn(200);
                } else {
                    $("#tooltip").hide();
                }
            });
        }

    });

})(app.Statistics);

