/* User */

(function(module) {
        
    module.Model = Backbone.Model.extend({       

        url: "/users/get_roles",
        
        defaults: {
        	"first_name": "",
		    "last_name": "",
			"email": "",
			"password": "",
			"password_confirmation": "",
            "roles": "" 
        },

        getRole: function(project_id) {
            return this.get("roles")[project_id];
        }
        
    });

})(app.User);