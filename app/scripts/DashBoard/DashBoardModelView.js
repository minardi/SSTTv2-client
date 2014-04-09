/* DashBoard */

(function(module) {
        
    module.ModelView = Backbone.View.extend({

        tagName: "button",

        template: JST["app/scripts/DashBoard/DashBoardTpl.ejs"],

        events: {
            "click": "action"
        },
        
        action: function() {
            mediator.pub("DashBoard:Active" + this.model.get("content"), this.model.get("project_id"));
        }

    });
    
})(app.DashBoard);
