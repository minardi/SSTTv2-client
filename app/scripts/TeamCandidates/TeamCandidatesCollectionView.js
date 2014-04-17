/* TeamCandidates*/

(function(module) {

    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/TeamCandidates/TeamCandidatesCollectionTpl.ejs'],
		
		subscriptions: {
			"TeamEditPage:Open": "initTeamCandidates",
		},
		
		initTeamCandidates: function(team_info) {             
            this.setElement(team_info["element"].find('.candidates')); 
            this.collection = new module.Collection(team_info["team_id"]);
            this.collection.on('sync', this.render, this);
			this.collection.fetch(); /*fetch() from collection added here to boost performance*/
			console.log(this.collection);
        },

        render: function() {
            this.$el.append(this.template());
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

