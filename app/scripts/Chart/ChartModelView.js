/* Chart */

(function(module) {
    var chart_data = [],
        plot;

    function initBurndownChartData(raw_data, additional_data) {
        var current_x,
            current_y;

        current_x = additional_data.start_date;
        current_y = additional_data.max_y;

        chart_data.push([current_x, current_y]);
    
        _.each(raw_data, function(val) {
                current_x = val[0];
                chart_data.push([current_x, current_y, val[1]]);
                current_y -= val[1];
                chart_data.push([current_x, current_y, val[1]]);
            }, this);

        if(current_y === 0) {
            chart_data.push([additional_data.end_date, 0]);
        }
    }

    function burndownChartOptions(additional_data) {
        return {
                series: {
                    lines: {show: true},
                    points: {show: true},
                    shadowSize: 5
                },
                xaxis: {
                    mode: "time",
                    min: additional_data.start_date,
                    max: additional_data.end_date,
                    timeformat: "%b %d"
                },
                yaxis: {
                    min: 0,
                    max: additional_data.max_y + 1
                },
                grid: {
                    borderWidth:{
                        top: 1,
                        right: 1,
                        bottom: 2,
                        left: 2
                    },
                    borderColor: "rgb(3,92,64)",
                    backgroundColor: "rgb(228,237,237)",
                    hoverable: true,
                    clickable: true
                }
            }
    }

    module.ModelView = Backbone.View.extend({
        template: JST["app/scripts/Chart/BurndownTooltipTpl.ejs"],

        events: {
            "change .sprint-list": "selectSprint"
        },

        events: {
            "plothover": "showBurndownTooltip",
        },

        burndownChart: function(elem, raw_data, additional_data) {
            this.setElement(elem);

            chart_data = [];
            initBurndownChartData(raw_data, additional_data);

            this.start_sprint = [chart_data[0][0], chart_data[0][1]];
            this.end_sprint = [_.last(chart_data)[0], _.last(chart_data)[1]];

            plot = this.$el.plot(
                    [
                        { data: [[additional_data.start_date, additional_data.max_y],[additional_data.end_date, 0]], label: "ideal", color: "rgb(175,216,248)"},
                        { data: chart_data, label: "real", color: "rgb(237,194,64)"}
                    ],
                    burndownChartOptions(additional_data)
                ).data("plot");

            this.$el.append(this.template());
            this.$tooltip = this.$(".burndown-chart-tooltip");
        },

        showBurndownTooltip: function (event, pos, item) {
            var x,
                y,
                tooltip_text = "";

            if (item) {
                x = item.datapoint[0];
                y = item.datapoint[1];

                if(x === this.start_sprint[0] && y === this.start_sprint[1]) {
                    tooltip_text = "Sprint start<br>Story Points " + y;
                } else {
                    if(x === this.end_sprint[0] && y === this.end_sprint[1]) {
                        tooltip_text = "Sprint end";
                    } else {
                        if(item.dataIndex % 2 === 0) {
                            tooltip_text = "Issue completed<br>Story Points -" + item.series.data[item.dataIndex][2];
                        }
                    }
                }

                if(tooltip_text){
                    this.$tooltip.html(tooltip_text)
                        .css({top: item.pageY-225, left: item.pageX-335})
                        .fadeIn(200);
                }
            } else {
                this.$tooltip.hide();
            }
        }
    });
})(app.Chart);
