/* Confirmation */

(function(module) {
        
    module.ModelView = Backbone.View.extend({	     
		
        template: {
            "confirm": JST['app/scripts/Confirmation/ConfirmationConfirmTpl.ejs'],
            "popup": JST['app/scripts/Confirmation/ConfirmationPopUpTpl.ejs'],
            "alert": JST['app/scripts/Confirmation/ConfirmationAlertTpl.ejs']

        },

        events: {
            "click .confirm" : "confirmAction",
            "click .decline" : "declineAction"
        },

        confirm: false,
/*
        render: function(attributes) {
            this.params = attributes;

            this.$el.html(this.template[this.params.type](attributes));
            
            this.$el.toggleClass("hidden");
            $(".cover").toggleClass("hidden");

            if (this.params.type === "popup") {
                setTimeout(_.bind(function() {
                                        this.hideDialog();
                                        if(this.params.callback) {
                                            this.params.callback();
                                        }
                                }, this), 2000);
            }

            return this;
        },*/

        render: function() {
            this.$el.removeClass("hidden");
            $(".cover").removeClass("hidden");
        },

        alert: function(attributes) {
            this.params = attributes;

            this.$el.html(this.template["alert"](attributes));
            this.render();
        },

        confirmAction: function() {
            this.params.confirmCallback();
            this.hideDialog();
        },

        declineAction: function() {
            if(this.params.declineCallback) {
                this.params.declineCallback();
            }
            
            this.hideDialog();
        },

        hideDialog: function() {
            this.$el.addClass("hidden");
            $(".cover").addClass("hidden");
        }		

    });

})(app.Confirmation);
