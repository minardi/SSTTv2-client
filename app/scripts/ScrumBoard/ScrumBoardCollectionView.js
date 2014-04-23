/* ScrumBoard */

(function (module) {

    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/ScrumBoard/ScrumBoardCollectionTpl.ejs'],
        
        subscriptions: {
            "ScrumBoard:MoveTask": "renderOne"
        },

        initialize: function (project_id) {
            this.collection = new module.Collection(project_id);
            this.listenTo(this.collection, 'sync', this.render);
            this.render();
        },

        render: function () {
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