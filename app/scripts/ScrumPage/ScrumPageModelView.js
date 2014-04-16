/* ScrumPage */

(function(module) {
    module.ModelView = Backbone.View.extend({

        template: JST["app/scripts/ScrumPage/ScrumPageTpl.ejs"],

        subscriptions: {
            "ProjectPage:ProjectSelected": "renderDefaultTab",
            "DashBoard:ActiveTeam": "removeScrumPage",
            "DashBoard:ActiveBack": "removeScrumPage"
        },
		
        events: {
            "click #planning": "showPlanning",
            "click #scrumboard": "showScrum",
            "click #stat": "showStat"
        },

        renderDefaultTab: function(project_id) {
            var self = this;

            this.render();
            this.$container = this.$(".scrum-page");
            
            setTimeout(function () {
                self.showPlanning();
            }, 0)
            
        },
        
        render: function() {
            this.$el.html(this.template());

            return this;
        },
        
        removeScrumPage: function() {
            this.remove();
        },

        showPlanning: function() {
            mediator.pub("ScrumPage:PlanningBoardSelected", this.$container);
        },

        showScrum: function() {
            mediator.pub("ScrumPage:ScrumBoardSelected", this.$container);
        },

        showStat: function() {
            mediator.pub("ScrumPage:StatBoardSelected", this.$container);
        }
    });
})(app.ScrumPage);
