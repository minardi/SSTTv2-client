/* Teams */

(function(module, sstt) {

    module.Collection = Backbone.Collection.extend({

        model: module.Model,

        initialize: function() {
            this.url = "/teams/for-project/" + sstt.current_project;
        }

    });
    
})(app.Teams, sstt);

