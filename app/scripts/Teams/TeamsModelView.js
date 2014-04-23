/* Teams */

(function(module) {

    module.ModelView = Backbone.View.extend({

        tagName: "div",
        
        className: "box", 

        template: JST['app/scripts/Teams/TeamsTpl.ejs'],
        
        events: {
            "dblclick": "selectTeam"
        },

        initialize: function (project_id) {

        },

        selectTeam: function() {
            sstt.router.navigate("/team-edit/" + this.model.get("id"), {trigger: true}); 
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }

    });

})(app.Teams);
