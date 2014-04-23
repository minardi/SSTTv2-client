/* PlanningBoard */

(function(module) {
    module.ModelView = Backbone.View.extend({
        
        template: JST["app/scripts/PlanningBoard/PlanningBoardTpl.ejs"],

        subscriptions: {
            "ScrumPage:PlanningBoardSelected": "backlogsInit"
        },

        backlogsInit: function(elem, project_id) {
            this.setElement(elem);
            this.render();

            mediator.pub("PlanningBoard:InitProductBacklog", this.$(".product"), project_id);
            mediator.pub("PlanningBoard:InitSprintBacklog", this.$(".sprint"), project_id);
        },

        render: function() {
            this.$(".product").remove();
            this.$(".sprint").remove();

            this.$el.append(this.template());

            return this;
        }

    });

})(app.PlanningBoard);
