/* Projects */

(function(module) {

    module.ModelView = Backbone.View.extend({

        tagName: "div",
        
        className: "box",
        
        template: JST['app/scripts/Projects/ProjectsTpl.ejs'],
        
        events: {
            "dblclick": "selectProject",
            "click": "checkProject",
        },

        selectProject: function() {
            sstt.router.navigate( "project/" + this.model.get("id") + "/scrum-page/planning", {trigger: true});
        },
        
        checkProject: function() {
            mediator.pub("Projects:OneProjectChecked", this.model);
            mediator.pub("SetProjectId", this.model.get("id"));
            this.$el.siblings().removeClass("active-tab"); 
            this.$el.addClass("active-tab"); 
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

})(app.Projects);
