/* ScrumBoard */

(function (module) {

    module.ModelView = Backbone.View.extend({

        template: JST["app/scripts/ScrumBoard/ScrumBoardTpl.ejs"],
        
        events: {
            "click .arrow-left": "moveLeft",
            "click .arrow-right": "moveRight"
        },

        initialize: function (init_data) {
            this.status = ["todo", "progress", "verify", "done"];
            this.current_status = this.status.indexOf(this.model.get("status"));
            this.permission = init_data["permission"];
        },
        
        render: function () {
            this.$el.html(this.template(this.model.toJSON()))
                .addClass(this.getClassName());

            return this;
        },

        getClassName: function () {
            var status = this.model.get("status"),
                status_map = {
                    "todo": "left",
                    "done": "right"
                };

            return status_map[status];
        },
        
        moveLeft: function () {
            if (this.permission) {        
                this.current_status--;
                this.updateStatus();
            }

            if (this.model.get("status") === "verify") {
                mediator.pub("ScrumBoard:TaskLeftDone");
            }
        },
        
        moveRight: function () {            
            if (this.permission) {            
                this.current_status++;
                this.updateStatus();
            }
        },
        
        updateStatus: function() {
            this.model.set("status", this.status[this.current_status]);            
            this.model.save().success(_.bind(function () {
                mediator.pub("ScrumBoard:TaskMoved", this.model);
            }, this));
            this.remove();
        }

    });

})(app.ScrumBoard);
