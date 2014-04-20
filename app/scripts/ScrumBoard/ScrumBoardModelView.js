/* ScrumBoard */

(function (module) {

    module.ModelView = Backbone.View.extend({

        tagName: "div",

        className: "task",

        template: JST["app/scripts/ScrumBoard/ScrumBoardTpl.ejs"],

        events: {
            "click": "moveTask"
        }
    });

})(app.ScrumBoard);
