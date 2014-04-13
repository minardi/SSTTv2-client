/* UserCandidates  - rename to Candidates*/

(function(module) {

    module.CollectionView = Backbone.View.extend({
	
		/*el: or tagname: are not predefined here - is it OK? or we can define empty el:*/

        template: JST['app/scripts/UserCandidates/UserCandidatesCollectionTpl.ejs'],

        initialize: function() {
            mediator.sub("TeamEditPage:Open", this.initUserCandidates, this); /*TeamEditPageModelView pubs hash { element: this.$el, team_id: team_id }*/
        }, 

        render: function() {
            this.$el.append(this.template());
            this.$users_list = this.$el.find(".users-list");
            this.collection.each(this.renderOne, this);
            return this;
        },

        renderOne: function(user_model) {
            var user = new module.ModelView({ /*change var User to user_view*/
                    model: user_model
                });

            this.$users_list.append(user.render().el);
        },
		
		initUserCandidates: function(data) {   /*don't like this 'data' but can't explain why*/           
            this.setElement(data["element"].find('.candidates')); /*but el: is obtained here - is it OK?*/
            this.collection = new module.Collection(data["team_id"]);
            this.collection.on('sync', this.render, this);
        }g

    });

})(app.UserCandidates);

