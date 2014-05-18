/* Projects */

(function(module) {

    module.ModelView = Backbone.View.extend({

        tagName: "div",
        
        className: "box",
        
        template: JST['app/scripts/Projects/ProjectsTpl.ejs'],
        
        events: {
            "dblclick": "selectProject",
			"click": "checkProject"
        },

        selectProject: function() {
            mediator.pub("ProjectPage:ProjectSelected", this.model.id);
        },

		checkProject: function() {
			sstt.current_project = this.model.id;
			this.$el.siblings().removeClass("active-tab"); 
            this.$el.addClass("active-tab");
			mediator.pub("ProjectPage:ProjectChecked", this.model, "project");
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

})(app.Projects);
