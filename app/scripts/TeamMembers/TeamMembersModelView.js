/* TeamMembers */

(function(module) {

    module.ModelView = Backbone.View.extend({

        className: "user-box",
        
        template: JST['app/scripts/TeamMembers/TeamMembersTpl.ejs'],
        
        initialize: function() {
            this.listenTo(this.model, "visible", this.toggleVisible);
        },

        toggleVisible: function (role) {
            this.$el.toggleClass("hidden", this.isHidden(role));
        },

        isHidden: function (role) {
            return this.model.get("role") !== role;
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });
    
})(app.TeamMembers);
