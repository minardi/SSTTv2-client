/* Confirmation */

(function(module) {
        
    module.ModelView = Backbone.View.extend({	     
		
        template: {
            "alert": JST['app/scripts/Confirmation/ConfirmationAlertTpl.ejs'],
            "confirm": JST['app/scripts/Confirmation/ConfirmationConfirmTpl.ejs'],
            "popup": JST['app/scripts/Confirmation/ConfirmationPopUpTpl.ejs']

        },

        events: {
            "click .access" : "accessAction",
            "click .deny" : "denyAction"
        },

        subscriptions: {
        },

        render: function(attributes) {
            this.params = attributes;

            this.$el.html(this.template[this.params.type](attributes));
            
            this.$el.toggleClass("hidden");
            $(".cover").toggleClass("hidden");

            if (this.params.type === "popup") {
                setTimeout(_.bind(function() {
                                        this.hideDialog();
                                        this.params.callback();
                                }, this), 2500);
            }

            return this;
        },

        accessAction: function() {
            this.params.accessCallback();
            this.hideDialog();
        },

        denyAction: function() {
            if (this.params.denyCallback) {
                this.params.denyCallback();
            }
            
            this.hideDialog();
        },

        hideDialog: function() {
            this.$el.toggleClass("hidden");
            $(".cover").toggleClass("hidden");
        }		

    });

})(app.Confirmation);
