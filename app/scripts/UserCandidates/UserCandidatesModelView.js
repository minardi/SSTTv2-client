/* UserCandidates */

(function(module) {

    module.ModelView = Backbone.View.extend({	

        tagName: "div",

        className: "user-box",
        
        role: "watcher",

        template: JST['app/scripts/UserCandidates/UserCandidatesTpl.ejs'],   

        initialize: function() {
            this.model.on("change", this.render, this);
        }, 

        events: {
            "click": "addToProject"
        },

        subscriptions: {
            "TeamEditPage:TabSelected": "setRole"
        },

        addToProject: function() {
            this.model.set("role", this.role);
            mediator.pub("UserCandidate:addToProject", this.model.toTeamMemberAttributes());
        },

        setRole: function(current_role) {
            this.role = current_role;
            console.log("user", this.role);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
        
    });

})(app.UserCandidates);
