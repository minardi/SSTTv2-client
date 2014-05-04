/* Projectinfo */

(function(module) {
        
    module.ModelView = Backbone.View.extend({        
        
        template: JST['app/scripts/Projectinfo/ProjectinfoTpl.ejs'],        
        
        subscriptions: {
            "ProjectPage:ProjectChecked": "showProjectInfo",
            "User:RoleChanged": "setRole"
        },

        showProjectInfo: function(project_model) {
            this.model = project_model; 
            this.render();
        },

        setRole: function(role, project_id) {
            if(this.model.id === project_id) {
                this.model.set("role");
                this.render();
            }
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
  });
    
})(app.Projectinfo);
