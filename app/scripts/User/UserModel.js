/* User */

(function(module) {
        
    module.Model = Backbone.Model.extend({       

        url: "/users/get_roles",
        
        defaults: {
        	"first_name": "",
		    "last_name": "",
            "current_project": "",
            "roles": "" 
        },

        getRole: function() {
            var project_id = this.get("current_project");
            
            return this.get("roles")[project_id];
        }
        
    });

})(app.User);