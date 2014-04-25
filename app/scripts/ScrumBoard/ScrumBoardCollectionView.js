/* ScrumBoard */

(function (module) {

    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/ScrumBoard/ScrumBoardCollectionTpl.ejs'],
        
        subscriptions: {   
            'ProjectPage:ProjectSelected': 'initCollection',      
            'ScrumPage:ScrumBoardSelected': 'render',
            "ScrumBoard:TaskMoved": "renderOne"
        },

        initCollection: function (project_id, role) {
            this.role = role;
            this.collection = new module.Collection();  
            this.collection.url = "backlog_items/get_tasks/" + project_id;
			this.collection.fetch(); 
        },   

        render: function (content_el) {
			if (content_el) {
				this.setElement(content_el);
			}
			
            this.$el.html(this.template());
            this.collection.each(this.renderOne,this);
            return this;
        },

        renderOne: function (task) {
            var task_view = new module.ModelView({
                    model: task,
                    role: this.role
                });
				
			this.status = {
                "todo": this.$(".todo"),
                "progress": this.$(".in-progress"),
                "verify": this.$(".to-verify"),
                "done": this.$(".done"),
            };	
			
            this.status[task.get("status")].append(task_view.render().el);            
        }

    });

})(app.ScrumBoard);