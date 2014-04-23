/* Projectinfo */

(function(module) {
        
    module.ModelView = Backbone.View.extend({        
        
        template: JST['app/scripts/Projectinfo/ProjectinfoTpl.ejs'],        
        
        subscriptions: {
            "SetProjectId": "showProjectInfo"          
        },

        showProjectInfo: function(project_id) {      
            this.model = new module.Model({
                project_id: project_id
            });   
            this.listenTo(this.model, "sync", this.render);
            this.listenTo(this.model, "sync", this.pubProjectInfo);
            this.model.fetch();
        },

        pubProjectInfo: function () {
            mediator.pub("Projectinfo:SetProjectInfo", this.model);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
  });
    
})(app.Projectinfo);
