/* Projects */

(function(module) {

    module.ModelView = Backbone.View.extend({

        tagName: "div",
        
        className: "box",
        
        template: JST['app/scripts/Projects/ProjectsTpl.ejs'],
        
        events: {
            "dblclick": "selectProject",
            "click": "showProjectInfo",
        },

        selectProject: function() {
            mediator.pub("ProjectPage:ProjectSelected", this.model.id, this.getCurrentUserRole());
        },
        
        showProjectInfo: function() {
            mediator.pub("ProjectPage:ProjectChecked", this.model);
            this.$el.siblings().removeClass("active-tab"); 
            this.$el.addClass("active-tab"); 
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        getCurrentUserRole: function() {
            return this.model.get("role");
        }

    });

})(app.Projects);
