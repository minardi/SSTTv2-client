/* Teams */

(function(module) {

    module.Collection = Backbone.Collection.extend({

        model: module.Model,

        initialize: function(project_id) {
            this.url = "/teams/for-project/" + project_id;
            this.project_id = project_id;
        }
    });
    
})(app.Teams);

