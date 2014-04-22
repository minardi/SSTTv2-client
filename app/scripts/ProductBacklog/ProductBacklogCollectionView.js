/* ProductBacklog */

(function(module) {

    module.CollectionView = Backbone.View.extend({
      
        template: JST['app/scripts/ProductBacklog/ProductBacklogCollectionTpl.ejs'],

        subscriptions: {
            "ProjectPage:ProjectSelected": "initCollection",
            "ScrumPage:PlanningBoardSelected": "initProductBacklog",
            "BacklogItemEdit:savedChanges": "saveNewStory"
        },

        initCollection: function (project_id) {
            this.project_id = project_id;
            this.collection = new module.Collection("story", "product", project_id);
            this.collection.once("sync", this.render, this);
            this.collection.fetch();
        },

        initProductBacklog: function(el_content) {
            this.$el = el_content;
            this.$el.append(this.template());

            this.$(".add-new-story").on("click", this.addNewStory);
            this.$list = this.$(".product .backlogstory-list");

            this.render();
        },

        render: function() {
            this.collection.each(this.renderOne, this);
            
            return this;
        },

        renderOne: function(story_model) {
            var story = new module.ModelView({model: story_model});

            this.$list.append(story.render().el);
        },

        addNewStory: function() {
            var story = new module.Model();
            story.set({"item_type": "story"});
            mediator.pub("ProductBacklog:CreateNewStory", story);
        },

        saveNewStory: function(story) { 
            var attributes = {
                                "status": "product",
                                "parent_id": this.project_id
                            };

            story.set(attributes);
            this.collection.add(story);
            story.save();
            this.renderOne(story);
        }

    });

})(app.ProductBacklog);
