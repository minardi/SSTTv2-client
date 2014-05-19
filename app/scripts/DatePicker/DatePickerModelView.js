/* DatePicker */

(function(module) {
        
    module.ModelView = Backbone.View.extend({

        render: function() {
            $(".input-daterange").datepicker({
            	format: "yyyy/mm/dd",
            	daysOfWeekDisabled: "0,6",
            	todayHighlight: true,
            	autoclose: true
            });        
        }

    });

})(app.DatePicker);