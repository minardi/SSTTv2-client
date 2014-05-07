/* User */

(function(module) {
        
    module.ModelView = Backbone.View.extend({            
  
        template: JST['app/scripts/User/UserTpl.ejs'],
         
        initialize: function(init_user) {
            this.model = new module.Model(init_user.user_content);             
            this.model.fetch();         
            this.render();           
        },

        subscriptions: {
            "TeamMembers:ChangeRole": "updateRoles"
        },

        render: function() {                       
            this.$el.html(this.template(this.model.toJSON()));            
            return this;
        },

        updateRoles: function() {
            this.model.on("change", this.updateRole, this);  
            this.model.fetch();          
        },

        updateRole: function() {
            mediator.pub("User:ChangeRole");
        },

        getId: function() {
            return this.model.get("id");
        },

        getRoleInProject: function() {
            return this.model.getRole();
        },

        setCurrentProject: function(project_id) {
            this.model.set("current_project", project_id);
        },

        getCurrentProject: function() {
            return this.model.get("current_project");
        }
             
    });

})(app.User);

