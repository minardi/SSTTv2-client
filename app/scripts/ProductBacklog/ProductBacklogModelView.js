/* ProductBacklog */

(function(module) {

    module.ModelView = Backbone.View.extend({

        model: module.Model,

        tagName: "div",

        className: "story-box",

        template: JST['app/scripts/ProductBacklog/ProductBacklogTpl.ejs'],

        /*events: {
           "dblclick" : "moveToSprint"
        },*/

        /*moveToSprint: function() {
            mediator.pub("ProductBacklog:MoveStory", this.model);
            this.$el.remove();
        },*/

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

})(app.ProductBacklog);