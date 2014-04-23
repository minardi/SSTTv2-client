/* ScrumBoard */

(function (module) {

    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/ScrumBoard/ScrumBoardCollectionTpl.ejs'],
        
        subscriptions: {   
            'ProjectPage:ProjectSelected': 'initCollection',      
            'ScrumPage:ScrumBoardSelected': 'setElementAndRender',
            "ScrumBoard:moveTask": "renderOne"
        },
		
		/*initialize: function()  {
			this.model.on("change", this.renderOne, this);
		},*/
        
        initCollection: function (sprint_id) {  
            this.collection = new module.Collection("task", "todo", sprint_id);  
        },   
            
        setElementAndRender: function(content_el) {           
            this.setElement(content_el);
			this.collection.on('sync', this.renderEach, this);
            this.collection.fetch();   
			console.log(this.collection);
        },

        renderEach: function () {
            this.$el.html(this.template());
            this.collection.each(this.renderOne,this);
            return this;
        },

        renderOne: function (task_model) {
            var task = new module.ModelView({
                    model: task_model
                });
            this.$el.find(".todo").append(task.render().el);            
        }

    });

})(app.ScrumBoard);