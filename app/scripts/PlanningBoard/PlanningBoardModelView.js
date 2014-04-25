/* PlanningBoard */

(function(module) {
    module.ModelView = Backbone.View.extend({
        
        template: JST["app/scripts/PlanningBoard/PlanningBoardTpl.ejs"],

        subscriptions: {
            "ScrumPage:PlanningBoardSelected": "backlogsInit"
        },

        events: {
            "click .start-sprint": "addSprint"
        },

        backlogsInit: function(elem, project_id) {
            this.project_id = project_id;
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
        },

        addSprint: function() {
            var attributes = {
                "item_type": "sprint",
                "parent_id": this.project_id
            };
            
            mediator.pub("ProductBacklog:CreateNewItem", attributes);
        },

    });

})(app.PlanningBoard);
