/* Statistics */

(function(module) {
        
     module.CollectionView = Backbone.View.extend({
        
        template: JST['app/scripts/Statistics/StatisticsCollectionTpl.ejs'],

        events: {
            "change .sprint-list": "selectSprint"
        },

        subscriptions: {
            "ScrumPage:StatBoardSelected": "initStatistics"
        },

        collection: {},

        current_sprint_id: NaN,

        initStatistics: function(elem, project_id) {
            this.setElement(elem);
            this.render();
            this.$sprint_list = this.$(".sprint-list");
            
            this.sprints = new module.Collection([], {
                    item_type: "sprint",
                    status: "done",
                    parent_id: project_id
                });

            this.sprints.on("add", this.renderSprint, this)
                .fetch();
        },

        render: function() {
            this.$el.html(this.template());

            return this;
        },

        renderSprint: function(sprint) {
            var view = new module.ModelView({
                    model: sprint
                });

            this.$sprint_list.append(view.render().el);
        },

        selectSprint: function() {
            this.current_sprint_id = this.$sprint_list.val();
                
            if(this.collection[this.current_sprint_id]){
                this.drawBurnDownChart(this.collection[this.current_sprint_id]);
            } else {
                this.initStories();
            }
        },

        initStories: function() {
            this.collection[this.current_sprint_id] = new module.Collection();
            
            this.collection[this.current_sprint_id].url = "backlog_items/get_stories/" + this.current_sprint_id;
            this.collection[this.current_sprint_id].on("sync", this.addStoriesToCollection, this)
                .fetch();
        },

        addStoriesToCollection: function() {
            this.drawBurnDownChart(this.collection[this.current_sprint_id]);
        },

        drawBurnDownChart: function(stories) {
            console.log(stories);
        }

    });

})(app.Statistics);

