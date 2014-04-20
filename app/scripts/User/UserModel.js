/* User */

(function(module) {
        
    module.Model = Backbone.Model.extend({       
        
        defaults: { /*defaults filled */
        	"first_name": "",
		    "last_name": "",
			"email": "",
			"password": "",
			"password_confirmation": ""
        }
        
    });

})(app.User);