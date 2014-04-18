/* ProductBacklog */

(function(module) {

    module.CollectionView = Backbone.View.extend({
      
        template: JST['app/scripts/ProductBacklog/ProductBacklogCollectionTpl.ejs'],

        subscriptions: {
            "ProjectPage:ProjectSelected": "initCollection",
            "ScrumPage:PlanningBoardSelected": "initProductBacklog"
        },

        initCollection: function (project_id) {
            this.collection = new module.Collection('stories', project_id);
            this.collection.on('sync', this.syncCollection, this);
            
            this.collection.fetch();
        },

        initProductBacklog: function(el_content) {
            this.$el = el_content;
            this.$el.append(this.template());
            this.$list = this.$(".story-list");
            this.$("#add_new_story").on("click", this.addNewStory);
            this.$list = this.$(".product .story-list");
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
            mediator.pub("ProductBacklog:ClickAddNewStory", this.story);
        }

    });

})(app.ProductBacklog);
