/* DashBoard */

(function(module) {
        
    module.ModelView = Backbone.View.extend({

        tagName: "button",

        general_class: "btn btn-info glyphicon",

        events: {
            "click": "action"
        },
        
        action: function() {
            var content = this.model.get("content");
            
            mediator.pub("DashBoard:Active" + content, this.model.get("project_id"));
			mediator.pub("DashBoard:" + content);
        },

        render: function () {
            this.$el.addClass(this.general_class + ' ' + this.model.get("type"));

            return this;
        }

    });
    
})(app.DashBoard);
