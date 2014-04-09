/* UserCandidates */

(function(module) {

    module.CollectionView = Backbone.View.extend({

        template: JST['app/scripts/UserCandidates/UserCandidatesCollectionTpl.ejs'],

        initialize: function() {
            mediator.sub("TeamEditPage:Open", this.initUserCandidates, this);
        }, 

        initUserCandidates: function(data) {              
            this.setElement(data["element"].find('.candidates'));
            this.collection = new module.Collection(data["team_id"]);
            this.collection.on('sync', this.render, this);
        },

        render: function() {
            this.$el.append(this.template());
            this.$users_list = this.$el.find(".users-list");
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

})(app.UserCandidates);

