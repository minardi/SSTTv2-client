// /* Projects */

(function(module, sstt) {
        
    module.CollectionView = Backbone.View.extend({
     
        template: JST['app/scripts/Projects/ProjectsCollectionTpl.ejs'],        
            
        initialize: function() {
            this.projectsCollection = new module.Collection();
            this.listenTo(this.projectsCollection, "sync", this.render);
            
            this.projectsCollection.fetch();
        },

        subscriptions: {
            "ProjectPage:ProjectSelected": "hide",
            "DashBoard:ActiveTeam": "hide",
            "DashBoard:ActiveBack": "show",
            "User:ChangeRole": "updateRole"
        },

        hide: function() {
            this.$el.addClass("hiddenProjects");
        },

        show: function() {
            this.$el.removeClass("hiddenProjects");
        },

        render: function() {
            this.$el.append(this.template());
            this.projectsCollection.each(this.renderOne, this);
            return this;
        },

        renderOne: function(projectModel) {
            var project = new module.ModelView({
                model: projectModel
            });
            this.$el.find(".content").append(project.render().el);
        },

        updateRole: function() {
            var project = this.projectsCollection.get(sstt.current_project);
            project.set("role", sstt.user.getRoleInProject());
        }
     
    });

})(app.Projects, sstt);