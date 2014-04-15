/* Projects */

(function(module) {
        
    module.CollectionView = Backbone.View.extend({
     
        template: JST['app/scripts/Projects/ProjectsCollectionTpl.ejs'],

        subscriptions: {
            "ProjectPage:ProjectSelected": "hide",
            "DashBoard:ActiveTeam": "hide",
            "DashBoard:ActiveBack": "show"
        },

        initialize: function() {
            this.projectsCollection = new module.Collection();
            this.projectsCollection.fetch();
            
            this.listenTo(this.projectsCollection, "sync", this.render);
        },

        render: function() {
            this.$el.append(this.template());
            this.projectsCollection.each(this.renderOne, this);

            return this;
        },

        renderOne: function(project_model) {
            var project = new module.ModelView({
                    model: project_model
                });

            this.$el.find(".content").append(project.render().el);
        },

        hide: function() {
            this.$el.addClass("hiddenProjects");
        },

        show: function() {
            this.$el.removeClass("hiddenProjects");
        }
     
    });

})(app.Projects);