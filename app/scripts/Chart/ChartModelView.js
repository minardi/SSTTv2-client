/* Chart */

(function(module) {
    var chart_data = [];

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
                    max: additional_data.max_y
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
        
        burndownChart: function(elem, raw_data, additional_data) {
            this.setElement(elem);
            initBurndownChartData(raw_data, additional_data);
            this.$el.plot(
                    [
                        { data: chart_data, label: "real"},
                        { data: [[additional_data.start_date, additional_data.max_y],[additional_data.end_date, 0]], label: "ideal"}
                    ],
                    burndownChartOptions(additional_data)
                );
        }
    });

})(app.Chart);
