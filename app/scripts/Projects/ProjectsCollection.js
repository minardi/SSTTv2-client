/* Projects */

(function(module) {

    module.Collection = Backbone.Collection.extend({

        model: module.Model,

        initialize: function() {
            this.url = "projects/for-user/" + sstt.user.getId();
        }

    });

})(app.Projects);
