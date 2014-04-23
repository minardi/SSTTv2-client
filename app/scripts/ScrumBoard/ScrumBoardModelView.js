/* ScrumBoard */

(function (module) {

    module.ModelView = Backbone.View.extend({

        template: JST["app/scripts/ScrumBoard/ScrumBoardTpl.ejs"],

        events: {
            "click .arrow-left": "moveLeft",
			"click .arrow-right": "moveRight"
        },
		
		initialize: function() {
			this.status = ["todo", "progress", "verify", "done"];
			this.current_status = this.status.indexOf(this.model.get("status"));
			console.log(this.current_status);
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
			this.model.set("status", this.status[this.current_status]);
			console.log(this.status[this.current_status]);
			mediator.pub("ScrumBoard:TaskMoved", this.model);
			this.remove();
		}
		
    });

})(app.ScrumBoard);
