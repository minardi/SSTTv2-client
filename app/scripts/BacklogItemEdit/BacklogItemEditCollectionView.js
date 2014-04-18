/* BacklogItemEdit */

(function(module) {
        
     module.CollectionView = Backbone.View.extend({	     
		
        template: JST['app/scripts/BacklogItemEdit/BacklogItemEditCollectionTpl.ejs'],        
 		
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

})(app.BacklogItemEdit);

