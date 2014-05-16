/* User */

app.User = (function(sstt, user_content) {

    var view,
        model,
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
            model = new Model(user_content);   
            model.fetch();           
        },

        subscriptions: {
            "TeamMembers:ChangeRole": "updateRoles"
        },

        render: function() {                
            this.$el.html(this.template(model.toJSON())); 
        },

        updateRoles: function() {
            model.once("change", this.updateRoleProject, this)
                .fetch();
        },

        updateRoleProject: function() {
            mediator.pub("User:ChangeRole");
        },

        _getId: function() {
            return model.id;
        },

        _getRoleInProject: function() {
            return model.getRole();
        },

        _checkRole: function(roles_access) {
            var role = this._getRoleInProject();

            return (_.indexOf(roles_access, role) !== -1);
        },

        _setElement: function(element) {
            this.$el = element;
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

        setElem: function(element) {
            view._setElement(element);
        }

    };

})(sstt, current_user_content);