/* SprintBacklog */

(function(module) {
        
    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/SprintBacklog/SprintBacklogCollectionTpl.ejs'],  

        subscriptions: {
            "ProjectPage:ProjectSelected": "initCollection",
            "ScrumPage:PlanningBoardSelected": "initSprintBacklog",
            "ProductBacklog:MoveSprintBacklog": "addBacklogItem",
            "BacklogItemEdit:SavedChanges": "startSprint"
        },
/*
        events: {
            "click .start-sprint": "addSprint"
        },
*/
        initCollection: function (project_id) {
            this.parent_id = project_id;

            this.collection = new module.Collection("stories", "sprint", project_id);
        },
        
        initSprintBacklog: function(el_content) {
            this.$el = el_content;
            this.render();
        },

        addBacklogItem: function(backlogItem) {
            this.collection.addItem(backlogItem.toJSON());
            this.renderSprintBacklogItem(backlogItem);
        },

        render: function() {
            this.$el.append(this.template());
            this.$list = this.$(".sprintstory-list");

            this.$(".start-sprint").on("click", this.addSprint);

            return this;
        },

        renderSprintBacklogItem: function (backlogItem) {
            var backlogItemView = new module.ModelView({
                model: backlogItem
            });

            this.$list.append(backlogItemView.render().el);
        },

        addSprint: function() {
            var attributes = {
                "item_type": "sprint",
                "parent_id": this.parent_id
            };
            
            mediator.pub("ProductBacklog:CreateNewItem", attributes);
        },

        startSprint: function(sprint) {
            if (story.model.get("item_type" === "sprint")) {
                //some unfinished actions
            }
        }
        
    });

})(app.SprintBacklog);