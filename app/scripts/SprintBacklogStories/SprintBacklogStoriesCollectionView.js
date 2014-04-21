/* SprintBacklogStories */

(function(module) {
        
    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/SprintBacklogStories/SprintBacklogStoriesCollectionTpl.ejs'],  

        initialize: function() {
            this.collection = new module.Collection();
            mediator.sub("ScrumPage:PlanningBoardSelected", this.initSprintBacklog, this);
        },

        subscriptions: {
            "Story:moveToSprint": "addStory",
        },
        
        initSprintBacklog: function(el_content) {
            this.setElement(el_content);
            this.render();
        },


        addStory: function(product_story_model) {
            this.collection.add(product_story_model.toJSON());
            this.renderOne(product_story_model);
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

