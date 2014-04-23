/* ScrumBoard */

(function (module) {

    module.ModelView = Backbone.View.extend({

        /*tagName: "div",

        className: "task",*/

        template: JST["app/scripts/ScrumBoard/ScrumBoardTpl.ejs"],

        events: {
            "click .arrow-left": "moveLeft",
			"click .arrow-right": "moveRight"
        },
		
		initialize: function() {
			this.status = ["todo", "progress", "verify", "done"];
			this.current_status = status.indexOf(this.model.get("status"));
		},
		
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		
		moveLeft: function() {
			this.current_status--;
			this.updateStatus();
		},
		
		moveRight: function() {
			this.current_status++;
			this.updateStatus();
		},
		
		updateStatus: function() {
			this.model.set("status", status[this.current_status]);
			this.remove();
		}
		
		/* ORIGINAL LEGACY PERFECT DECISION! - I'm lovin it! :)
		moveTask: function(event) {

		var state = ["todo", "in-progress", "to-verify", "done"],
			status_index = state.indexOf(this.model.get("status"));
			
		if($(event.target).hasClass("arrow-right")) {
			status_index++;
		} else if ($(event.target).hasClass("arrow-left")) {
			status_index--;
		};
		
		this.model.set("status", state[new_status_index]);
		mediator.pub("ScrumBoard:moveTask", this.model);
		this.remove();
		}
		*/
		
    });

})(app.ScrumBoard);
