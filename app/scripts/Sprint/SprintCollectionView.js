/* Sprint */

(function(module) {
        
     module.CollectionView = Backbone.View.extend({	     
		
        template: JST['app/scripts/Sprint/SprintCollectionTpl.ejs'],        

        events: {
        },

        subscriptions: {
            "BacklogItemEdit:SavedChanges": "saveSprint"
        },

        initialize: function() {
            this.collection = new module.Collection();
        },

        render: function() {
		    this.$el.html(this.template());
            this.$list = this.$(".list");

            this.collection.each(this.renderOne, this);
            return this;
        },

        renderOne: function (model) {
            var sprintView = module.ModelView({
                model: model
            });

            this.$list.append(sprintView.render().el);
        },

        saveSprint: function (model) {         

            if (model.get("item_type") === 'sprint') {
                this.collection.add(model);
                this.listenToOnce(this.collection, "sync", this.sprintWasSaved);

                model.save();
            }
        },

        sprintWasSaved: function () {
            mediator.pub("Sprint:SprintWasSaved", this.collection.last());
        }
    });

})(app.Sprint);

