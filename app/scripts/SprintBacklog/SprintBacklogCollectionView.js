/* SprintBacklog */

(function(module) {
        
    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/SprintBacklog/SprintBacklogCollectionTpl.ejs'],  

        subscriptions: {
            "PlanningBoard:InitSprintBacklog": "initSprintBacklog",
            "ProductBacklog:MoveSprintBacklog": "addBacklogItem",
            "BacklogItemEdit:SavedChanges": "startSprint"
        },

        events: {
            "click .start-sprint": "addSprint"
        },

        initSprintBacklog: function(elem, project_id) {
            this.setElement(elem);
            this.parent_id = project_id;

            this.$el.append(this.template());
            this.$list = this.$(".sprintstory-list");

            this.initCollection(project_id);
        },

        initCollection: function (project_id) {
            this.collection = new module.Collection("stories", "sprint", project_id);
        },

        addBacklogItem: function(backlogItem) {
            this.collection.addItem(backlogItem.toJSON());
            this.renderOne(backlogItem);
        },

        renderOne: function (backlogItem) {
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
            //some unfinished actions
        }
        
    });

})(app.SprintBacklog);