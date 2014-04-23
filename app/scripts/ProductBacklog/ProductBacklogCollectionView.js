/* ProductBacklog */

(function(module) {

    module.CollectionView = Backbone.View.extend({
      
        template: JST['app/scripts/ProductBacklog/ProductBacklogCollectionTpl.ejs'],

        subscriptions: {
            "BacklogItemEdit:SavedChanges": "saveStory",
            "SprintBacklog:RestoreStory": "renderOne"
        },

        events: {
            "click .add-new-story": "addStory"
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

        addStory: function() {
            var attributes = {
                                "status": "product",
                                "item_type": "story",
                                "parent_id": this.project_id
                            };

            mediator.pub("ProductBacklog:CreateNewItem", attributes);
        },

        saveStory: function(story) { 
            if (story.model.get("item_type") === "story") {
                if(story["is_new"]) {
                    this.collection.add(story.model);
                    story.model.save();
                    this.renderOne(story.model);
                } else {
                    story.model.save();
                }
            }
        }

    });

})(app.ProductBacklog);

