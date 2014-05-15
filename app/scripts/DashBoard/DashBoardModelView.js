/* DashBoard */

(function(module) {
        
    module.ModelView = Backbone.View.extend({

        tagName: "button",

        general_class: "btn btn-info glyphicon",

        events: {
            "click": "action"
        },
		 
        action: function() {
			mediator.pub("DashBoard:" + this.model.get("content"));
        },

        render: function () {
            this.$el.addClass(this.general_class + ' ' + this.model.get("type"));

            return this;
        }

    });
    
})(app.DashBoard);
