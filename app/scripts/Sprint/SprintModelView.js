/* Sprint */

(function(module) {
        
    module.ModelView = Backbone.View.extend({	
        tagName: "option",     
		
        template: JST['app/scripts/Sprint/SprintTpl.ejs'],        
 	
        initialize: function() {
        },

        events: {
            "click": "chooseSprint"
        },

        subscriptions: {
        },

        chooseSprint: function () {
            mediator.pub("Sprint:ChooseSprint", this.model);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            
            return this;
        }

    });

})(app.Sprint);
