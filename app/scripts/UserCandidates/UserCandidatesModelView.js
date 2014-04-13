/* UserCandidates - rename to Candidates*/

(function(module) {

    module.ModelView = Backbone.View.extend({	

        tagName: "div",

        className: "user-box",
        
        role: "watcher", /*we can normalize roles in db as 0 - watcher, 1 - developer etc.*/

        template: JST['app/scripts/UserCandidates/UserCandidatesTpl.ejs'],   

        initialize: function() {
            this.model.on("change", this.render, this);
        }, 

        events: {
            "click": "addToProject"
        },

        subscriptions: {
            "TeamEditPage:TabSelected": "setRole" /*TeamEditPageModelView pubs the string with role*/
        },
		
		render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        addToProject: function() {
            this.model.set("role", this.role);
            mediator.pub("UserCandidate:addToProject", this.model.toTeamMemberAttributes()); /* pushes  model.attributes into
			TeamMemColView.addToCol() - make shorter name of method for ex. setAsMember(), as param we can use `this.model`, so we don't need BlaBlaAttrs method in model*/
        },

        setRole: function(current_role) { 
            this.role = current_role;
        }
    });

})(app.UserCandidates);
