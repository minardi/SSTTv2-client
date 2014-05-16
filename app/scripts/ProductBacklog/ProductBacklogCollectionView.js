/* ProductBacklog */

(function(module, sstt) {

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

        roles: ["techlead"],

        initProductBacklog: function(elem, project_id) {
            this.access_crud = sstt.user.checkRole(this.roles); 
            this.setElement(elem);
            this.project_id = project_id;

            this.$el.append(this.template({"role": sstt.user.getRoleInProject()}));
            this.$list = this.$(".backlogstory-list");

            this.initCollection();
        },

        initCollection: function () {
            this.collection = new module.Collection([], {
                    item_type: "story",
                    status: "product",
                    parent_id: this.project_id
                });
            
            this.collection.on("add", this.renderOne, this);
            this.collection.on("destroy", this.removeStory, this);

            this.collection.fetch();
        },

        renderOne: function(story) {
            var story_view = new module.ModelView({
                                    model: story,
                                    permission: this.access_crud
                                });

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

        saveStory: function(model) { 
            if (model.get("item_type") === "story") {
                if(model.isNew()) {
                    this.collection.add(model);
                    model.save();
                } else {
                    model.save();
                }
            }
        },

        removeStory: function(model) {
            this.collection.remove(model);
        }
    });

})(app.ProductBacklog, sstt);

