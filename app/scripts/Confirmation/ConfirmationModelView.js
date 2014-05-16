/* Confirmation */

(function(module) {
        
    module.ModelView = Backbone.View.extend({	     
		
        template: {
            "alert": JST['app/scripts/Confirmation/ConfirmationAlertTpl.ejs'],
            "confirm": JST['app/scripts/Confirmation/ConfirmationConfirmTpl.ejs'],
            "popup": JST['app/scripts/Confirmation/ConfirmationPopUpTpl.ejs']

        },        
 	
        initialize: function() {
            this.$el = $(".message-container");
        },

        events: {
        },

        subscriptions: {
        },	

        render: function(attributes) {

            this.$el.html(this.template[attributes.type](attributes));
            this.$el.toggleClass("hidden");

            return this;
        }		

    });

})(app.Confirmation);
