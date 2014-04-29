/* PlanningBoard */

(function(module) {
    module.ModelView = Backbone.View.extend({
        
        template: JST["app/scripts/PlanningBoard/PlanningBoardTpl.ejs"],

        events: {
            "click .start-sprint": "addSprint"
        },

        subscriptions: {
            "ScrumPage:PlanningBoardSelected": "backlogsInit"
        },

        backlogsInit: function(elem, project_id) {
            this.project_id = project_id;
            this.setElement(elem);
            this.render();

            mediator.pub("PlanningBoard:InitProductBacklog", this.$(".product-backlog"), project_id);
            mediator.pub("PlanningBoard:InitSprintBacklog", this.$(".sprint-backlog"), project_id);
        },

        render: function() {
            this.$el.append(this.template());

            return this;
        },

        addSprint: function() {
            var attributes = {
                "item_type": "sprint",
                "parent_id": this.project_id,
                "start_at" : "dd.mm.yyyy",
                "end_at" : "dd.mm.yyyy"
            };
            
            mediator.pub("PlanningBoard:CreateNewItem", attributes);
        }

    });

})(app.PlanningBoard);
