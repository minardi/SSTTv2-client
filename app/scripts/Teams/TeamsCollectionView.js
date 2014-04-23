/* Teams */

(function(module) {

    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/Teams/TeamsCollectionTpl.ejs'],

        initialize: function (options) {
            this.collection = new module.Collection(options.project_id);
            this.listenTo(this.collection, "sync", this.render);
            this.collection.fetch();
        },

        render: function() {
            this.$el.html(this.template());
            this.$teams = this.$(".teams");
            this.collection.each(this.renderOne, this);
            
            return this;
        },

        renderOne: function(model) {
            var project = new module.ModelView({
                    model: model
                });

            this.$teams.append(project.render().el);
        }

    });

})(app.Teams);

