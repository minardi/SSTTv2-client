/* ProductBacklog */

(function(module) {

    module.CollectionView = Backbone.View.extend({
      
        template: JST['app/scripts/ProductBacklog/ProductBacklogCollectionTpl.ejs'],

        subscriptions: {
            "PlanningBoard:InitProductBacklog": "initProductBacklog",
            "ProductBacklog:RemoveStory": "removeStory",
            "BacklogItemEdit:SavedChanges": "saveStory",
            "SprintBacklog:RestoreStory": "renderOne"
        },

        events: {
            "click .add-new-story": "addStory",
        },
        
        initProductBacklog: function(elem, project_id) {
            this.setElement(elem);
            this.project_id = project_id;

            this.$el.append(this.template());
            this.$list = this.$(".backlogstory-list");

            this.initCollection();
        },

        initCollection: function () {
            this.collection = new module.Collection("story", "product", this.project_id);
            this.collection.on("sync", this.render, this);
            this.collection.on("destroy", this.removeStory, this);

            this.collection.fetch();
        },

        render: function() {
            this.$list.html("");
            this.collection.each(this.renderOne, this);
            
            return this;
        },

        renderOne: function(story) {
            var story_view = new module.ModelView({model: story});
            
            if(!story.get('moved')) {
                this.$list.append(story_view.render().el);
            }
        },

        addStory: function() {
            var attributes = {
                                "status": "product",
                                "item_type": "story",
                                "parent_id": this.project_id
                            };

            mediator.pub("ProductBacklog:CreateNewItem", attributes);
        },

        saveStory: function(model) { 
            if (model.get("item_type") === "story") {
                if(model.isNew()) {
                    this.collection.add(model);
                    model.save();
                    this.renderOne(model);
                } else {
                    model.save();
                }
            }
        }

    });

})(app.ProductBacklog);

