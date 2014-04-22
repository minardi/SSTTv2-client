/* ProductBacklog */

(function(module) {

    module.ModelView = Backbone.View.extend({

        model: module.Model,

        tagName: "div",

        className: "story-box",

        template: JST['app/scripts/ProductBacklog/ProductBacklogTpl.ejs'],

        events: {
           "dblclick" : "moveToSprint",
           "contextmenu" : "edit"
        },


        moveToSprint: function() {
            mediator.pub("ProductBacklog:MoveSprintBacklog", this.model);

            this.$el.remove();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        edit: function() {
            event.preventDefault();
            
            mediator.pub("ProductBacklog:EditStory", this.model);
        }

    });

})(app.ProductBacklog);
