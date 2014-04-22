/* TeamCandidates*/

(function(module) {

    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/TeamCandidates/TeamCandidatesCollectionTpl.ejs'],
		
		subscriptions: {
			"TeamEditPage:loadCandidates": "showInPage",
		},

		initialize: function(options) {
            this.collection = new module.Collection(options.team_id);
            this.collection.on('sync', this.render, this);
        },

        showInPage: function ($el) {
            this.setElement($el);
            this.collection.fetch();
        },

        render: function() {
            this.$el.html(this.template());
            this.$users_list = this.$(".users-list"); /* 'this.$el.find()' deleted*/
            this.collection.each(this.renderOne, this);
            return this;
        },

        renderOne: function(user_model) {
            var user = new module.ModelView({
                    model: user_model
                });

            this.$users_list.append(user.render().el);
        }
    });

})(app.TeamCandidates);

