/* ScrumBoard */

(function (module) {

    module.ModelView = Backbone.View.extend({

        template: JST["app/scripts/ScrumBoard/ScrumBoardTpl.ejs"],
		
        events: {
            "click .arrow-left": "moveLeft",
			"click .arrow-right": "moveRight"
        },

		initialize: function(init_data) {
			this.status = ["todo", "progress", "verify", "done"];
			this.current_status = this.status.indexOf(this.model.get("status"));
			this.role = init_data["role"];
		},
		
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.addClass(this.getClassName());
			return this;
		},

		getClassName: function () {
			var status = this.model.get("status"),
				className;

			if (status === "todo") {
				className = "left";
			} else if (status === "done") {
				className = "right";
			}

			return className;
		},
		
		moveLeft: function() {
			if(this.role === "developer" || this.role === "techlead") {				
				this.current_status--;
				this.updateStatus();
			}
		},
		
		moveRight: function() {
			if(this.role === "developer" || this.role === "techlead") {				
				this.current_status++;
				this.updateStatus();
			}
		},
		
		updateStatus: function() {
			this.model.set("status", this.status[this.current_status]);
			mediator.pub("ScrumBoard:TaskMoved", this.model);
			this.model.save(); 
			this.remove();
		}
		
    });

})(app.ScrumBoard);
