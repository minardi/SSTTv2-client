/* Statistics */

(function(module) {
        
    module.ModelView = Backbone.View.extend({
		
        template: JST['app/scripts/Statistics/StatisticsTpl.ejs'],
        
        tagName: "option",

        events: {
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.attr("value", this.model.id);
            
            return this;
        }

    });

})(app.Statistics);
