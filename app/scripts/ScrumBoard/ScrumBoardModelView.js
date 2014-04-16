/* ScrumBoard */

(function (module) {

    module.ModelView = Backbone.View.extend({

        tagName: "div",

        className: "task",

        template: JST["app/scripts/ScrumBoard/ScrumBoardTpl.ejs"],

        events: {
            "click": "moveTask"
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            switch (this.model.get("status")){
                case "todo":
                    this.renderArrowRight();
                    break;
                case "done":
                    this.renderArrowLeft();
                    break;
                default: 
                    this.renderArrowLeft();
                    this.renderArrowRight();
            }
            return this;
        },

       
        renderArrowLeft: function() {
            this.$el.append("<div class='arrow-left glyphicon glyphicon-chevron-left'> </div> ");
        },

        renderArrowRight: function() {
            this.$el.append("<div class='arrow-right glyphicon glyphicon-chevron-right'> </div> ");
        },

        moveTask: function(event) {
            console.log();
            var state = ["todo", "in-progress", "to-verify", "done"],
                new_status_index = state.indexOf(this.model.get("status"));
            if($(event.target).hasClass("arrow-right")) {
                new_status_index++;
            };
            if($(event.target).hasClass("arrow-left")) {
                new_status_index--;
            };
            this.model.set("status", state[new_status_index]);
            mediator.pub("ScrumBoard:moveTask", this.model);
            this.remove();
        }

    });

})(app.ScrumBoard);
