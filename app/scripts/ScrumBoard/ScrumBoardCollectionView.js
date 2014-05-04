/* ScrumBoard */

(function (module, sstt) {

    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/ScrumBoard/ScrumBoardCollectionTpl.ejs'],
        
        subscriptions: {   
            'ProjectPage:ProjectSelected': 'initCollection',      
            'ScrumPage:ScrumBoardSelected': 'render',
            "ScrumBoard:TaskMoved": "renderOne"
        },

        roles: ["developer", "techlead"],

        initCollection: function (project_id) {
            var role = sstt.user.getRoleInProject(project_id);
            this.access_moving = this.setAccess(role);

            this.collection = new module.Collection();  
            this.collection.url = "backlog_items/get_tasks/" + project_id;
			this.collection.fetch();
        }, 

        setAccess: function(role) {
            return ($.inArray(role, this.roles) !== -1)? true: false;
        },

        render: function (content_el) {
			this.setElement(content_el);
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

        renderOne: function (task) {
            var task_view = new module.ModelView({
                    model: task,
                    permission: this.access_moving
                });			
            this.status[task.get("status")].append(task_view.render().el);            
        }

    });

})(app.ScrumBoard, sstt);