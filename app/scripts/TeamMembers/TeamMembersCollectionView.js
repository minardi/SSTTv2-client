/* TeamMembers */

(function(module) {

    module.CollectionView = Backbone.View.extend({
        
        template: JST['app/scripts/TeamMembers/TeamMembersCollectionTpl.ejs'],

        subscriptions: {
            "TeamEditPage:roleSetUp": "setRole",
            "TeamCandidates:setTeamMember": "addToCollection",
            "TeamEditPage:Open" : "initUsers"
        },

        events: {
            "click #save": "saveCollection",
        },


        initUsers: function(team_info) {
            this.team_id = team_info["team_id"];
            this.setElement(team_info["element"].find('.team-members'));

            this.collection = new module.Collection(team_info["team_id"]);
            
            this.collection.on("sync", this.render, this);
            this.collection.on("add", this.renderOne, this);

            this.collection.fetch();
        },

         render: function() {
            this.$el.html(this.template());
            this.collection.each(this.renderOne, this);
           
            return this;
        },
        
        renderOne: function(model) {
            var team_member;

            team_member = new module.ModelView({ model: model});
            team_member.role = this.role;
            
            this.$el.find(".team-members-list").append(team_member.render().el);
        },     

        saveCollection: function() {
            this.collection.each(function(model) {
                model.save(null, {success: function() {mediator.pub("TeamMembers:Saved")},
                    error: function() {console.log("Save error")}});
            });
        },

        setRole: function(new_role) {
            this.role = new_role;
        },
      
        addToCollection: function(candidate) {
            
            var exist_model = this.collection.findWhere({
                                    first_name: candidate.first_name,
                                    last_name: candidate.last_name
                              });

            if (exist_model) {
                exist_model.set("role", candidate.role); 
            } else { 
                candidate.role = this.role;
                candidate.team_id = this.team_id;
                this.collection.add(candidate);
            }
        }

    });

})(app.TeamMembers);

