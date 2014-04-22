// /* Projects */

(function(module) {
        
    module.CollectionView = Backbone.View.extend({
     
        template: JST['app/scripts/Projects/ProjectsCollectionTpl.ejs'],        
            
        initialize: function() {
            this.projectsCollection = new module.Collection();
            this.projectsCollection.fetch();
            this.listenTo(this.projectsCollection, "sync", this.render);
        },

        subscriptions: {
            "ProjectPage:ProjectSelected": "hide",
            "DashBoard:ActiveTeam": "hide",
            "DashBoard:ActiveBack": "show"
        },

        hide: function() {
            this.$el.addClass("hiddenProjects");
        },

        show: function() {
            this.$el.removeClass("hiddenProjects");
        },

        render: function() {
            this.$el.html(this.template());
            this.$list = this.$(".content");
            this.projectsCollection.each(this.renderOne, this);
            return this;
        },

        renderOne: function(projectModel) {
            var project = new module.ModelView({
                model: projectModel
            });
            this.$list.append(project.render().el);
        }
     
    });

})(app.Projects);