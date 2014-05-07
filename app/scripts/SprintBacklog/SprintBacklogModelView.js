/* SprintBacklog */

(function(module) {

    module.ModelView = Backbone.View.extend({

        tagName: "div",

        className: "story-box",

        template: JST['app/scripts/SprintBacklog/SprintBacklogTpl.ejs'],

        events: {
        	"dblclick": "restoreToProduct"
        },

        restoreToProduct: function () {
        	this.remove();
        	mediator.pub("SprintBacklog:RestoreStory", this.model);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    })

})(app.SprintBacklog);