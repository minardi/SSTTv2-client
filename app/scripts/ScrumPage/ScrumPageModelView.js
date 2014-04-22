/* ScrumPage */

(function(module) {
    module.ModelView = Backbone.View.extend({

        template: JST["app/scripts/ScrumPage/ScrumPageTpl.ejs"],
		
        events: {
            "click #planning": "showPlanning",
            "click #scrumboard": "showScrumBoard",
            "click #stat": "showStat"
        },

        subscriptions: {
            "DashBoard:ActiveTeam": "removeScrumPage",
            "DashBoard:ActiveBack": "removeScrumPage"
        },

        initialize: function (options) {
            this.model.set("project_id", options.project_id);
        },

        showPlanning: function() {
            sstt.router.navigate(this.generateRout("planning"));
        },

        showScrumBoard: function() {
            sstt.router.navigate(this.generateRout("scrum-board"));
        },

        showStat: function() {
            mediator.pub("ScrumPage:StatBoardSelected", {
                el: this.$content,
                project_id: this.model.get("project_id")
            });
        },
        
         render: function() {
            this.$el.html(this.template());
            this.$content = this.$(".content");
            return this;
        },

        generateRout: function (page_name) {
            return "project/" + this.model.get(project_id) + "/scrum-page/" + page_name;
        }
        
    });
})(app.ScrumPage);
