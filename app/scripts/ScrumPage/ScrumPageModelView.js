/* ScrumPage */

(function(module) {
    module.ModelView = Backbone.View.extend({

        template: JST["app/scripts/ScrumPage/ScrumPageTpl.ejs"],
		
        events: {
            "click #planning": "showPlanning",
            "click #scrumboard": "showScrum",
            "click #stat": "showStat"
        },

        subscriptions: {
            "ProjectPage:ProjectSelected": "renderDefaultTab",
            "DashBoard:ActiveTeam": "removeScrumPage",
            "DashBoard:ActiveBack": "removeScrumPage"
        },

        showPlanning: function() {
            this.element.html("");
            mediator.pub("ScrumPage:PlanningBoardSelected", this.element, this.model.get("id_of_project"));
        },

        showScrum: function() {
            mediator.pub("ScrumPage:ScrumBoardSelected", this.element);
        },

        showStat: function() {
            mediator.pub("ScrumPage:StatBoardSelected", this.element);
        },

        renderDefaultTab: function(project_id) {
            var self = this;
            this.model.set({id_of_project: project_id});
            this.render();
            this.element = this.$el.find("#ScrumPage");

            setTimeout(function () {
                self.showPlanning();
            }, 0);
        },
        
         render: function() {
            this.$el.append(this.template());
            return this;
        },
        
        removeScrumPage: function() {
            this.$el.find(".scrum-page").remove();
        }
        
    });
})(app.ScrumPage);
