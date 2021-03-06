/* PlanningBoard */

(function(module, sstt) {
    module.ModelView = Backbone.View.extend({
        
        template: JST["app/scripts/PlanningBoard/PlanningBoardTpl.ejs"],

        events: {
            "click .start-sprint": "addSprint"
        },

        subscriptions: {
            "ScrumPage:PlanningBoardSelected": "backlogsInit",
            "SprintBacklog:EmptySprintBacklog": "hideStartSprint",
            "SprintBacklog:FilledSprintBacklog": "showStartSprint",
            "BacklogItemEdit:NeedToRerenderView": "addSprint"
        },

        backlogsInit: function() {
            var elem = sstt.scrum_page.element;
            
            sstt.current_project = sstt.current_project;
            this.setElement(elem);
            this.render();

            mediator.pub("PlanningBoard:InitProductBacklog", this.$(".product-backlog"), sstt.current_project);
            mediator.pub("PlanningBoard:InitSprintBacklog", this.$(".sprint-backlog"), sstt.current_project);
        },

        render: function() {
            this.$el.html(this.template({"role": sstt.user.getRoleInProject()}));
            this.$start_sprint = this.$(".start-sprint");

            return this;
        },

        addSprint: function() {
            var attributes = {
                "item_type": "sprint",
                "status": "active",
                "parent_id": sstt.current_project,
                "start_date" : "yyyy/mm/dd",
                "end_date" : "yyyy/mm/dd"
            };
            
            mediator.pub("PlanningBoard:CreateNewItem", attributes);
        },

        hideStartSprint: function() {
            this.$start_sprint.attr("disabled", "disabled");
        },

        showStartSprint: function() {
            this.$start_sprint.removeAttr("disabled");
        }

    });

})(app.PlanningBoard, sstt);
