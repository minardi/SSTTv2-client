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
<<<<<<< HEAD
            sstt.router.navigate(this.generateRout("planning"), {trigger: true});
=======
            this.element.html("");
            mediator.pub("ScrumPage:PlanningBoardSelected", this.element, this.model.get('project_id'));
>>>>>>> f14ef8fde6fb6ab9a5a5d0f261aed9a9dd26aad5
        },

        showScrumBoard: function() {
            sstt.router.navigate(this.generateRout("scrum-board"), {trigger: true});
        },

        showStat: function() {
            //
        },

<<<<<<< HEAD
        generateRout: function (page_name) {
            return "project/" + this.model.get("project_id") + "/scrum-page/" + page_name;
=======
        renderDefaultTab: function(project_id) {
            this.model.set('project_id', project_id);
            this.render();
            this.element = this.$el.find("#ScrumPage");

            this.showPlanning();
>>>>>>> f14ef8fde6fb6ab9a5a5d0f261aed9a9dd26aad5
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
