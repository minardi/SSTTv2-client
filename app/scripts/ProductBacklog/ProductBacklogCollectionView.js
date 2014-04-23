/* ProductBacklog */

(function(module) {

    module.CollectionView = Backbone.View.extend({
      
        template: JST['app/scripts/ProductBacklog/ProductBacklogCollectionTpl.ejs'],

        subscriptions: {
            "BacklogItemEdit:savedChanges": "saveNewStory"
        },

        events: {
            "click .add-new-story": "addNewStory"
        },

        initialize: function (options) {
            this.collection = new module.Collection("story", "product", options.project_id);
            this.collection.once("sync", this.render, this);
            this.collection.fetch();
        },

        render: function() {
            this.$el.append(this.template());
            this.$list = this.$(".product .backlogstory-list");

            this.collection.each(this.renderOne, this);

            return this;
        },

        renderOne: function(story_model) {
            var story = new module.ModelView({
                model: story_model
            });

            this.$list.append(story.render().el);
        },

        addNewStory: function() {
            var story = new module.Model();
            story.set({"item_type": "story"});
            mediator.pub("ProductBacklog:CreateNewStory", story);
        },

        saveNewStory: function(story) { 
            story.set("status", "product");
            this.collection.add(story);

			story.save();
            this.renderOne(story);
        }

    });

})(app.ProductBacklog);
