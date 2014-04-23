/* ProductBacklog */

(function(module) {

    module.CollectionView = Backbone.View.extend({
      
        template: JST['app/scripts/ProductBacklog/ProductBacklogCollectionTpl.ejs'],

        subscriptions: {
            "ProjectPage:ProjectSelected": "initCollection",
            "ScrumPage:PlanningBoardSelected": "initProductBacklog",
            "ProductBacklog:RemoveStory": "removeStory",
            "BacklogItemEdit:SavedChanges": "saveStory"
        },

        /*events: {
            "click .add-new-story": "addStory",
        },*/

        initCollection: function (project_id) {
            this.project_id = project_id;

            this.collection = new module.Collection("story", "product", project_id);
            this.collection.once("sync", this.render, this);
            this.collection.on("destroy", this.removeStory, this);

            this.collection.fetch();
        },

        initProductBacklog: function(el_content) {
            //this.setElement(el_content);
            this.$el = el_content;
            //this.$(".backlog-box .product").remove();
            this.$el.append(this.template());
            this.$('.add-new-story').on('click', jQuery.proxy(this.addStory, this));
            this.$list = this.$(".backlogstory-list");

            this.render();
        },

        render: function() {
            this.$list.html("");
            this.collection.each(this.renderOne, this);
            
            return this;
        },

        renderOne: function(story) {
            var story_view = new module.ModelView({model: story});
            
            this.$list.append(story_view.render().el);
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
        },

        removeStory: function(model) {
            this.collection.remove(model);
        }

    });

})(app.ProductBacklog);

