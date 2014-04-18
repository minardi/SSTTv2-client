/* DashBoard */

(function(module) {
        
    module.ModelView = Backbone.View.extend({

        tagName: "button",

        general_class: "btn btn-info glyphicon",

        events: {
            "click": "action"
        },
        
        action: function() {
            mediator.pub("DashBoard:Active" + this.model.get("content"), this.model.get("project_id"));
        },

        render: function () {
            this.$el.addClass(this.general_class);
            this.$el.addClass(this.model.get("type"));
            return this;
        }

    });
    
})(app.DashBoard);
