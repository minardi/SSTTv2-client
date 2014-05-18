/* DashBoard */

(function(module) {
        
    module.ModelView = Backbone.View.extend({

        tagName: "button",

        general_class: "btn btn-info glyphicon",

        events: {
            "click": "action"
        },
		 
        action: function() {
			mediator.pub("DashBoard:" + this.model.get("btn_content"), sstt.current_project);
        },

        render: function () {
            this.$el.addClass(this.general_class + ' ' + this.model.get("btn_type"));

            return this;
        }

    });
    
})(app.DashBoard);
