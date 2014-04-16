/* TeamCandidates*/

(function(module) {

    module.ModelView = Backbone.View.extend({	

        tagName: "div",

        className: "user-box",
        
        role: "watcher", /*we can normalize roles in db as 0 - watcher, 1 - developer etc.*/

        template: JST['app/scripts/TeamCandidates/TeamCandidatesTpl.ejs'],   
		
		subscriptions: {
            "TeamEditPage:RoleSetUp": "setRole" /*change channel name from "TeamEditPage:TabSelected"*/
        },
		
		 events: {
            "click": "setTeamMember" /*changed from addToProject*/
        },

        initialize: function() {
            this.model.on("change", this.render, this);
        },
		
		render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        setTeamMember: function() {
            this.model.set("role", this.role);
            mediator.pub("TeamCandidates:setTeamMember", this.model.formTeamMember()); /* changed channel name from "UserCandidate:addToProject" ------- we can use default "toJSON" */
        },

        setRole: function(current_role) { 
            this.role = current_role;
        }
    });

})(app.TeamCandidates);
