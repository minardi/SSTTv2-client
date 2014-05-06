/* DashBoard */

(function(module) {
        
    module.ModelView = Backbone.View.extend({

        tagName: "button",

        general_class: "btn btn-info glyphicon",

        events: {
            "click": "action"
        },
		
		subscriptions: {
			"module:UnitSelected": "count_up",
			"module:UnitDeselected": "count_down",
		},
		
		initialize: function() {
			this.items_selected = 0;
		},
        
        action: function() {
            mediator.pub("DashBoard:Active" + this.model.get("content"), this.model.get("project_id"));
			mediator.pub("DashBoard:" + this.model.get("content"));
        },
		
		count_up: function() {
			this.items_selected++;
			
			if (this.items_selected > 1) {
				this.$(".config").addClass("hidden");
			} else {
				//this.$(".config").removeClass("hidden");
			}
			
		},
		
		count_down: function() {
			this.items_selected--;
			
			if (this.items_selected > 1) {
				this.$(".config").addClass("hidden");
			} else {
				//this.$(".config").removeClass("hidden");
			}
			
		},

        render: function () {
            this.$el.addClass(this.general_class);
            this.$el.addClass(this.model.get("type"));
            return this;
        }

    });
    
})(app.DashBoard);
