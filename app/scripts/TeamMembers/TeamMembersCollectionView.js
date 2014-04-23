/* TeamMembers */

(function(module) {

    module.CollectionView = Backbone.View.extend({
        
        template: JST['app/scripts/TeamMembers/TeamMembersCollectionTpl.ejs'],

        subscriptions: {
            "TeamEditPage:roleSetUp": "setRoles",
            "TeamCandidates:setTeamMember": "addToCollection",
            "TeamEditPage:loadTeamMembers" : "showInPage"
        },

        events: {
            "click #save": "saveCollection",
        },

        initialize: function (options) {
            this.collection = new module.Collection(options.team_id);
            this.listenTo(this.collection, "sync", this.render);
        },

        showInPage: function ($el) {
            this.setElement($el);
            this.collection.fetch();
        },

        render: function() {
            this.$el.html(this.template());
            this.$member_list = this.$(".team-members-list");
            
            this.collection.on("add", this.renderOne, this);
            this.collection.each(this.renderOne, this);
           

            //this.listenToOnce(sstt.router, "route", this.removeMy);
            return this;
        },
        
        renderOne: function(model) {
            var team_member;

            team_member = new module.ModelView({ model: model});
            team_member.role = this.role;
            
            this.$member_list.append(team_member.render().el);
        },     

        saveCollection: function() {
            this.collection.each(function(model) {
                model.save(null, {success: function() {mediator.pub("TeamMembers:Saved")},
                    error: function() {console.log("Save error")}});
            });
        },

        setRoles: function(role) {
            this.role = role;
            this.collection.each(this.setOneRole, this);
        },

        setOneRole: function (model) {
            model.trigger("visible", this.role);
        },
      
        addToCollection: function(candidate) {
            var exist_model = this.collection.findWhere({
                                    first_name: candidate.first_name,
                                    last_name: candidate.last_name
                              });

            if (exist_model) {
                exist_model.set("role", this.role);
                exist_model.trigger("visible", this.role);
            } else { 
                candidate.role = this.role;
                candidate.team_id = this.team_id;
                this.collection.add(candidate);
            }
        }

    });

})(app.TeamMembers);

