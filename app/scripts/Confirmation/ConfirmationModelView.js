/* Confirmation */

(function(module) {
        
    module.ModelView = Backbone.View.extend({	     
		
        template: JST['app/scripts/Confirmation/ConfirmationTpl.ejs'],        
 	
        initialize: function() {
        },

        events: {
        },

        subscriptions: {
        },	

        render: function() {
            
            return this;
        }		

    });

})(app.Confirmation);
