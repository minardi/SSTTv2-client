/* ScrumBoard */

(function (module) {

    module.ModelView = Backbone.View.extend({

        tagName: "div",

        className: "task",

        template: JST["app/scripts/ScrumBoard/ScrumBoardTpl.ejs"],

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });

})(app.ScrumBoard);
