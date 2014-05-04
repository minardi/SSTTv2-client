/* User */

(function(module) {
        
    module.ModelView = Backbone.View.extend({            
  
        template: JST['app/scripts/User/UserTpl.ejs'],
         
        initialize: function(init_user) {
            this.model = new module.Model(init_user.user_content);  /*changed to 'init_user'*/    
            this.model.fetch();         
            this.render();           
        },

        render: function() {                       
            this.$el.html(this.template(this.model.toJSON()));            
            return this;
        },

        getId: function() {
            return this.model.get("id");
        },

        getRoleInProject: function(project_id) {
            return this.model.getRole(project_id);
        }
             
    });

})(app.User);

