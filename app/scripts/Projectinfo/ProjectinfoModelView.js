/* Projectinfo */

(function(module) {
        
    module.ModelView = Backbone.View.extend({        
        
        template: JST['app/scripts/Projectinfo/ProjectinfoTpl.ejs'],        
        
        subscriptions: {
            "ProjectPage:ProjectChecked": "showProjectInfo",
        },

        showProjectInfo: function(project_model) {
            this.model = project_model; 
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
  });
    
})(app.Projectinfo);
