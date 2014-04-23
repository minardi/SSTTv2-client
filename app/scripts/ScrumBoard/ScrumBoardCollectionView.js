/* ScrumBoard */

(function (module) {

    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/ScrumBoard/ScrumBoardCollectionTpl.ejs'],
        
        subscriptions: {
            "ScrumBoard:TaskMoved": "renderOne"
        },
        
        initialize: function (options) {  
            this.collection = new module.Collection();  
			this.collection.url = "backlog_items/get_tasks/" + options.project_id;

            this.collection.on('sync', this.render, this);
            this.collection.fetch();
        },

        render: function () {
            this.$el.html(this.template());
			this.status = {
				"todo": this.$(".todo"),
				"progress": this.$(".in-progress"),
				"verify": this.$(".to-verify"),
				"done": this.$(".done"),
			};
            this.collection.each(this.renderOne,this);
            return this;
        },

        renderOne: function (task_model) {
            var task = new module.ModelView({
                    model: task_model
                });

            this.status[task_model.get("status")].append(task.render().el);            
        }

    });

})(app.ScrumBoard);