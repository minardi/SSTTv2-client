/* ScrumBoard */

(function (module) {

    module.ModelView = Backbone.View.extend({

        tagName: "div",

        className: "task",

        template: JST["app/scripts/ScrumBoard/ScrumBoardTpl.ejs"],

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
        }

    });

})(app.ScrumBoard);
