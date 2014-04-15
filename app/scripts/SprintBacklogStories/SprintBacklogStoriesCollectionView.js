/* SprintBacklogStories */

(function(module) {
        
    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/SprintBacklogStories/SprintBacklogStoriesCollectionTpl.ejs'],  

        subscriptions: {
            "ScrumPage:PlanningBoardSelected": "initSprintBacklog",
            "ProductBacklogStories:MoveStory": "addStory"
        },

        initialize: function() {
            this.collection = new module.Collection();
        },
        
        initSprintBacklog: function(el_content) {
            this.setElement(el_content);
            this.render();
        },

        addStory: function(story) {
            this.collection.add(story.toJSON());
            this.renderOne(story);
        },

        render: function() {
            this.$el.append(this.template());
            return this;
        },

        renderOne: function(story_model) {
            var story = new module.ModelView({model: story_model});
            this.$el.find(".sprint .story-list").append(story.render().el);
            return this;
        }

    });

})(app.SprintBacklogStories);