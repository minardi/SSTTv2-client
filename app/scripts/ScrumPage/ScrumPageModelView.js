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
            "DashBoard:ActiveTeam": "navigateTeams"
        },

        initialize: function (options) {
            this.model = new module.Model();
            this.model.set("project_id", options.project_id);
        },

        showPlanning: function() {
            sstt.router.navigate(this.generateRout("planning"), {trigger: true});
        },

        showScrumBoard: function() {
            sstt.router.navigate(this.generateRout("scrum-board"), {trigger: true});
        },

        showStat: function() {
            //
        },

        generateRout: function (page_name) {
            return "project/" + this.model.get("project_id") + "/scrum-page/" + page_name;
        },
        
        render: function() {
            this.$el.html(this.template());
            this.$content = this.$(".content");
            return this;
        },

        navigateTeams: function () {
            sstt.router.navigate("project/" + this.model.get("project_id") + "/teams", {trigger:true});
        }
        
    });
})(app.ScrumPage);
