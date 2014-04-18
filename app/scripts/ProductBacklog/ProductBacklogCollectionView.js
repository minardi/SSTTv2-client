/* ProductBacklog */

(function(module) {

    module.CollectionView = Backbone.View.extend({
      
        template: JST['app/scripts/ProductBacklog/ProductBacklogCollectionTpl.ejs'],

        subscriptions: {
            "ProjectPage:ProjectSelected": "initCollection",
            "ScrumPage:PlanningBoardSelected": "initProductBacklog"
        },

        initCollection: function (project_id) {
            this.collection = new module.Collection(project_id);
            this.collection.on('add', this.syncCollection, this);
            this.collection.add([
                {
                    "title": "spr1",
                    "description": "sprint",
                    "estimation": "",
                    "parent_id": "",
                    "status": "active",
                    "type": "stories",
                    "project_id": project_id
                },
                {
                    "title": "spr2",
                    "description": "sprint",
                    "estimation": "",
                    "parent_id": "",
                    "status": "active",
                    "type": "stories",
                    "project_id": project_id
                },
                {
                    "title": "spr3",
                    "description": "sprint",
                    "estimation": "",
                    "parent_id": "",
                    "status": "active",
                    "type": "stories",
                    "project_id": project_id
                },
                {
                    "title": "spr6",
                    "description": "sprint",
                    "estimation": "",
                    "parent_id": "",
                    "status": "active",
                    "type": "stories",
                    "project_id": project_id
                }
            ]);
            //this.collection.fetch();
        },

        initProductBacklog: function(el_content) {
            this.$el = el_content;
            this.$el.append(this.template());
            this.$list = this.$(".story-list");
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
        }

    });

})(app.ProductBacklog);
