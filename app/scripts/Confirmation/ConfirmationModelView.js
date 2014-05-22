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

        render: function() {
            this.$el.removeClass("hidden");
            $(".cover").removeClass("hidden");
        },

        confirm: function(attributes) {
            this.params = attributes;
            this.params.type = "confirm";

            this._dialog();
        },

        alert: function(attributes) {
            this.params = attributes;
            this.params.type = "alert";


            this._dialog();
        },

        _dialog: function() {
            this.$el.html(this.template[this.params.type](this.params));
            this.render();
        },

        popup: function(attributes) {
            this.$el.html(this.template["popup"](attributes));
            this.$el.removeClass("hidden");

            _.delay(_.bind(this.hideDialog, this), 1500);
        },

        confirmAction: function() {
            this.hideDialog();

            this.params.confirmCallback();
        },

        declineAction: function() {
            this.hideDialog();

            if(this.params.declineCallback) {
                this.params.declineCallback();
            }
        },

        hideDialog: function() {
            this.$el.addClass("hidden");
            $(".cover").addClass("hidden");
        }		

    });

})(app.Confirmation);
