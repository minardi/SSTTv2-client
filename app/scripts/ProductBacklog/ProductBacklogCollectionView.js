/* ProductBacklog */

(function(module) {

    module.CollectionView = Backbone.View.extend({
      
        template: JST['app/scripts/ProductBacklog/ProductBacklogCollectionTpl.ejs'],

        subscriptions: {
            "ProjectPage:ProjectSelected": "initCollection",
            "ScrumPage:PlanningBoardSelected": "initProductBacklog",
            "BacklogItemEdit:SavedChanges": "saveStory",
        },

        events: {
            "click .add-new-story": "addStory",
        },

        initCollection: function (project_id) {
            this.project_id = project_id;

            this.collection = new module.Collection("story", "product", project_id);
            this.collection.once("sync", this.render, this);

            this.collection.fetch();
        },

        initProductBacklog: function(el_content) {
            this.setElement(el_content);
            this.$el.append(this.template());

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
                                "parent_id": this.parent_id
                            };

            mediator.pub("ProductBacklog:CreateNewItem", attributes);
        },

        saveStory: function(data) { 
            if(data["is_new"]) {
                this.collection.add(data.model);
                this.renderOne(data.model);
            } else {
                //story.save(); 
                console.log('saved');
            }
        }

    });

})(app.ProductBacklog);

