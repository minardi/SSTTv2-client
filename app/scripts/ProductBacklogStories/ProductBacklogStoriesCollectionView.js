/* ProductBacklogStories */

(function(module) {

    module.CollectionView = Backbone.View.extend({
      
        template: JST["app/scripts/ProductBacklogStories/ProductBacklogStoriesCollectionTpl.ejs"],

        subscriptions: {
            "ProjectPage:ProjectSelected": "initCollection",
            "ScrumPage:PlanningBoardSelected": "initProductBacklog"

        },

        initCollection: function (project_id) {  
            this.collection = new module.Collection(project_id);
            this.collection.on('sync', this.render, this);  
            this.collection.fetch();                    
        },   

        initProductBacklog: function(el_content) {
            this.setElement(el_content);
            this.render();
        },

        render: function() {
            this.$el.html(this.template());
            this.collection.each(this.renderOne, this);

            return this;
        },

        renderOne: function(StoryModel) {
            var story = new module.ModelView({
                    model: StoryModel
            });
            this.$el.find(".product .story-list").append(story.render().el);

        }

    });

})(app.ProductBacklogStories);