/* SprintBacklogStories */

;(function(module) {

    module.ModelView = Backbone.View.extend({

        tagName: "div",

        className: "story-box",

        template: JST['app/scripts/SprintBacklogStories/SprintBacklogStoriesTpl.ejs'],

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    })

})(app.SprintBacklogStories);
