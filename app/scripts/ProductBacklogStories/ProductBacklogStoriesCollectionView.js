/* ProductBacklogStories */

(function(module) {

    module.CollectionView = Backbone.View.extend({
      
        template: JST['app/scripts/ProductBacklogStories/ProductBacklogStoriesCollectionTpl.ejs'],

        initialize: function() {
            mediator.sub("ScrumPage:PlanningBoardSelected", this.initProductBacklog, this);
        },

        initProductBacklog: function(el_content, project_id) {
            this.setElement(el_content);
            this.$el.append(this.template());
            this.collection = new module.Collection(project_id);
            this.collection.on('sync', this.render, this);
        },

        render: function() {
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