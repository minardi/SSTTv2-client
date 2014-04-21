/* ProductBacklog */

(function(module) {

    module.CollectionView = Backbone.View.extend({
      
        template: JST['app/scripts/ProductBacklog/ProductBacklogCollectionTpl.ejs'],

        subscriptions: {
            "ProjectPage:ProjectSelected": "initCollection",
            "ScrumPage:PlanningBoardSelected": "initProductBacklog",
            "BacklogItemEdit:savedChanges": "saveStory",
            "BacklogItemEdit:cancelChanges": "removeEmptyItem"
        },

        initCollection: function (project_id) {
            this.project_id = project_id;

            this.collection = new module.Collection("story", "product", project_id);
            this.collection.once("sync", this.render, this);
            this.collection.on("add", this.render, this);

            this.collection.fetch();
        },

        initProductBacklog: function(el_content) {
            this.$el = el_content;
            this.$el.append(this.template());

            this.$(".add-new-story").on("click", this.addStory);
            this.$(".create-sprint").on("click", this.addSprint);

            this.$list = this.$(".product .backlogstory-list");

            this.render();
        },

        render: function() {
            this.$list.html("");
            this.collection.each(this.renderOne, this);
            
            return this;
        },

        renderOne: function(story_model) {
            var story = new module.ModelView({model: story_model});

            this.$list.append(story.render().el);
        },

        addStory: function() {
            var story = new module.Model();

            story.set({"item_type": "story"});
            mediator.pub("ProductBacklog:CreateNewItem", story);
        },

        saveStory: function(story) { 
            var attributes = {
                                "status": "product",
                                "parent_id": this.project_id
                            };

            story.set(attributes);
            this.collection.add(story);
            story.save();
        },
//what about sprint?????
        removeEmptyItem: function(item) {
           if (item.attributes["item_type"] === "story") {
                this.collection.remove(item);
            }
        },

        addSprint: function() {
            var new_sprint = new module.Model();

            new_sprint.set({"item_type": "sprint"});
            mediator.pub("ProductBacklog:CreateNewItem", new_sprint);
        },

        saveSprint: function(sprint) { 
            var attributes = {
                                "parent_id": this.project_id
                            };

            sprint.set(attributes);
/*            this.collection.add(sprint);
            sprint.save();*/
        }

    });

})(app.ProductBacklog);

