/* Teams */

(function(module) {

    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/Teams/TeamsCollectionTpl.ejs'],

        subscriptions: {
            "DashBoard:ActiveTeam": "initTeam",
            "TeamPage:TeamSelected": "hide",
            "DashBoard:ActiveBack": "removeTeamPage",
            "DashBoard:ActiveBackFromTeamEditPage": "show"
        },

        initTeam: function(project_id) {
            sstt.user.setCurrentProject(project_id);
            this.teamsCollection = new module.Collection(project_id);
            this.listenTo(this.teamsCollection, "sync", this.render);
            this.teamsCollection.fetch(); 
        },

        render: function() {
            this.$el.append(this.template());
            this.teamsCollection.each(this.renderOne, this);
            return this;
        },

        renderOne: function(projectModel) {
            var project = new module.ModelView({
                    model: projectModel
                });

            this.$el.find(".content.team-page").append(project.render().el);
        },

        hide: function() {
            this.$el.addClass("hiddenTeams");
        },

        removeTeamPage: function() {
            this.$el.find(".team-page").remove();
        },

        show: function() {
            this.$el.removeClass("hiddenTeams");
        } 

    });

})(app.Teams);

