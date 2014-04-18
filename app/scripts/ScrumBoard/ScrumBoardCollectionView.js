/* ScrumBoard */

(function (module) {

    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/ScrumBoard/ScrumBoardCollectionTpl.ejs'],
        
        subscriptions: {   
            'ProjectPage:ProjectSelected': 'initCollection',      
            'ScrumPage:ScrumBoardSelected': 'setElementAndRender',
            "ScrumBoard:MoveTask": "renderOne"
        },
        
        initCollection: function (project_id) {  
            this.collection = new module.Collection(project_id);                            
        },   
            
        setElementAndRender: function(content_el) {           
            this.$el = content_el;
            this.collection.fetch();   
            this.collection.on('sync', this.render, this);                           
        },

        render: function () {
            this.$el.html(this.template());
            this.collection.each(this.renderOne,this);
            return this;
        },

        renderOne: function (task_model) {           
        }

    });

})(app.ScrumBoard);