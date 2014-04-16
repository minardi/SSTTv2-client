/* SprintBacklog */

(function(module) {

    module.ModelView = Backbone.View.extend({

        tagName: "div",

        className: "story-box",

        template: JST['app/scripts/SprintBacklog/SprintBacklogTpl.ejs'],

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    })

})(app.SprintBacklog);