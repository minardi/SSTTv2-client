/* Sprint */

(function(module) {
        
     module.CollectionView = Backbone.View.extend({	     
		
        template: JST['app/scripts/Sprint/SprintCollectionTpl.ejs'],        

        events: {
        },

        subscriptions: {
            "SprintBacklog:SaveSprint": "saveSprint"
        },

        initialize: function() {
            this.collection = new module.Collection();
            //this.collection.on("sync", this.render, this);
            //this.fetch();
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

        saveSprint: function (sprint) {
            sprint.set("item_type", "sprint");

            this.collection.add(sprint);
            sprint.save();

            this.listenToOnce(this.collection, "sync", this.sprintWasSaved);
        },

        sprintWasSaved: function () {
            console.log("Sprint:Save", this.collection.last());
            mediator.pub("Spirnt:SprintWasSaved", this.collection.last());
        }
    });

})(app.Sprint);

