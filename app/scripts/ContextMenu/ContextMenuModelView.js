/* ContextMenu */

(function(module) {
        
    module.ModelView = Backbone.View.extend({

        tagName: "button",

        general_class: "btn btn-info glyphicon",

        events: {
            "click": "action"
        },
		
		subscriptions: {
			"module:deselectAllUnits": "hideBtn",
			"module:UnitSelected": "showBtn"
		},
		 
        action: function() {
			mediator.pub("ContextMenu:" + this.model.get("btn_content"), sstt.current_project);
        },
		
		hideBtn: function() {
			if (this.model.get("btn_type") !== "back" && this.model.get("btn_type") !== "team") {
				this.$el.addClass("hidden");
			}
		},
		
		showBtn: function() {
			if (this.model.get("btn_type") !== "back" && this.model.get("btn_type") !== "team") {
				this.$el.removeClass("hidden");
			}
		},

        render: function () {
            this.$el.addClass(this.general_class + ' ' + this.model.get("btn_type"));

            return this;
        }

    });
    
})(app.ContextMenu);
