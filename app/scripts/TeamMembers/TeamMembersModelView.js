/* TeamMembers */

(function(module) {

    module.ModelView = Backbone.View.extend({

        className: "user-box",
        
        template: JST['app/scripts/TeamMembers/TeamMembersTpl.ejs'],
        
        initialize: function() {
            this.model.on('change', this.show, this);
            this.show();
        },

        subscriptions: {
            "TeamEditPage:roleSetUp": "setRole"
        },
       
        show: function() {
            this.canRender() ? this.$el.removeClass('hide'): 
                                this.$el.addClass('hide');
        },

        canRender: function() {
            return (this.model.get("role") === this.role);  
        },

        setRole: function(new_role) {
            this.role = new_role;
            this.show();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.show();

            return this;
        }

    });
    
})(app.TeamMembers);
