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
<<<<<<< HEAD
        
        showProjectInfo: function() {
            sstt.current_project = this.model.id;
            mediator.pub("ProjectPage:ProjectChecked", this.model);
            this.$el.siblings().removeClass("active-tab"); 
            this.$el.addClass("active-tab"); 
=======
		
		checkProject: function() {
			sstt.current_project = this.model.id;
			this.$el.siblings().removeClass("active-tab"); 
            this.$el.addClass("active-tab");
			mediator.pub("ProjectPage:ProjectChecked", this.model, "project");
>>>>>>> a37ff20cb92f822996fe2a2b0fd39daf395dce57
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

})(app.Projects);
