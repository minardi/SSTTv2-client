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
            this.collection = new module.Collection("stories", project_id);
            this.collection.on("sync", this.syncCollection, this);
            
            this.collection.fetch();
        },

        initProductBacklog: function(el_content) {
            this.$el = el_content;
            this.$el.append(this.template());

            this.$(".add-new-story").on("click", this.addNewStory);
            this.$list = this.$(".product .backlogstory-list");

            this.render();
        },

        syncCollection: function(){
            this.isSync = true;
            this.render();
        },

        render: function() {
            if(this.isSync){
                this.collection.each(this.renderOne, this);
            }
            
            return this;
        },

        renderOne: function(story_model) {
            var story = new module.ModelView({model: story_model});


            this.$list.append(story.render().el);
        },

        addNewStory: function() {
            var story = new module.Model();
            story.set({"type": "stories"});
            mediator.pub("ProductBacklog:CreateNewStory", story);
        },

        saveNewStory: function(story) { 
            var attributes = {
                                "status": "Product",
                                "parent_id": this.project_id
                            };

            story.set(attributes);
            this.collection.add(story);
            this.renderOne(story);
        }

    });

})(app.ProductBacklog);
