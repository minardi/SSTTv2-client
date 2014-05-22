/* User */

app.User = (function(sstt, content) {

    var view,
        Model,
        ModelView;

    Model = Backbone.Model.extend({       

        url: "/roles/for-user",
        
        defaults: {
            "first_name": "",
            "last_name": "",
            "roles": {} 
        },

        getRole: function() {            
            return this.get("roles")[sstt.current_project];
        }
        
    });
        
    ModelView = Backbone.View.extend({            
  
        template: JST['app/scripts/User/UserTpl.ejs'], 

        initialize: function() {
            this.model = new Model(content);   
        },

        subscriptions: {
            "TeamMembers:ChangeRole": "updateRoles"
        },

        render: function() {                
            this.$el.html(this.template(this.model.toJSON())); 
        },

        updateRoles: function() {
            this.model.once("change", this.updateRoleInProject, this)
                .fetch();
        },

        updateRoleInProject: function() {
            mediator.pub("User:ChangeRole");
        },

        _getId: function() {
            return this.model.id;
        },

        _getRoleInProject: function() {
            return this.model.getRole();
        },

        _checkRole: function(roles_access) {
            var role = this._getRoleInProject();

            return (_.indexOf(roles_access, role) !== -1);
        },

        _setElement: function(element) {
            this.setElement(element);
            this.render(); 
        }        

    });

    view = new ModelView();

    return {

        getId: function() {
            return view._getId();
        },

        getRoleInProject: function() {
            return view._getRoleInProject();
        },

        checkRole: function(roles_access) {
            return view._checkRole(roles_access);
        },

        setElement: function(element) {
            view._setElement(element);
        }

    };

})(sstt, current_user_content);