/* DatePicker */

(function(module) {
        
    module.ModelView = Backbone.View.extend({

        render: function() {
            $(".start-date").datepicker();
            $(".end-date").datepicker();               
        }

    });

})(app.DatePicker);