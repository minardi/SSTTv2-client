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
            "Projects:OneProjectChecked": "checkProject",
            "DashBoard:ActiveTeam": "navigateTeams"
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
        },

        checkProject: function (project_model) {
            this.checked_project = project_model;
        },

        navigateTeams: function () {
            var project_id = this.checked_project.get("id");

            sstt.router.navigate("project/" + project_id + "/teams", {trigger: true});
        }
     
    });

})(app.Projects);