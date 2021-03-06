/* Teams */

(function(module, sstt) {

    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/Teams/TeamsCollectionTpl.ejs'],

        subscriptions: {
            "ContextMenu:Team": "initTeam",
            "TeamPage:TeamSelected": "hide",
            "ContextMenu:Back": "removeTeamPage",
            "ContextMenu:BackFromTeamEditPage": "show"
        },

        initTeam: function() {
            this.teamsCollection = new module.Collection(sstt.current_project);
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

})(app.Teams, sstt);

